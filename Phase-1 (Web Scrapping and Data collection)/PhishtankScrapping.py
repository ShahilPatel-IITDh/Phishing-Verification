# Overview: As some URLs on the PhishTank site weren't mentioned completely on a single table, the user requires to click on the URL ID link to visit a new webpage where the complete URL will be present, So this code will automate the process of:
# 1. Open the PhishTank site
# 2. Iterate through each webpage and it's corresponding table entries
# 3. Click on the URL ID link to visit a new webpage, for each table entry
# 4. Extract the URL from the new webpage
# 5. Save the URL and it's corresponding ID in a CSV file on local machine

# Import the required libraries
import csv
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import NoSuchElementException

# Set up Chrome options
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run Chrome in headless mode
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

# Set path to your ChromeDriver executable
webdriver_service = Service('C:\\Users\\Admin\\Documents\\chromedriver.exe')

# Launch the Chrome browser
driver = webdriver.Chrome(service=webdriver_service, options=chrome_options)

# Open the URL in Google Chrome
url = "https://phishtank.org/phish_search.php?page=1&active=y&verified=u"
driver.get(url)


# URL ID should be a variable which will we iterate through each page
URL_Id = 8155865

# Check if the element with the given XPath is present
element_xpath = f"(//a[normalize-space()={URL_Id}])[1]"
try:
    element = driver.find_element(By.XPATH, element_xpath)
    # If the element is found, click on it
    ActionChains(driver).move_to_element(element).click().perform()
except NoSuchElementException:
    print("Element not found on the webpage.")

# Extract the text using the specified CSS selector
text_css_selector = "/html[1]/body[1]/div[2]/div[2]/div[1]/div[1]/div[3]/span[1]/b[1]"
try:
    text_element = driver.find_element(By.XPATH, text_css_selector)
    extracted_text = text_element.text
    # Write the extracted text to a CSV file
    output_file = "output.csv"
    with open(output_file, "a", newline="") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([extracted_text])

except NoSuchElementException:
    print("Text element not found on the webpage.")

# Close the browser
driver.quit()