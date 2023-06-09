import csv
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from selenium.common.exceptions import NoSuchElementException
# function to remove a given substring from a string

# Output file
CSV_file = "/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/database.csv"

# Set up Chrome options
chrome_options = Options()
# Run Chrome in headless mode
chrome_options.add_argument("--headless") 
# Disable the GPU 
chrome_options.add_argument("--disable-gpu")
# Disable the sandbox
chrome_options.add_argument("--no-sandbox")
# Disable the DevShmUsage
chrome_options.add_argument("--disable-dev-shm-usage")

# Set up Selenium driver
driver = webdriver.Chrome()  
driver.maximize_window()

# Loop through all the pages
for page in range(10):
    # Send a GET request to the webpage and get the HTML content
    url = f"https://phishtank.org/phish_search.php?page={page}&active=y&verified=u"
    driver.get(url)

    # Wait for the table to be present on the page
    table_present = EC.presence_of_element_located((By.CLASS_NAME, "data"))
    WebDriverWait(driver, 10).until(table_present)

    # Parse the HTML content using BeautifulSoup, driver.page_source is the HTML content of the page
    soup = BeautifulSoup(driver.page_source, "html.parser")

    # Find the table that contains the data
    table = soup.find("table", {"class": "data"})

    # Get the rows in the table
    rows = table.find_all("tr")

    # Loop through each row in the table and extract the Phish ID and Phish URL
    for row in rows[1:]:
        cells = row.find_all("td")

        # Extract the Phish ID and Phish URL
        phish_id = cells[0].text.strip()
        extraURL = cells[1].text.strip()

        # The clicking is done only to ensure that our script is working fine, if the script is working fine then we can comment the below code
        # Click on the link with text as the value of phish_id (this is working fine in automation)
        # link = driver.find_element(By.LINK_TEXT, phish_id)
        # link.click()

        # # Wait for the new page to load
        # time.sleep(2)

        # As we have the phish_id, open the new page directly using it.

        # To Extract the URL from new page the approach used is: as we have the phish_id, we can use it to get the URL of the newly generated page
        # The URL of the newly generated page is: https://phishtank.org/phish_detail.php?phish_id={phish_id}, after that use the same approach as used in the previous code to extract the URL

        # Send a GET request to the webpage and get the HTML content
        url = f"https://phishtank.org/phish_detail.php?phish_id={phish_id}"
        driver.get(url)

        # Parse the HTML content using BeautifulSoup, driver.page_source is the HTML content of the page
        newSoup = BeautifulSoup(driver.page_source, "html.parser")

        spanElement = newSoup.find('span', style='word-wrap:break-word;')

        if spanElement is not None:
            requiredURL = spanElement.find('b')

            if requiredURL is not None:
                url = requiredURL.text.strip()
                # If the URL is present then direct write it to the output file to avoid the exceptions of NoSuchElementException

                with open(CSV_file, "a", newline="") as outputFile:
                    writer = csv.writer(outputFile)
                    writer.writerow([phish_id ,url]) 
                # print url for testing it
                print(url)
            
            else:
                print("<b> element not found.")
        else:
            print("<span> element not found.")        

        # Go back to the previous page
        driver.back()
        # Wait for the page to load
        time.sleep(5)

# Close the Selenium driver
driver.quit()
