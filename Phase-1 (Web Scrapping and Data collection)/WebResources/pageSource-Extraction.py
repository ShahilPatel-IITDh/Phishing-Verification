import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

# set the path to the Chrome driver executable (for ubuntu)
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

# create a new Chrome browser instance
browser = webdriver.Chrome(service=Service(executable_path=driverPath), options=options)
# maximize the browser window
browser.maximize_window()

# loop through all the pages, testing for 2 pages
for pageNo in range(2):
    # generate the URL
    url = f"https://phishtank.org/phish_search.php?page={pageNo}&active=y&valid=y&Search=Search"
    # navigate to the URL
    browser.get(url)
    # Wait for the table to be present on the page
    table_present = EC.presence_of_element_located((By.CLASS_NAME, "data"))
    # Wait for the table to be present on the page for 10 seconds
    WebDriverWait(browser, 10).until(table_present)

    # Parse the HTML content using BeautifulSoup, driver.page_source is the HTML content of the page
    soup = BeautifulSoup(browser.page_source, "html.parser")

    # Find the table that contains the data
    table = soup.find("table", {"class": "data"})

    # Get the rows in the table
    rows = table.find_all("tr")

    # Loop through each row in the table and extract the Phish ID and Phish URL
    for row in rows[1:]:
        # Get the cells in the row
        cells = row.find_all("td")

        # Find the span element in the row, we will use the value inside it to be removed from the URL string
        span_element = row.find('span', class_='small')
        # substr = span_element.text.strip()

        # Extract the Phish ID and Phish URL
        phish_id = cells[0].text.strip()
        extraURL = cells[1].text.strip()

        # Send a GET request to the webpage and get the HTML content
        url = f"https://phishtank.org/phish_detail.php?phish_id={phish_id}"
        browser.get(url)

        # Parse the HTML content using BeautifulSoup, driver.page_source is the HTML content of the page
        source = browser.page_source

        # Generate a unique file name based on timestamp
        # timestamp = int(time.time())
        # The HTML files will be downloaded in the phishyURLs directorys
        file_name = f"phishyURLs/{phish_id}.html"

        # Create the directory if it doesn't exist
        os.makedirs(os.path.dirname(file_name), exist_ok=True)

        # Save the HTML content in the generated file
        with open(file_name, "w") as f:
            f.write(source)

# close the browser
browser.quit()