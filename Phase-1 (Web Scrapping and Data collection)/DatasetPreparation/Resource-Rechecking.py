import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import requests
from urllib.parse import urlparse
from urllib.parse import urljoin
import pandas as pd

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

# Paths to the folder and Excel file
mainFolder = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Phishy-Resources/'

excel_path = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Phishy-Data.xlsx'

# Get a list of folder names in the specified directory
folder_names = [name for name in os.listdir(mainFolder) if os.path.isdir(os.path.join(mainFolder, name))]

# Load the Excel file into a DataFrame

# Load the Excel file into a DataFrame
df = pd.read_excel(excel_path)

# Get the existing PhishIDs from the 'PhishID' column
existing_phish_ids = df['PhishID'].tolist()

# Create a new DataFrame to hold the updated data
updated_data = []

# Iterate through each row in the DataFrame
counter = 1

for index, row in df.iterrows():
    # Convert to string
    phish_id = str(row['PhishID'])

    # Check if there's a folder with the PhishID name in mainFolder
    if phish_id in folder_names and phish_id not in existing_phish_ids:
        new_row = row.copy()

        # Terminal output
        print(f"{phish_id} : {counter}")
        counter+=1

        # Check subfolders for each PhishID
        subfolders = ['HTML', 'JS', 'CSS', 'Images', 'ScreenShots']

        status_code = 200
        not_found = 1
        forbidden = 1

        for subfolder in subfolders:
            subfolder_path = os.path.join(mainFolder, phish_id, subfolder)
            
            if subfolder == 'HTML':
                if not os.path.exists(subfolder_path):
                    new_row['HTML'] = 0

            elif subfolder == 'JavaScript':
                if not os.path.exists(subfolder_path):
                    new_row['JS'] = 0

            elif subfolder == 'CSS':
                if not os.path.exists(subfolder_path):
                    new_row['CSS'] = 0

            elif subfolder == 'ScreenShots':
                if not os.path.exists(subfolder_path):
                    new_row['ScreenShot'] = 0

            elif subfolder == 'Images':
                if not os.path.exists(subfolder_path):
                    new_row['Images'] = 0
            
        # Update the 'Status Code' column based on the subfolder conditions
        if new_row['HTML'] == 0 and new_row['JS'] == 0 and new_row['CSS'] == 0 and new_row['ScreenShot'] == 0 and new_row['Images'] == 0:
            not_found = 0
            forbidden = 0
            status_code = 0
        
        new_row['Not Found'] = not_found
        new_row['Forbidden'] = forbidden
        new_row['Status Code'] = status_code

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
                new_row['PhishyURL'] = phishyURL

        # Append the updated row to the new DataFrame
        updated_data.append(new_row)

# Close the browser
browser.quit()

# # Combine the updated data with the existing DataFrame and save back to the Excel file
updated_df = pd.DataFrame(updated_data)
final_df = pd.concat([df, updated_df], ignore_index=True)

# Save the final DataFrame to the Excel file
final_df.to_excel(excel_path, index=False)

print("Processing complete.....")