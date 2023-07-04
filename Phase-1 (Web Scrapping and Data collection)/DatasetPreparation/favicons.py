# Import the required libraries
# os: provides functions for interacting with the operating system
import os
# time: provides various time-related functions
import time
# requests: provides functions for making HTTP requests
import requests
# csv: provides functions for reading and writing CSV files
import csv
# selenium: provides functions for automating web browsers
from selenium import webdriver
# Service: provides functions for starting and stopping the ChromeDriver server
from selenium.webdriver.chrome.service import Service
# By: provides functions for locating elements on a webpage
from selenium.webdriver.common.by import By
# Options: provides functions for setting Chrome options
from selenium.webdriver.chrome.options import Options
# WebDriverWait: provides functions for waiting for a certain condition to occur before proceeding further in the code
from selenium.webdriver.support.ui import WebDriverWait
# expected_conditions: provides functions for checking if a certain condition has been met
from selenium.webdriver.support import expected_conditions as EC
# BeautifulSoup: provides functions for parsing HTML content
from bs4 import BeautifulSoup
# NoSuchElementException: provides functions for checking if an element is present on a webpage
from selenium.common.exceptions import NoSuchElementException
# requests: provides functions for making HTTP requests
import requests
# ConnectionError: provides functions for handling connection errors, InvalidURL: provides functions for handling invalid URL errors. This error occurs when the URL is invalid
from requests.exceptions import ConnectionError, InvalidURL
# MaxRetryError: provides functions for handling maximum retry errors. This error occurs when the maximum number of retries is exceeded
from urllib3.exceptions import MaxRetryError, NameResolutionError
# SSLZeroReturnError: provides functions for handling SSL zero return errors. This error occurs when the SSL connection is closed unexpectedly
from ssl import SSLZeroReturnError

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
# Maximize the browser window
browser.maximize_window()

# Create a folder to store the dataset
# folderPath = "PhishyDataset"  # For phishyDataset
folderPath = "legitimateDataset" # For legitimateDataset

# Create the folder if it does not exist
os.makedirs(folderPath, exist_ok=True)

# Csv File to store the URLs

# csv File For phishyDataset
# phishyFile = "PhishyDataset.csv"

# csv file For legitimateDataset
# legitimateFile = "legitimateDataset.csv"

# Join the folder path and the csv file name
# csvFile = os.path.join(folderPath, legitimateFile)


headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
}

def download_favicon(url, folder_name):

    global globalFileCounter  # Initialize the global variable
    global successCount
    global notAccessibleCount
    global failureCount
    global noFaviconCount

    globalFileCounter += 1
    
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        favicon_link = soup.find('link', rel=True)

        if favicon_link is not None and 'href' in favicon_link.attrs:
            favicon_url = favicon_link['href']
            favicon_response = requests.get(favicon_url)

            if favicon_response.status_code == 200:
                # Save the favicon as {folder_name}_favicon.png in the sub-folder
                filename = f"{folder_name}_favicon.png"
                filepath = os.path.join(folderPath, folder_name, filename)
                os.makedirs(os.path.dirname(filepath), exist_ok=True)

                with open(filepath, 'wb') as file:
                    file.write(favicon_response.content)
                    successCount+=1
                print(f"Downloaded favicon for {url} as {filename}")

            else:
                failureCount+=1
                print(f"Failed to download favicon for {url}")
        else:
            noFaviconCount+=1
            print(f"No favicon found for {url}")

    except requests.exceptions.RequestException:
        notAccessibleCount+=1
        print(f"Error occurred while accessing {url}")


if __name__ == "__main__":

    # We will use the following variables to get metrics of the dataset
    # globalFileCounter will be used to check how many files are we visiting
    globalFileCounter = 0
    # successCount will count, how many favicons we have downloaded
    successCount = 0
    # not accessible count will count how many websites are not accessible
    notAccessibleCount = 0
    # failureCount will count how many favicons we have failed to download
    failureCount = 0
    # No favicon count will count how many websites do not have a favicon
    noFaviconCount = 0


    # Iterate over sub-folders in the folder
    for folder_name in os.listdir(folderPath):
        folder_dir = os.path.join(folderPath, folder_name)

        if os.path.isdir(folder_dir):
            folder_name = folder_name.strip()

            try:
                folder_id = int(folder_name)
            
            except ValueError:
                print(f"Invalid folder name: {folder_name}")
                continue

            storingPage = f"https://phishtank.org/phish_detail.php?phish_id={folder_id}"

            # extract the Phishy URLs from the storing page

            browser.get(storingPage)
            time.sleep(3)

            # Parse the HTML content using BeautifulSoup, driver.page_source is the HTML content of the page
            newSoup = BeautifulSoup(browser.page_source, "html.parser")

            # This spanElement contains the required URL enclosed in <b> tag
            spanElement = newSoup.find('span', style='word-wrap:break-word;')
            if spanElement is not None:
                requiredURL = spanElement.find('b')

                if requiredURL is not None:
                    phishyURL = requiredURL.text.strip()
                    # If the URL is present then direct write it to the output file to avoid the exceptions of NoSuchElementException
                    print(f"{folder_id} --> {phishyURL}")

                    download_favicon(phishyURL, folder_name)

        else:
            print(f"No URL file found in {folder_name}")
            print(f"Total number of files visited: {globalFileCounter}")
            print(f"Total number of favicons downloaded: {successCount}")
            print(f"Total number of websites not accessible: {notAccessibleCount}")
            print(f"Total number of favicons failed to download: {failureCount}")
            print(f"Total number of websites with no favicon: {noFaviconCount}")