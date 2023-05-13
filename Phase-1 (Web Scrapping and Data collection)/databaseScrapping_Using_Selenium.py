import csv
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

# function to remove a given substring from a string
def removeSubstr(string, sub):
    if string.find(sub) == -1:
        return string
    else:
        return string.replace(sub, "")

# Create a list to store the data
data = []

# Set up Selenium driver
driver = webdriver.Chrome()  # Replace with the path to your Chrome driver executable
driver.maximize_window()

# Loop through all the pages
for page in range(2):
    # Send a GET request to the webpage and get the HTML content
    url = f"https://phishtank.org/phish_search.php?page={page}&active=y&verified=u"
    driver.get(url)

    # Wait for the table to be present on the page
    table_present = EC.presence_of_element_located((By.CLASS_NAME, "data"))
    WebDriverWait(driver, 10).until(table_present)

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(driver.page_source, "html.parser")

    # Find the table that contains the data
    table = soup.find("table", {"class": "data"})

    # Get the rows in the table
    rows = table.find_all("tr")

    # Loop through each row in the table and extract the Phish ID and Phish URL
    for row in rows[1:]:
        cells = row.find_all("td")

        # Find the span element in the row, we will use the value inside it to be removed from the URL string
        span_element = row.find('span', class_='small')
        substr = span_element.text.strip()

        phish_id = cells[0].text.strip()
        extraURL = cells[1].text.strip()

        # Click on the link with text as the value of phish_id
        link = driver.find_element(By.LINK_TEXT, phish_id)
        link.click()

        # Wait for the new page to load
        time.sleep(2)

        # Extract the URL from the new page
        # url = driver.current_url
        # url = removeSubstr(url, substr)
        requiredURL = soup.find_all("span")
        url = requiredURL[1].text.strip()
        data.append([phish_id, url])

        # Go back to the previous page
        driver.back()

        # Wait for the page to load
        time.sleep(2)

# Close the Selenium driver
driver.quit()

# Write the data to a CSV file
with open("phishtank_data_first15.csv", "w", newline="") as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(["Phish ID", "URL"])
    writer.writerows(data)
