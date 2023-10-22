# This code will give count of the screenshot we can get for Phishy and Legitimate URLs using PIL library

import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import WebDriverException
import time
import os
from PIL import Image
import io

# Read the URLs from the Excel file
xlsx_file_path = 'Legitimate-Data.xlsx' 
output_file = 'screenshotCount-Legitimate.txt'

# Load the Excel file
try:
    df = pd.read_excel(xlsx_file_path)
    urls_phishid_data = df[['URL', 'PhishID']].values.tolist()

except Exception as e:
    print(f"Error reading the Excel file: {str(e)}")
    urls_phishid_data = []

# driver path (chrome driver), in ubuntu
driverPath = "/home/administrator/Downloads/chromedriver_linux64/chromedriver"

# Use webdriver-manager to automatically download the ChromeDriver binary
# service = Service("webdriver-manager/chromedriver.exe")

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
driver = webdriver.Chrome(service=Service(executable_path=driverPath), options=options)
driver.maximize_window()

# Initialize counters
success_count = 0
failure_count = 0

# Define the directory path
screenshot_directory = "Screenshots_Using_PIL"

URLCount = 0

# Loop through the URLs and take screenshots
for url, phishID in urls_phishid_data:
    try:
        driver.get(url)
        time.sleep(3)  # Wait for 10 seconds for the page to load

        # Take a screenshot of the visible portion of the website
        screenshot = driver.get_screenshot_as_png()
        # Convert the screenshot to a PIL Image
        image = Image.open(io.BytesIO(screenshot))

        # Save the screenshot to a file (e.g., "screenshot.png")
# Save the screenshot to the directory
        screenshotFile = os.path.join(screenshot_directory, f"{phishID}_screenshot.png")
        os.makedirs(screenshot_directory, exist_ok=True)
        image.save(screenshotFile)

        success_count += 1
        print(f'{phishID} processed \n')
        
    except Exception as e:
        print(f'Error capturing screenshot for {url}: {str(e)}')
        failure_count += 1

        print(f'{phishID} not processed \n')
    
    URLCount+=1

    if(URLCount == 50):
        break

# Close the Chrome WebDriver
driver.quit()

# Store the count of successfully captured screenshots in a text file
with open(output_file, 'w') as count_file:
    count_file.write(f'Successful Screenshots: {success_count}\n')
    count_file.write(f'Failed Screenshots: {failure_count}\n')

print(f'Successful Screenshots: {success_count}')
print(f'Failed Screenshots: {failure_count}')
