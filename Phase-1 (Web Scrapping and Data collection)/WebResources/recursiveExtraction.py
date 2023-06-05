import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from selenium.common.exceptions import NoSuchElementException
import requests
from urllib.parse import urlparse
from urllib.parse import urljoin
import re

# driver path (chrome driver), in ubuntu
driverPath = "/home/administrator/Downloads/chromedriver_linux64/chromedriver"

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
browser = webdriver.Chrome(service=Service(executable_path=driverPath), options=options)
browser.maximize_window()

headers = {
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
}

def scrapeURLs(phishingURLs, newCounter, recursiveCount):
    
    counter = 0

    if((len(phishingURLs) == 1) and (recursiveCount >= 1)):
        if recursiveCount==2:
            return
        
        else:
            try:
                r = requests.get(phishingURLs[0])
                r.raise_for_status()  # Check for any HTTP request errors

                html_content = r.content
                soup = BeautifulSoup(html_content, 'html.parser')

                with open(f'myfile{newCounter}.html', 'w', encoding='utf-8') as f:
                    f.write(soup.prettify())

                anchor_tags = soup.find_all('a')

                with open(f'a_tags_file{newCounter}.txt', 'a', encoding='utf-8') as f1:

                    if(anchor_tags):
                      for a_tag in anchor_tags:
                        href = a_tag.get('href')

                       ## write some conditions to filter out the correct hrefs!! 
                        if href:
                          f1.write(href + '\n')
                        else:
                          print('no further a tags')  

                script_tags = soup.find_all('script') 
                        
                with open(f'script_tags_file{newCounter}.txt','a',encoding='utf-8') as f2:
                   for script_tag in script_tags:
                        script_content = script_tag.string

                        if script_content:
                            f2.write(script_content + '\n') 


                for css in soup.find_all("link"):
                  if css.attrs.get("href"):
                    css_url = urljoin(phishingURLs[0], css.attrs.get("href"))
                    with open(f'css_tags_files{newCounter}.txt','a',encoding='utf-8') as f3:
                      f3.write(css_url+'\n')                           
                   
            except (requests.RequestException, IOError) as e:
                print(f"Failed to fetch content for {phishingURLs[0]}: {e}")
    
    else:
        for url in phishingURLs:
            try:
                r = requests.get(url)
                r.raise_for_status()  # Check for any HTTP request errors

                html_content = r.content
                soup = BeautifulSoup(html_content, 'html.parser')

                with open(f'myfile{counter}.html', 'w', encoding='utf-8') as f:
                    f.write(soup.prettify())

                anchor_tags = soup.find_all('a') 

                if anchor_tags:
                    for a_t in anchor_tags:
                        if a_t:
                            href = a_t.get('href')
                            if href and href[0] == '/':
                                domain = re.findall(r"://([^/]+)/?", url)[0]
                                href = domain + href
                                href = 'https://' + href
                                # Recursive call
                                recursiveCount += 1
                                newCounter += 1
                                scrapeURLs([href], recursiveCount, newCounter)
                                break

                with open(f'a_tags_file{counter}.txt', 'a', encoding='utf-8') as f1:
                    for a_tag in anchor_tags:
                        href = a_tag.get('href')
                        ## write some conditions to get the correct url 
                        if href:
                            f1.write(href + '\n')
                        else:
                          print('no page')    

                script_tags = soup.find_all('script')

                with open(f'script_tags_file{counter}.txt', 'a', encoding='utf-8') as f2:
                    for script_tag in script_tags:
                        script_content = script_tag.string

                        if script_content:
                            f2.write(script_content + '\n')

                for css in soup.find_all("link"):
                  if css.attrs.get("href"):
                    css_url = urljoin(url, css.attrs.get("href"))
                    with open(f'css_tags_files{counter}.txt','a',encoding='utf-8') as f3:
                      f3.write(css_url+'\n')                 

            except (requests.RequestException, IOError) as e:
                print(f"Failed to fetch content for {url}: {e}")

            recursiveCount=0 
            counter+=1

if __name__ == "__main__":

    newCounter = 200
    recursiveCount = 0

    for pageNo in range(10):
        # Send a GET request to the webpage and get the HTML content
        mainPage_URL = f"https://phishtank.org/phish_search.php?page={pageNo}&active=y&valid=y&Search=Search"
        browser.get(mainPage_URL)

        # Wait for the table to be present on the page
        table_present = EC.presence_of_element_located((By.CLASS_NAME, "data"))
        WebDriverWait(browser, 10).until(table_present)

        # Parse the HTML content using BeautifulSoup, driver.page_source is the HTML content of the page
        soup = BeautifulSoup(browser.page_source, "html.parser")

        # Find the table that contains the data
        table = soup.find("table", {"class": "data"})

        # Get the rows in the table
        rows = table.find_all("tr")

        # List of the phishing URLs
        phishingURLs = []

        # Loop row each row in the table
        for row in rows[1:]:
            cells = row.find_all("td")

            # Extract the Phish_ID
            phish_id = cells[0].text.strip()

            # Send a GET request to the webpage and get the HTML content
            phishID_URL = f"https://phishtank.org/phish_detail.php?phish_id={phish_id}"
            browser.get(phishID_URL)

            # Parse the HTML content using BeautifulSoup, driver.page_source is the HTML content of the page
            newSoup = BeautifulSoup(browser.page_source, "html.parser")

            # The required URL of the phishy page is enclosed in a span element with style attribute as 'word-wrap:break-word;'
            spanElement = newSoup.find('span', style='word-wrap:break-word;')
            if spanElement is not None:
                requiredElement = spanElement.find('b')
            
                if requiredElement is not None:
                    phishyURL = requiredElement.text.strip()
                    print(f"Phishy URL: {phishyURL}")
                    # Append the phishy URL to the list
                    phishingURLs.append(phishyURL)
            
        scrapeURLs(phishingURLs, newCounter, recursiveCount)            

        # Go back to the previous page
        browser.back()
        # Wait for 5 seconds before moving to the next page
        time.sleep(5)

    browser.quit()           