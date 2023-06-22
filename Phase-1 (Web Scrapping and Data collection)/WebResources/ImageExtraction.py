import os
import time
import requests
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from selenium.common.exceptions import NoSuchElementException

# Driver path (chrome driver), in Ubuntu
driverPath = "/home/administrator/Downloads/chromedriver_linux64/chromedriver"

# Create a new Chrome browser instance
options = webdriver.ChromeOptions()
# Headless mode: run Chrome in the background
options.add_argument("--headless")
# Disable GPU: disable the GPU hardware acceleration
options.add_argument("--disable-gpu")
# No sandbox: disable the Chrome sandbox
options.add_argument("--no-sandbox")
# Disable dev shm usage: disable the /dev/shm usage
options.add_argument("--disable-dev-shm-usage")

# Set up new Chrome browser instance
browser = webdriver.Chrome(service=Service(executable_path=driverPath), options=options)
browser.maximize_window()

# Loop through all the pages, testing for 1 page
for pageNo in range(2):
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

    # Loop through each row in the table
    for row in rows[1:]:
        cells = row.find_all("td")

        # Extract the Phish_ID
        phish_id = cells[0].text.strip()

        # Send a GET request to the webpage and get the HTML content
        image_url = f"https://cdn.phishtank.com/{phish_id}.jpg"
        response = requests.get(image_url)

        # Set the filename
        filename = f"{phish_id}.jpg"

        # Check if the request for the image was successful
        if response.status_code == 200:
            # Save the image to a file
            with open(filename, "wb") as file:
                file.write(response.content)

            print(f"Image downloaded and saved as {filename}")
            
        else:
            print(f"Failed to download the image: {image_url}")

        # Wait for 5 seconds before moving to the next image
        time.sleep(5)

    # Go back to the previous page
    browser.back()
    # Wait for 5 seconds before moving to the next page
    time.sleep(5)

# Close the browser
browser.close()