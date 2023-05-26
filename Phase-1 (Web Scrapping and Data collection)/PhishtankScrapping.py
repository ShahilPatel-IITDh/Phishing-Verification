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
# Run Chrome in headless mode
chrome_options.add_argument("--headless") 
# Disable the GPU 
chrome_options.add_argument("--disable-gpu")
# Disable the sandbox
chrome_options.add_argument("--no-sandbox")
# Disable the DevShmUsage
chrome_options.add_argument("--disable-dev-shm-usage")

# Set path to your ChromeDriver executable
webdriver_service = Service('C:\\Users\\Admin\\Documents\\chromedriver.exe')

# Launch the Chrome browser
driver = webdriver.Chrome(service=webdriver_service, options=chrome_options)

for pageNo in range(2):

    # Open the webpage URL in Google Chrome
    url = f"https://phishtank.org/phish_search.php?page={pageNo}&active=y&verified=u"
    driver.get(url)

    # Iterate through each entries and get the URL IDs present on that page
    # The URL_IDs list will store all the URLs present on the current page
    URL_IDs = []   

    for ID in range(8156400, 8156701):
        
        # element_xpath = f"(//a[normalize-space()={ID}])[1]"
        element_xpath = f"//a[normalize-space()={ID}]"
        
        try:
            # Check if the element with the given XPath is present
            element = driver.find_element(By.XPATH, element_xpath)

            # If the element is found, store it in the URL_IDs list, once we get a complete list, after that we will iterate through each element in the list and click on it
            URL_IDs.append(ID)

            # sleep for 5 seconds, before checking for the next element
            # driver.implicitly_wait(5)
            
        except NoSuchElementException:
            print(f"{ID} not found on the webpage no {pageNo}.")


    # After this loop we will get a complete list of all the URL IDs present on the current page
    # Iterate through each element in the URL_IDs list and click on it
    
    for ID in URL_IDs:
        # For each URL we will find the element by it's XPath and click on it.
        xPath = f"(//a[normalize-space()={ID}])"
        try:
            element = driver.find_element(By.XPATH, xPath)
            # click on the element
            element.click()

            # Alternatively we can use ActionChains to click on the element
            # ActionChains(driver).move_to_element(element).click().perform()

        except NoSuchElementException:
            print(f"URL_ID {ID} not clickable on the webpage no {pageNo}.")


        # Get the text content from the new page

        # Extract the text using the specified CSS selector
        text_Xpath = "/html[1]/body[1]/div[2]/div[2]/div[1]/div[1]/div[3]/span[1]/b[1]"
       
        # After clicking we will be redirected to new page so use try and except block to check if the text element is present on the new page or not, if present then extract the text and write it to a CSV file
        try: 
            text_element = driver.find_element(By.XPATH, text_Xpath)
            extracted_text = text_element.text

            # Write the extracted text to a CSV file
            output_file = "output.csv"
            with open(output_file, "a", newline="") as outputFile:
                writer = csv.writer(outputFile)
                writer.writerow([ID ,extracted_text])

        except NoSuchElementException:
            print(f"Text element not found for {ID} on the webpage no. {pageNo}.")

# Close the browser
driver.quit()