# This code will give count of the screenshot we can get for Phishy and Legitimate URLs using PIL library

import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import time

# Read the URLs from the Excel file
xlsx_file_path = 'Legitimate-Data.xlsx' 
output_file = 'screenshotCount.txt'

# Load the Excel file
try:
    df = pd.read_excel(xlsx_file_path, sheet_name=sheet_name)
    urls_phishid_data = df[['URL', 'PhishID']].values.tolist()

except Exception as e:
    print(f"Error reading the Excel file: {str(e)}")
    urls_phishid_data = []

# Initialize the Chrome WebDriver
chrome_options = Options()
chrome_options.headless = True  # Run Chrome in headless mode (no GUI)
# service = Service('/path/to/chromedriver')
# driver = webdriver.Chrome(service=service, options=chrome_options)
driver = webdriver.Chrome()

# Initialize counters
success_count = 0
failure_count = 0

# Loop through the URLs and take screenshots
for url, phishID in urls_phishid_data:
    try:
        driver.get(url)
        time.sleep(10)  # Wait for 10 seconds for the page to load

        # # Capture a screenshot
        # screenshot_filename = f'screenshot_{success_count + 1}.png'
        # driver.save_screenshot(screenshot_filename)
        # print(f'Screenshot captured for {url}')

        # Take a screenshot of the visible portion of the website
        screenshot = driver.get_screenshot_as_png()
        # Convert the screenshot to a PIL Image
        image = Image.open(io.BytesIO(screenshot))

        # Save the screenshot to a file (e.g., "screenshot.png")

        screenshotFile = f"{phishID}_screenshot.png"

        # filePath = os.path.join(ScreenShot_Directory, screenshotFile)
        image.save(filePath)


        success_count += 1
        
    except Exception as e:
        print(f'Error capturing screenshot for {url}: {str(e)}')
        failure_count += 1

# Close the Chrome WebDriver
driver.quit()

# Store the count of successfully captured screenshots in a text file
with open(output_file, 'w') as count_file:
    count_file.write(f'Successful Screenshots: {success_count}\n')
    count_file.write(f'Failed Screenshots: {failure_count}\n')

print(f'Successful Screenshots: {success_count}')
print(f'Failed Screenshots: {failure_count}')
