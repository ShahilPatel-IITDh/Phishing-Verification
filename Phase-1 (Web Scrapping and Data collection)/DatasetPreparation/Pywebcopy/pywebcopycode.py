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
# save_webpage: provides functions for saving a webpage
from pywebcopy import save_webpage

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
legitimateFile = "legitimateDataset.csv"

# Join the folder path and the csv file name
csvFile = os.path.join(folderPath, legitimateFile)

# Create the csv file if it does not exist
if not os.path.isfile(csvFile):
    # Create the folder if it does not exist
    os.makedirs(os.path.dirname(csvFile), exist_ok=True)
    # Create the csv file and add the column names to it
    with open(csvFile, "w") as f:
        writer = csv.writer(f)
        writer.writerow(["Phish_ID", "URL"])


headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
}


# Record the start time
start_time = time.time()

# Loop through the pages of the phishtank website which contains the dataset of URLs
for pageNo in range(0, 1):

    # Send a GET request to the webpage and get the HTML content
    # Legitimate URLs
    mainPage_URL = f"https://phishtank.org/phish_search.php?page={pageNo}&valid=n&Search=Search"

    # URL of the mainpage containing confirmed Phishy URLs
    # mainPage_URL = f"https://phishtank.org/phish_search.php?page={pageNo}&active=y&valid=y&Search=Search"
    
    browser.get(mainPage_URL)

    # Wait for the table to be present on the page
    table_present = EC.presence_of_element_located((By.CLASS_NAME, "data"))
    # WebDriverWait: provides functions for waiting for a certain condition to occur before proceeding further in the code
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
        phish_ID = cells[0].text.strip()

        # image_url is the url for the screenshot of the webpage available on the phishtank website
        image_url = f"https://cdn.phishtank.com/{phish_ID}.jpg"

        # this url is link to the page where the required URL (which is to be tested) is present
        storingPage = f"https://phishtank.org/phish_detail.php?phish_id={phish_ID}"
        browser.get(storingPage)

        # Parse the HTML content using BeautifulSoup, driver.page_source is the HTML content of the page
        newSoup = BeautifulSoup(browser.page_source, "html.parser")

        # This spanElement contains the required URL enclosed in <b> tag
        spanElement = newSoup.find('span', style='word-wrap:break-word;')

        if spanElement is not None:
            requiredURL = spanElement.find('b')

            if requiredURL is not None:
                phishyURL = requiredURL.text.strip()
                # If the URL is present then direct write it to the output file to avoid the exceptions of NoSuchElementException

                with open(csvFile, "a", newline="") as outputFile:
                    writer = csv.writer(outputFile)
                    writer.writerow([phish_ID ,phishyURL]) 

                # print url to check if the code is working fine till this point or not, if not then at which URL is it failing
                print(phishyURL)

                try:
                    session = requests.Session()
                    session.max_redirects = 45
                    result = session.get(phishyURL, headers=headers, timeout=None)

                    # If the status code is not 200, then the URL is not valid, hence continue to the next URL
                    if result.status_code != 200:
                        continue
                        
                    # If the content type is not text/html, then the URL is not valid, hence continue to the next URL
                    if 'text/html' not in result.headers.get('Content-Type', ''):
                        print(f"Error saving webpage: {phishyURL}")
                        print("The provided URL does not point to an HTML page.")
                        continue
                
                except (ConnectionError, InvalidURL, MaxRetryError, NameResolutionError, SSLZeroReturnError, Exception) as e:
                    print(f"Error accessing URL: {phishyURL}")
                    print(f"Error message: {str(e)}")
                    continue
                
                # Check if the folder with the Phish_ID exists or not, if not then create it
                resourceFolder = os.path.join(folderPath, f"{phish_ID}")
                os.makedirs(resourceFolder, exist_ok=True)
                
                # 
                if not os.path.exists(resourceFolder):
                    os.mkdir(f"{phish_ID}")
                
                try:
                    save_webpage(url = f"{phishyURL}", project_folder = resourceFolder, bypass_robots=True, debug=False, open_in_browser=False, delay=5, threaded=True)

                    print(f"{phishyURL}->{phish_ID} saved successfully.")
                
                except (ConnectionError, InvalidURL, MaxRetryError, NameResolutionError, SSLZeroReturnError, Exception) as e:
                    print(f"Error saving website: {phishyURL}")
                    print(f"Error message: {str(e)}")
            
            else:
                print("<b> element not found.")
        else:
            print("<span> element not found.")    

        # Requesting for image from the URL
        try:
            response = requests.get(image_url, stream=True)

            # set the filename
            imageFile = f"{phish_ID}.jpg"

            # Check if the request for image was successful
            if response.status_code == 200:
                # Create a subfolder inside the PhishyDataset folder to store the images as well as webpage HTML content

                # Create the folder only if the image exists
                phishingURLFolder = os.path.join(folderPath, f"{phish_ID}")
                os.makedirs(phishingURLFolder, exist_ok=True)

                # Save the image file to the folder
                filePath = os.path.join(phishingURLFolder, imageFile)
                with open (filePath, "wb") as f:
                    f.write(response.content)

                print(f"Image saved for Phish_ID: {phish_ID}")

            else:
                print(f"Image not found for Phish_ID: {phish_ID}")
            
        except requests.exceptions.RequestException as e:
            print(f"Exception occurred while downloading the image: {image_url}, {e}")
        
        # sleep for 3 seconds before going to the next URL
        time.sleep(3)

    # Go back to the previous page
    browser.back()
    # sleep for 3 seconds before going to the next page
    time.sleep(3)

# Close the browser
browser.close()


# Record the end time
end_time = time.time()

# Calculate the elapsed time
elapsed_time = end_time - start_time

# Print the elapsed time to the terminal
print(f"Elapsed time: {elapsed_time} seconds")

# # Save the elapsed time to a text file
# with open("elapsed_time.txt", "w") as file:
#     file.write(f"Elapsed time: {elapsed_time} seconds")