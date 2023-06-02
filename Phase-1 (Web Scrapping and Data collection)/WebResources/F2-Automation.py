import os
import time
import requests
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from selenium.common.exceptions import NoSuchElementException

def download_file(url, output_dir):
    response = requests.get(url)
    if response.status_code == 200:
        filename = os.path.join(output_dir, os.path.basename(url))
        with open(filename, 'wb') as file:
            file.write(response.content)
        return filename
    elif response.status_code == 404:
        print(f"File not found: {url}")

    else:
        print(f"Error downloading file: {url}")

def save_links_to_file(links, output_file):
    with open(output_file, 'w') as file:
        file.write('\n'.join(links))

# Set the path to the Chrome driver
driverPath = "/home/administrator/Downloads/chromedriver_linux64/chromedriver"

# Create a new Chrome browser instance
options = webdriver.ChromeOptions()
# Run Chrome in headless mode (in the background)
options.add_argument("--headless")
# Disable GPU hardware acceleration
options.add_argument("--disable-gpu")
# Disable Chrome sandbox
options.add_argument("--no-sandbox")
# Disable /dev/shm usage
options.add_argument("--disable-dev-shm-usage")

# Set up the Chrome browser instance
browser = webdriver.Chrome(service=Service(executable_path=driverPath), options=options)
browser.maximize_window()

headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
}

# Loop through all the pages (currently set to 1 page for testing)
for pageNo in range(1):
    # Send a GET request to the webpage and get the HTML content
    mainPage_URL = f"https://phishtank.org/phish_search.php?page={pageNo}&active=y&valid=y&Search=Search"
    browser.get(mainPage_URL)

    # Wait for the table to be present on the page
    table_present = EC.presence_of_element_located((By.CLASS_NAME, "data"))
    WebDriverWait(browser, 10).until(table_present)

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(browser.page_source, "html.parser")

    # Find the table that contains the data
    table = soup.find("table", {"class": "data"})

    # Get the rows in the table
    rows = table.find_all("tr")

    # Loop through each row in the table
    for row in rows[1:]:
        cells = row.find_all("td")

        # Extract the Phish_ID
        phish_id = cells[0].text.strip()

        # Send a GET request to the webpage and get the HTML content
        phishID_URL = f"https://phishtank.org/phish_detail.php?phish_id={phish_id}"
        browser.get(phishID_URL)

        # Parse the HTML content using BeautifulSoup
        newSoup = BeautifulSoup(browser.page_source, "html.parser")

        # Find the span element with style attribute 'word-wrap:break-word;'
        spanElement = newSoup.find('span', style='word-wrap:break-word;')

        if spanElement is not None:
            requiredElement = spanElement.find('b')

            if requiredElement is not None:
                phishyURL = requiredElement.text.strip()

                try:
                    response = requests.get(phishyURL, headers=headers)
                    response.raise_for_status()  # Check for any HTTP request errors

                    HTML_content = response.content
                    nextSoup = BeautifulSoup(HTML_content, 'html.parser')

                    # Make a folder with the Phish ID as the folder name to store the HTML content
                    folderName = f"{phish_id}"
                    # Create the folder if it does not exist
                    os.makedirs(folderName, exist_ok=True)

                    # Save HTML content
                    html_filename = os.path.join(folderName, 'index.html')
                    with open(html_filename, "w") as htmlCode:
                        htmlCode.write(nextSoup.prettify())

                    # Find all the Anchor tags
                    anchor_tags = nextSoup.find_all('a')

                    # Save anchor tags to file
                    anchor_tags_filename = os.path.join(folderName, 'anchorTags.txt')
                    save_links_to_file([anchor_tag.get('href') for anchor_tag in anchor_tags if anchor_tag.get('href')], anchor_tags_filename)

                    # Find the script tags in the HTML content
                    script_tags = nextSoup.find_all('script')

                    # Save script tags to file
                    script_tags_filename = os.path.join(folderName, 'scriptTags.txt')
                    with open(script_tags_filename, "w", encoding='utf-8') as scriptTagsFile:
                        for script_tag in script_tags:
                            script_content = script_tag.string

                            if script_content:
                                scriptTagsFile.write(f"{script_content}\n")

                    # Find CSS files
                    css_files = [link['href'] for link in nextSoup.find_all('link', rel='stylesheet')]

                    # Download CSS files
                    for css_file in css_files:
                        download_file(css_file, folderName)

                    # Find JS files
                    js_files = [script['src'] for script in nextSoup.find_all('script', src=True)]

                    # Download JS files
                    for js_file in js_files:
                        download_file(js_file, folderName)

                    print(f"Phishy URL {phishyURL} processed successfully.")

                except (requests.RequestException, IOError) as e:
                    print(f"Failed to open URL {phishyURL} due to {e}")

    # Go back to the previous page
    browser.back()
    # Wait for 5 seconds before moving to the next page
    time.sleep(5)

# Close the browser
browser.close()