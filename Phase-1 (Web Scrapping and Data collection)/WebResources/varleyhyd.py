from pywebcopy import save_webpage
from bs4 import BeautifulSoup
import requests
from selenium.common.exceptions import NoSuchElementException
from requests.exceptions import ConnectionError, InvalidURL
from urllib3.exceptions import MaxRetryError, NameResolutionError
from ssl import SSLZeroReturnError
from selenium import webdriver
from urllib.parse import urlparse
import re

driver = webdriver.Chrome()
driver.get("https://www.varleyhyd.com/")

response = requests.get("https://www.varleyhyd.com/")
response.raise_for_status()

HTML = response.content
soup = BeautifulSoup(HTML, "html.parser")

link = "https://www.varleyhyd.com/"

# Find all the anchor tags
anchorTags = soup.find_all("a")
for anchorTag in anchorTags:
    href = anchorTag.get("href")
    if href and urlparse(href).netloc == urlparse(link).netloc:
        print(href)
        try:
            driver.get(href)
            domain = re.findall(r"://([^/]+)/?", href)[0]  # save project as the domain name

            save_webpage(
                url=link,
                project_folder="/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/WebResources/",
                project_name=domain,
                bypass_robots=True,
                debug=False,
                open_in_browser=False,
                delay=None,
                threaded=True,
            )
            print(f"Scraped data from: {link}")
        except (ConnectionError, InvalidURL, MaxRetryError, NameResolutionError, SSLZeroReturnError, NoSuchElementException):
            print(f"Error occurred while processing data from {href}")
            continue