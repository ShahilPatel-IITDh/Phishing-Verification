# This code uses the save_website function of pywebcopy to download the resources of websites from Phishtank's database 

# Import libraries which will be used in the code.
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
from requests.exceptions import ConnectionError, InvalidURL
from urllib3.exceptions import MaxRetryError, NameResolutionError
from ssl import SSLZeroReturnError

# driver path (chrome driver), (Please change this according to the path on your desktop )
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
# maximize the browser window
# browser.maximize_window()

headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
}

# loop through all the pages, testing for 1 page
for pageNo in range(10):
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

    # Iterate through all the rows in the table which contain the PhishIDs and PhishyURLs on PhishTank
    for row in rows[1:]:
        cells = row.find_all("td")

        # Extract the Phish_ID
        phish_id = cells[0].text.strip()

        # Send a GET request to the website and get the HTML content
        phishID_URL = f"https://phishtank.org/phish_detail.php?phish_id={phish_id}"
        browser.get(phishID_URL)

        # Parse the HTML content using BeautifulSoup, driver.page_source is the HTML content of the page
        newSoup = BeautifulSoup(browser.page_source, "html.parser")

        # The required URL of the phishy page is enclosed in a span element with style attribute as 'word-wrap:break-word;'
        spanElement = newSoup.find('span', style='word-wrap:break-word;')

        # If the span element is present than check for 'b' element inside it
        if spanElement is not None: 
            # The required URL is enclosed in a 'b' element
            requiredElement = spanElement.find('b')
            
            # If the 'b' element is present than extract the URL
            if requiredElement is not None:
                # Extract the phishyURL which is the text enclosed in the 'b' element
                phishyURL = requiredElement.text.strip()
                
                # If the status code is not 200, then the URL is not valid, hence continue to the next URL
                try:
                    res = requests.get(phishyURL, headers=headers, allow_redirects=False)
                    # If the status code is not 200, then the URL is not valid, hence continue to the next URL
                    if res.status_code != 200:
                        continue

                    # If the content type is not text/html, then the URL is not valid, hence continue to the next URL
                    if 'text/html' not in res.headers.get('Content-Type', ''):
                        print(f"Error saving webpage: {phishyURL}")
                        print("The provided URL does not point to an HTML page.")
                        continue
                
                except requests.exceptions.TooManyRedirects as e:
                    print(f"Error: Too many redirects for {phishyURL}")
                    continue

                except (ConnectionError, InvalidURL, MaxRetryError, NameResolutionError, SSLZeroReturnError) as e:
                    print(f"Failed to fetch content for {phishyURL}: {e}")
                    continue    
                # Now create a new folder with the phishID as the name (so that each time when you run the code, it will create a new folder with the phishID as the name for the new URL)
                # use the os module to create a new directory

                # Please change the path according to the path on your desktop
                folder_path = f"/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/WebResources/Websites/{phish_id}"
                # Check if the folder already exists, if not then create a new folder
                if not os.path.exists(folder_path):
                    os.mkdir(f"{phish_id}")
                
                # Now save the website using pywebcopy
                try:
                    # Please change the path of project_folder according to the path on your desktop
                    save_website(url = f"{phishyURL}", project_folder = f"/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/WebResources/Websites/{phish_id}",bypass_robots = True, debug=False, open_in_browser=False, delay=None, threaded=True)

                    # This line is optional, it is added here just to check if the website is saved or not, and if the code terminates, we can check the last saved website from the terminal
                    print (f"{phishyURL}")
                

                # If there is an error in saving the website, then print the error message
                except (ConnectionError, InvalidURL,MaxRetryError, NameResolutionError, SSLZeroReturnError) as e:
                    print(f"Error saving website: {phishyURL}")
                    print(f"Error message: {str(e)}")
        
        # Wait for 5 seconds before going to the next URL in the table, this is done so that the website is saved properly (optional)
        time.sleep(5)

    # Go back to the previous page of PhishTank and repeat the process for the next page
    browser.back()
    # Wait for 5 seconds before going to the next page
    time.sleep(5)

# Close the browser (this will close the browser after the code has finished running)
browser.close()               