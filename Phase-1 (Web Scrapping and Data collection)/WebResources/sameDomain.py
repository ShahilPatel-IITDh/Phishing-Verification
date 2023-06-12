import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from requests.exceptions import ConnectionError, InvalidURL, SSLError, RequestException
import requests
from urllib.parse import urlparse
import re
import pywebcopy

# Set the path to the Chrome driver
driver_path = "/home/administrator/Downloads/chromedriver_linux64/chromedriver"

# Configure Chrome options
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

# Set up the Chrome driver
service = Service(driver_path)
browser = webdriver.Chrome(service=service, options=chrome_options)
browser.maximize_window()

def scrape_data(link, phish_id):
    try:
        domain = re.findall(r"://([^/]+)/?", link)[0]
        folder_path = f"/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/WebResources/{phish_id}"

        if not os.path.exists(folder_path):
            os.makedirs(folder_path, exist_ok=True)
        
        pywebcopy.save_webpage(
            url=link,
            project_folder=folder_path,
            project_name=domain,
            bypass_robots=True,
            debug=False,
            open_in_browser=False,
            delay=None,
            threaded=True
        )

    except (ConnectionError, InvalidURL, NameResolutionError, SSLError, RequestException) as e:
        print(f"Error occurred while scraping data from {link}: {e}")
        return 

def process_data(phishingURLs):
    for link, phish_id in phishingURLs:
        scrape_data(link, phish_id)
    
        try:
            response = requests.get(url=link, headers=headers)
            response.raise_for_status()
            phishSoup = BeautifulSoup(response.content, "html.parser")
            anchorTags = phishSoup.find_all('a')
            for aTag in anchorTags:
                href = aTag.get('href')
                if href and urlparse(href).netloc == urlparse(link).netloc:
                    scrape_data(href, phish_id)
        except (ConnectionError, InvalidURL, NameResolutionError, SSLError, RequestException) as e:
            print(f"Error occurred while scraping data from {link}: {e}")
            continue

if __name__ == "__main__":
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
    }

    for pageNo in range(1):
        mainPage_URL = f"https://phishtank.org/phish_search.php?page={pageNo}&active=y&valid=y&Search=Search"
        browser.get(mainPage_URL)

        table_present = EC.presence_of_element_located((By.CLASS_NAME, "data"))
        WebDriverWait(browser, 10).until(table_present)

        soup = BeautifulSoup(browser.page_source, "html.parser")
        table = soup.find("table", {"class": "data"})
        rows = table.find_all("tr")
        phishingURLs = []

        for row in rows[1:]:
            cells = row.find_all("td")
            phish_id = cells[0].text.strip()
            phishID_URL = f"https://phishtank.org/phish_detail.php?phish_id={phish_id}"
            browser.get(phishID_URL)
            newSoup = BeautifulSoup(browser.page_source, "html.parser")
            spanElement = newSoup.find('span', style='word-wrap:break-word;')
            if spanElement is not None:
                requiredElement = spanElement.find('b')
                if requiredElement is not None:
                    phishyURL = requiredElement.text.strip()
                    phishPair = (phishyURL, phish_id)
                    phishingURLs.append(phishPair)
        
        process_data(phishingURLs)

        browser.back()
        time.sleep(5)

    browser.quit()