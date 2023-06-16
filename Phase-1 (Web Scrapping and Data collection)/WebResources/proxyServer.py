import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import re
from pywebcopy import save_webpage
import concurrent.futures

def scrape_data(link, index, proxy):
    try:
        # Configure proxy
        chrome_options = Options()
        proxy_settings = {
            "httpProxy": proxy,
            "sslProxy": proxy
        }
        chrome_options.add_argument('--proxy-server=%s' % proxy_settings)

        # Set up Chrome WebDriver with the proxy options
        driver_path = '/home/administrator/Downloads/chromedriver_linux64/chromedriver'  # Update with your chromedriver path
        driver = webdriver.Chrome(service=Service(driver_path), options=chrome_options)

        folder_path = "/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/WebResources/"

        save_webpage(
            url=link,
            project_folder=folder_path,
            project_name=f"{index}",
            bypass_robots=True,
            debug=False,
            open_in_browser=False,
            delay=None,
            threaded=True,
        )

        print(f"Scraped data from: {link}")

        driver.quit()  # Quit the WebDriver after scraping

    except Exception as e:
        print(f"Error occurred while scraping data from {link}: {e}")

def main():
    url = 'https://matlab.mathworks.com/'
    index = 0
    proxy = 'your_proxy_address:your_proxy_port'  # Update with your proxy details

    scrape_data(url, index, proxy)
    # print(f"Scraped data from {url}")
    time.sleep(5)

main()