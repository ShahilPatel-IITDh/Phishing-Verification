import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import requests
from bs4 import BeautifulSoup

# set the path to the Chrome driver executable (for ubuntu)
# driverPath = "/home/administrator/Downloads/chromedriver_linux64/chromedriver"

# Set the path to the Chrome driver executable (for windows)
driverPath = "C:\Users\Admin\Documents\chromedriver.exe"

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

# create a new Chrome browser instance
browser = webdriver.Chrome(service=Service(executable_path=driverPath), options=options)
# maximize the browser window
browser.maximize_window()

# Set User-Agent header to simulate a browser request, header are used to identify the browser making the request while using beautifulsoup
headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
}


for pageNo in range(1):
    # generate the URL for the Phishtank Archive page which has the list of Phishy URLs
    PageURL = f"https://phishtank.org/phish_search.php?page={pageNo}&active=y&valid=y&Search=Search"
    # navigate to the URL
    browser.get(PageURL)

    # Wait for the table to be present on the page
    table_present = EC.presence_of_element_located((By.CLASS_NAME, "data"))
    # Wait for the table to be present on the page for 10 seconds
    WebDriverWait(browser, 10).until(table_present)

    # Parse the HTML content using BeautifulSoup, driver.page_source is the HTML content of the page
    soup = BeautifulSoup(browser.page_source, "html.parser")

    # Find the table that contains the data
    table = soup.find("table", {"class": "data"})

    # Get the rows in the table
    rows = table.find_all("tr")

    # Loop through each row in the table and extract the Phish ID and Phish URL
    for row in rows[1:]:
        # Get the cells in the row
        cells = row.find_all("td")

        # Find the span element in the row, we will use the value inside it to be removed from the URL string
        span_element = row.find('span', class_='small')
        # substr = span_element.text.strip()

        # Extract the Phish ID and Phish URL
        phish_id = cells[0].text.strip()
        extraURL = cells[1].text.strip()

        # Send a GET request to the webpage and get the HTML content for each individual Phish URL present on the page
        url = f"https://phishtank.org/phish_detail.php?phish_id={phish_id}"
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()  # Check for any HTTP request errors

            htmlContent = response.content
            soup = BeautifulSoup(htmlContent, 'html.parser')

            # Make a folder with the Phish ID as the folder name to store the HTML content

            # folderName is the name of the folder where the HTML content will be stored
            folderName = f"{phish_id}"
            # Create the folder if it does not exist
            os.makedirs(folderName, exist_ok=True)
            
            with open(f"{folderName}/index.html", "w", encoding="utf-8") as htmlCode:
                htmlCode.write(soup.prettify())

            # Find all the anchor tags in the HTML content
            AnchorTags = soup.find_all('a')

            # Write the anchor tags to a file
            with open(f"{folderName}/AnchorTags.txt", "w", encoding="utf-8") as anchorTagsFile:
                for AnchorTag in AnchorTags:
                    href = AnchorTag.get('href')

                    if href:
                        anchorTagsFile.write(href + '\n')
                
            # Find all the script tags in the HTML content
            ScriptTags = soup.find_all('script')

            # Write the script tags to a file
            with open(f"{folderName}/ScriptTags.txt", "w", encoding="utf-8") as scriptTagsFile:
                for ScriptTag in ScriptTags:
                    scriptContent = ScriptTag.string

                    if scriptContent:
                        scriptTagsFile.write(scriptContent + '\n')

        except (requests.RequestException, IOError) as e:
            print(f"Failed to open URL {url} due to {e}")

    # Wait for 5 seconds before navigating to the next page
    time.sleep(5)

# Close the browser
browser.close()

# # URLs to fetch and save HTML content
# urls = ['https://wimoox-94.webselfsite.net/transcash_check', 'https://www.youtube.com', 'https://www.twitter.com', 'https://soldeverification.com/auth.html','https://urlz.fr/m2ZX']

# # Fetch and save HTML content for each URL
# co = 0
# for url in urls:
#     try:
#         r = requests.get(url, headers=headers)
#         r.raise_for_status()  # Check for any HTTP request errors

#         html_content = r.content
#         soup = BeautifulSoup(html_content, 'html.parser')

#         with open(f'myfile{co}.html', 'w', encoding='utf-8') as f:
#             f.write(soup.prettify())

#         anchor_tags = soup.find_all('a')

#         with open(f'a_tags_file{co}.txt', 'a', encoding='utf-8') as f1:
#             for a_tag in anchor_tags:
#                 href = a_tag.get('href')

#                 if href:
#                     f1.write(href + '\n')

#         script_tags = soup.find_all('script')

#         with open(f'script_tags_file{co}.txt', 'a', encoding='utf-8') as f2:
#             for script_tag in script_tags:
#                 script_content = script_tag.string

#                 if script_content:
#                     f2.write(script_content + '\n')

#     except (requests.RequestException, IOError) as e:
#         print(f"Failed to fetch content for {url}: {e}")

#     co += 1