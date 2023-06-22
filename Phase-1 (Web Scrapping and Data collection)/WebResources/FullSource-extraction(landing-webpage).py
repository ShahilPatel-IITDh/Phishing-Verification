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
for pageNo in range(200):
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

    # Loop row each row in the table
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

                try:
                    response = requests.get(phishyURL, headers=headers, timeout=None, verify=False, allow_redirects=True)
                    response.raise_for_status()  # Check for any HTTP request errors

                    HTML_content = response.content
                    nextSoup = BeautifulSoup(HTML_content, 'html.parser')

                    # Make a folder with the Phish ID as the folder name to store the HTML content
                    # folderName is the name of the folder where the HTML content will be stored
                    folderName = f"{phish_id}"
                    # Create the folder if it does not exist
                    os.makedirs(folderName, exist_ok=True)

                    with open(f"{folderName}/index.html", "w") as htmlCode:
                        htmlCode.write(nextSoup.prettify())
                    
                    # Find all the Anchor tags
                    AnchorTags = nextSoup.find_all('a')

                    # Write the Anchor tags to a file
                    with open(f"{folderName}/anchorTags.txt", "w", encoding='utf-8') as anchorTagsFile:
                        for anchorTag in AnchorTags:
                            href = anchorTag.get('href')

                            if href:
                                anchorTagsFile.write(f"{href}\n")                   
                            
                    # Find the script tags in the HTML content
                    ScriptTags = nextSoup.find_all('script')

                    # Write the script tags to a file
                    with open(f"{folderName}/scriptTags.txt", "w", encoding='utf-8') as scriptTagsFile:
                        for scriptTag in ScriptTags:
                            scriptContent = scriptTag.string

                            if scriptContent:
                                scriptTagsFile.write(f"{scriptContent}\n")

                except (requests.RequestException, IOError) as e:
                    print(f"Failed to open URL {phishyURL} due to {e}")

        time.sleep(5)
    # Go back to the previous page
    browser.back()
    # Wait for 5 seconds before moving to the next page
    time.sleep(5)

# Close the browser
browser.close()