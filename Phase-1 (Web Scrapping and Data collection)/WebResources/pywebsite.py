import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from selenium.common.exceptions import NoSuchElementException
import requests
from pywebcopy import save_website
from requests.exceptions import ConnectionError
from urllib3.exceptions import MaxRetryError, NameResolutionError
from ssl import SSLZeroReturnError

# driver path (chrome driver), in ubuntu
driverPath = "/home/administrator/Downloads/chromedriver_linux64/chromedriver"

# create a new Chrome browser instance
options = webdriver.ChromeOptions()
# headless mode: run Chrome in the background
options.add_argument("--headless")
# disable-gpu: disable the GPU hardware acceleration
options.add_argument("--disable-gpu")
# no-sandbox: disable the Chrome sandbox
options.add_argument("--no-sandbox")
# disable-dev-shm-usage: disable the /dev/shm usage
options.add_argument("--disable-dev-shm-usage")

# Set up new Chrome browser instance
browser = webdriver.Chrome(service=Service(executable_path=driverPath), options=options)
browser.maximize_window()

headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
}

# loop through all the pages, testing for 1 page
for pageNo in range(6):
    # Send a GET request to the webpage and get the HTML content
    mainPage_URL = f"https://phishtank.org/phish_search.php?page={pageNo}&active=y&valid=y&Search=Search"
    browser.get(mainPage_URL)

    # Wait for the table to be present on the page
    table_present = EC.presence_of_element_located((By.CLASS_NAME, "data"))
    WebDriverWait(browser, 10).until(table_present)

    # Parse the HTML content using BeautifulSoup, driver.page_source is the HTML content of the page
    soup = BeautifulSoup(browser.page_source, "html.parser")

    # Find the table that contains the data
    table = soup.find("table", {"class": "data"})

    # Get the rows in the table
    rows = table.find_all("tr")

    for row in rows[1:]:
        cells = row.find_all("td")

        # Extract the Phish_ID
        phish_id = cells[0].text.strip()

        # Send a GET request to the webpage and get the HTML content
        phishID_URL = f"https://phishtank.org/phish_detail.php?phish_id={phish_id}"
        browser.get(phishID_URL)

        # Parse the HTML content using BeautifulSoup, driver.page_source is the HTML content of the page
        newSoup = BeautifulSoup(browser.page_source, "html.parser")

        # The required URL of the phishy page is enclosed in a span element with style attribute as 'word-wrap:break-word;'
        spanElement = newSoup.find('span', style='word-wrap:break-word;')

        if spanElement is not None: 
            requiredElement = spanElement.find('b')
            
            if requiredElement is not None:
                phishyURL = requiredElement.text.strip()
                
                # If the status code is not 200, then the URL is not valid, hence continue to the next URL
                try:
                    res = requests.get(phishyURL, headers=headers)
                    # If the status code is not 200, then the URL is not valid, hence continue to the next URL
                    if res.status_code != 200:
                        continue

                    # If the content type is not text/html, then the URL is not valid, hence continue to the next URL
                    if 'text/html' not in res.headers.get('Content-Type', ''):
                        print(f"Error saving webpage: {phishyURL}")
                        print("The provided URL does not point to an HTML page.")
                        continue

                except (ConnectionError, MaxRetryError, NameResolutionError, SSLZeroReturnError) as e:
                    print(f"Failed to fetch content for {phishyURL}: {e}")
                    continue    
                # Now create a new folder with the phisID as the name
                # use the os module to create a new directory
                # Now create a new folder with the phishID as the name
                # use the os module to create a new directory
                folder_path = f"/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/WebResources/{phish_id}"
                if not os.path.exists(folder_path):
                    os.mkdir(f"{phish_id}")

                try:
                    save_website(url = f"{phishyURL}", project_folder = f"/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/WebResources/{phish_id}",bypass_robots = True, debug=False, open_in_browser=False, delay=None, threaded=True)

                    print (f"{phishyURL}")
                
                except (ConnectionError, MaxRetryError, NameResolutionError, SSLZeroReturnError) as e:
                    print(f"Error saving website: {phishyURL}")
                    print(f"Error message: {str(e)}")
    
    browser.back()
    time.sleep(5)

browser.close()               