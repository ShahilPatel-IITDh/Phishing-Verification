# Code to Extract the URL based and content based features from the Excel sheet containing URL, PhishID and other fields.
# - Check if the *status code* column, is 0 or not. If not then process the URL and it's source code

import time
import os
import pandas as pd
import csv
import urllib.parse
import re
import requests
from bs4 import BeautifulSoup
from datetime import datetime  # Add this import for calculate_age_of_domain function
import logging
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.common.exceptions import NoSuchElementException
from urllib.error import HTTPError
from urllib3.exceptions import MaxRetryError

# Maintian a log file to print the status of the URL processing
logging.basicConfig(filename='LogFile.log', level=logging.DEBUG, format='%(asctime)s %(message)s')

# function to write the message into the log file
def writeLog(message):
    logging.info(message+"\n") 

# List of URL shortening services
url_shortening_services = [
    r'bit\.ly', r'goo\.gl', r'shorte\.st', r'go2l\.ink', r'x\.co', r'ow\.ly', r't\.co', r'tinyurl', r'tr\.im',
    r'is\.gd', r'cli\.gs', r'yfrog\.com', r'migre\.me', r'ff\.im', r'tiny\.cc', r'url4\.eu', r'twit\.ac', r'su\.pr',
    r'twurl\.nl', r'snipurl\.com', r'short\.to', r'BudURL\.com', r'ping\.fm', r'post\.ly', r'Just\.as', r'bkite\.com',
    r'snipr\.com', r'fic\.kr', r'loopt\.us', r'doiop\.com', r'short\.ie', r'kl\.am', r'wp\.me', r'rubyurl\.com',
    r'om\.ly', r'to\.ly', r'bit\.do', r't\.co', r'lnkd\.in', r'db\.tt', r'qr\.ae', r'adf\.ly', r'goo\.gl', r'bitly\.com',
    r'cur\.lv', r'tinyurl\.com', r'ow\.ly', r'bit\.ly', r'ity\.im', r'q\.gs', r'is\.gd', r'po\.st', r'bc\.vc', r'twitthis\.com',
    r'u\.to', r'j\.mp', r'buzurl\.com', r'cutt\.us', r'u\.bb', r'yourls\.org', r'x\.co', r'prettylinkpro\.com', r'scrnch\.me',
    r'filoops\.info', r'vzturl\.com', r'qr\.net', r'1url\.com', r'tweez\.me', r'v\.gd', r'tr\.im', r'link\.zip\.net'
]

# Correct the duplicate entries in url_shortening_services list
url_shortening_services = list(set(url_shortening_services))


# List of the Xpath for various fields present on the site: 'https://checkpagerank.net/index.php' after you enter a URL, and click on submit button

# xpaths = [
#     "/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[7]/div[2]",
#     "/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[7]/div[4]",
#     "/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[8]/div[2]",
#     "/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[8]/div[4]",
#     "/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[9]/div[2]",
#     "/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[9]/div[4]",
#     "/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[23]/div[2]",
#     "/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[26]/div[2]",
#     "/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[27]/div[2]",
#     "/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[12]/div[4]",
#     "/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[14]/div[4]",
#     "/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[5]/div[1]/h2[1]/font[2]/b[1]"
# ]

# Function to extract the Domain features form 3rd party website: 'https://checkpagerank.net/index.php'
# def scrape_data_from_xpaths(url, parsedURL, PhishID, xpaths):
#     # Create a new instance of the Chrome driver
    
#     # create the Chrome browser instance with the specified options
#     driver = webdriver.Chrome()

#     # Scrape data from each specified XPath
#     scrapedData = {}

#     try:
#         # Convert the parsed URL back to a string
#         domain = parsedURL.netloc
#         print(domain)
#         # Navigate to the required link
#         driver.get('https://checkpagerank.net/index.php')

#         # Find the input field (search box) for the URL and enter the parsed URL
#         url_input = WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.XPATH, "//input[@title='Valid link only']")))
#         url_input.send_keys(domain)

#         # Find the submit button and click it
#         submit_button = WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.XPATH, "//button[normalize-space()='Submit']")))
#         submit_button.click()

#         # Wait for 10 seconds to allow the page to load
#         driver.implicitly_wait(10)

#         # Scrape data from each xPath and store it in the dictionary
#         for xpath in xpaths:
#             try:
#                 element = driver.find_element(By.XPATH, xpath)
#                 scrapedData[xpath] = element.text
            
#             except (NoSuchElementException, requests.exceptions.ConnectionError, MaxRetryError, HTTPError):
#                 scrapedData[xpath] = -1

#         # Return the data dictionary
#         return scrapedData
    
#     except HTTPError as e:
#         print("HTTP Error occurred:", str(e))
#         return {}
    
#     except MaxRetryError as e:
#         print("Max Retry Error occurred:", str(e))
#         return {}
    
#     except ConnectionError as e:
#         print("Connection Error occurred:", str(e))
#         return {}

#     finally:
#         # Quit the WebDriver to close the browser window
#         driver.quit()
        

def getLen(url, PhishID, response, soup):
    if url is not None:
        return len(url)

    return 0
    
def checkforIP(url, PhishID, response, soup):

    ip_pattern = r"^((\d{1,3}\.){3}\d{1,3})|localhost$"
    
    # Check if the URL contains an IP address
    
    if re.search(ip_pattern, url):
        writeLog(f"{PhishID} has IP address" + "\n")
        return 1

    else:
        writeLog(f"{PhishID} has no IP" + "\n")
        return -1

def has_ShorteningServices(url, PhishID, response, soup):

    # Check if the URL matches any shortening service pattern
    for pattern in url_shortening_services:
        if re.search(pattern, url):
            writeLog(f"{PhishID} has URL shortened"+ "\n")
            return 1

    writeLog(f"{PhishID} doesn't have URL shortened"+ "\n")
    return -1

def has_At_Symbol(url, PhishID, response, soup):
    # If the '@' is present in the URL, then return 1
    if '@' in url:
        writeLog(f"{PhishID} has @"+"\n")
        return 1
    
    # else return -1
    else:
        writeLog(f"{PhishID} has no @"+"\n")
        return -1

def has_double_slash_redirecting(url, PhishID, response, soup):
    # If the '//' is present in the URL
    if '//' in url:
        writeLog(f"{PhishID} has //"+"\n")
        return 1

    else:
        writeLog(f"{PhishID} doesn't have //"+"\n")
        return -1

def has_prefix_suffix(url, PhishID, response, soup):
    # If the URL starts with prefix then return 1
    if url.startswith(('http://', 'https://', 'ftp://', 'mailto:', 'tel:')) and '/' in url:
        writeLog(f"{PhishID} has prefix/suffix"+"\n")
        return 1

    else:
        writeLog(f"{PhishID} doesn't have prefix/suffix"+"\n")
        return -1

def has_sub_domain(parsedURL, PhishID, response, soup):

    subdomain = parsedURL.hostname
    writeLog(f"{PhishID}'s subdomain = {subdomain}"+"\n")

    if subdomain is None:
        return -1

    else:
        return subdomain.count('.') > 1

def ssl_final_state(url, PhishID, response, soup):

    # Try to get the SSL certificate 
    try:
        responseNew = requests.get(url, verify=True)
        if responseNew.is_redirect or responseNew.ok:
            writeLog(f"{PhishID} has SSL Certificate"+"\n")
            return 1
        
    except requests.exceptions.RequestException:
        writeLog(f"{PhishID} doesn't have SSL Certificate"+"\n")

    return -1

def has_port(parsedURL, PhishID, response, soup):
    # If the port is present in the parsed URL then return 1
    if(parsedURL.port):
        writeLog(f"{PhishID} has Port"+"\n")
        return 1
    
    else:
        writeLog(f"{PhishID} doesn't have Port"+"\n")
        return -1;

def getDomainLength(parsedURL, PhishID, response, soup):
    # get the domain
    domain = parsedURL.netloc
    writeLog(f"{PhishID} has domain length of {len(domain)}"+"\n")
    return len(domain)

def checkURLofAnchor(url, PhishID, response, soup):
    unsafe = 0
    i = 0

    if response.status_code != 200:
        # Handle case when URL is not accessible
        return -999

    if soup:
        domain = re.findall(r"://([^/]+)/?", url)[0]
        for a in soup.find_all('a', href=True):
            if "#" in a['href'] or "javascript" in a['href'].lower() or "mailto" in a['href'].lower() or not (url in a['href'] or domain in a['href']):
                unsafe += 1
            i += 1

        try:
            percentage = unsafe / float(i) * 100
            writeLog(f"{PhishID} has {percentage} percentage of unsafe URL of anchor"+"\n")
        except ZeroDivisionError:
            # Handle case when no valid links are found
            return 1

        if percentage < 31.0:
            return 1
        
        elif 31.0 <= percentage < 67.0:
            return 0
        
        else:
            return -1
    else:
        # Handle case when the soup object is not available
        return -999

def checkLinksInTags(url, PhishID, HTML_path, JavaScript_path, CSS_path):
    domain = re.findall(r"://([^/]+)/?", url)[0]
    success = 0
    i = 0
    
    # Check if HTML path exists
    if os.path.exists(HTML_path):
        # Check links in HTML files
        html_files = [file for file in os.listdir(HTML_path) if file.endswith('.html')]
        for file in html_files:
            file_path = os.path.join(HTML_path, file)
            with open(file_path, 'r') as html_file:
                html_content = html_file.read()
                dots = [x.start(0) for x in re.finditer('\.', html_content)]
                if url in html_content or domain in html_content or len(dots) == 1:
                    success += 1
                i += 1
        
    # Check if JavaScript path exists
    if os.path.exists(JavaScript_path):
        # Check links in JavaScript files
        js_files = [file for file in os.listdir(JavaScript_path) if file.endswith('.js')]
        for file in js_files:
            file_path = os.path.join(JavaScript_path, file)
            with open(file_path, 'r') as js_file:
                js_content = js_file.read()
                dots = [x.start(0) for x in re.finditer('\.', js_content)]
                if url in js_content or domain in js_content or len(dots) == 1:
                    success += 1
                i += 1
    
    # Check if CSS path exists
    if os.path.exists(CSS_path):
        # Check links in CSS files
        css_files = [file for file in os.listdir(CSS_path) if file.endswith('.css')]
        for file in css_files:
            file_path = os.path.join(CSS_path, file)
            with open(file_path, 'r') as css_file:
                css_content = css_file.read()
                dots = [x.start(0) for x in re.finditer('\.', css_content)]
                if url in css_content or domain in css_content or len(dots) == 1:
                    success += 1
                i += 1
    
    try:
        percentage = success / float(i) * 100
        writeLog(f"{PhishID} has {percentage} percentage of links in tags"+"\n")
    except ZeroDivisionError:
        return 1
    
    if percentage < 17.0:
        return 1
    elif 17.0 <= percentage < 81.0:
        return 0
    else:
        return -1

def checkForForm(URL, PhishID, HTML_path, JavaScript_path, CSS_path):

    # Check if HTML path exists
    if os.path.exists(HTML_path):
        # Check for form in HTML files
        html_files = [file for file in os.listdir(HTML_path) if file.endswith('.html')]
        for file in html_files:
            file_path = os.path.join(HTML_path, file)
            with open(file_path, 'r') as html_file:
                html_content = html_file.read()
                if '<form' in html_content:
                    writeLog(f"{PhishID} has form"+"\n")
                    return 1  # Form found in HTML file
        
    # Check if JavaScript path exists
    if os.path.exists(JavaScript_path):
        # Check for form in JavaScript files
        js_files = [file for file in os.listdir(JavaScript_path) if file.endswith('.js')]
        for file in js_files:
            file_path = os.path.join(JavaScript_path, file)
            with open(file_path, 'r') as js_file:
                js_content = js_file.read()
                if 'form' in js_content:
                    writeLog(f"{PhishID} has form"+"\n")
                    return 1  # Form found in JavaScript file
    
    # No form found in any file
    writeLog(f"{PhishID} has no form"+"\n")
    return -1 if (os.path.exists(HTML_path) or os.path.exists(JavaScript_path)) else 0
    

def checkForSubmitToEmail(URL, PhishID, HTML_path, JavaScript_path, CSS_path):

    submit_to_email_found = False
    
    # Check if HTML path exists
    if os.path.exists(HTML_path):
        # Check HTML files for submit to email
        html_files = [file for file in os.listdir(HTML_path) if file.endswith('.html')]
        for file in html_files:
            file_path = os.path.join(HTML_path, file)
            with open(file_path, 'r') as html_file:
                html_content = html_file.read()
                if re.findall(r"[mail\(\)|mailto:?]", html_content) or re.findall(r"[mail\(\)|mailto:?]", URL):
                    submit_to_email_found = True
                    break
    
    # Check if JavaScript path exists
    if os.path.exists(JavaScript_path):
        # Check JavaScript files for submit to email
        js_files = [file for file in os.listdir(JavaScript_path) if file.endswith('.js')]
        for file in js_files:
            file_path = os.path.join(JavaScript_path, file)
            with open(file_path, 'r') as js_file:
                js_content = js_file.read()
                if re.findall(r"[mail\(\)|mailto:?]", js_content) or re.findall(r"[mail\(\)|mailto:?]", URL):
                    submit_to_email_found = True
                    break
    
    if submit_to_email_found:
        writeLog(f"{PhishID} has submit to email"+"\n")
        return 1
    
    elif not os.path.exists(HTML_path) and not os.path.exists(JavaScript_path):
        writeLog(f"{PhishID} has no files"+"\n")
        return 0
    
    else:
        writeLog(f"{PhishID} has no submit to email"+"\n")
        return -1

def checkOnMouseOver(URL, PhishID, HTML_path, JavaScript_path, CSS_path):

    mouse_over_found = False
    
    # Check if HTML path exists
    if os.path.exists(HTML_path):
        # Check HTML files for mouseOver
        html_files = [file for file in os.listdir(HTML_path) if file.endswith('.html')]
        for file in html_files:
            file_path = os.path.join(HTML_path, file)
            with open(file_path, 'r') as html_file:
                html_content = html_file.read()
                if re.findall(r"<script>.+onmouseover.+</script>", html_content):
                    mouse_over_found = True
                    break
    
    # Check if JavaScript path exists
    if os.path.exists(JavaScript_path):
        # Check JavaScript files for mouseOver
        js_files = [file for file in os.listdir(JavaScript_path) if file.endswith('.js')]
        for file in js_files:
            file_path = os.path.join(JavaScript_path, file)
            with open(file_path, 'r') as js_file:
                js_content = js_file.read()
                if re.findall(r"<script>.+onmouseover.+</script>", js_content):
                    mouse_over_found = True
                    break
    
    if mouse_over_found:
        writeLog(f"{PhishID} has onMouseOver"+"\n")
        return 1

    elif not os.path.exists(HTML_path) and not os.path.exists(JavaScript_path):
        writeLog(f"{PhishID} has no files"+"\n")
        return 0
    
    else:
        writeLog(f"{PhishID} has no onMouseOver"+"\n")
        return -1

def checkRightClick(URL, PhishID, HTML_path, JavaScript_path, CSS_path):

    right_click_allowed = True
    
    # Check if HTML path exists
    if os.path.exists(HTML_path):
        # Check HTML files for right-click restrictions
        html_files = [file for file in os.listdir(HTML_path) if file.endswith('.html')]
        for file in html_files:
            file_path = os.path.join(HTML_path, file)
            with open(file_path, 'r') as html_file:
                html_content = html_file.read()
                if re.findall(r"event.button ?== ?2", html_content):
                    right_click_allowed = False
                    break
    
    # Check if JavaScript path exists
    if os.path.exists(JavaScript_path):
        # Check JavaScript files for right-click restrictions
        js_files = [file for file in os.listdir(JavaScript_path) if file.endswith('.js')]
        for file in js_files:
            file_path = os.path.join(JavaScript_path, file)
            with open(file_path, 'r') as js_file:
                js_content = js_file.read()
                if re.findall(r"event.button ?== ?2", js_content):
                    right_click_allowed = False
                    break
    
    if right_click_allowed:
        writeLog(f"{PhishID} allows right-click"+"\n")
        return 1
    
    elif not os.path.exists(HTML_path) and not os.path.exists(JavaScript_path):
        writeLog(f"{PhishID} has no files"+"\n")
        return 0
    
    else:
        writeLog(f"{PhishID} does not allow right-click"+"\n")
        return -1

def checkForPopUpWindow(URL, PhishID, HTML_path, JavaScript_path, CSS_path):

    pop_up_found = False
    
    # Check if HTML path exists
    if os.path.exists(HTML_path):
        # Check HTML files for pop-up window calls
        html_files = [file for file in os.listdir(HTML_path) if file.endswith('.html')]
        for file in html_files:
            file_path = os.path.join(HTML_path, file)
            with open(file_path, 'r') as html_file:
                html_content = html_file.read()
                if re.findall(r"alert\(", html_content) or re.findall(r"window\.open\(", html_content) or re.findall(r"confirm\(", html_content):
                    pop_up_found = True
                    break
    
    # Check if JavaScript path exists
    if os.path.exists(JavaScript_path):
        # Check JavaScript files for pop-up window calls
        js_files = [file for file in os.listdir(JavaScript_path) if file.endswith('.js')]
        for file in js_files:
            file_path = os.path.join(JavaScript_path, file)
            with open(file_path, 'r') as js_file:
                js_content = js_file.read()
                if re.findall(r"alert\(", js_content) or re.findall(r"window\.open\(", js_content) or re.findall(r"confirm\(", js_content):
                    pop_up_found = True
                    break
    
    if pop_up_found:
        writeLog(f"{PhishID} has pop-up windows"+"\n")
        return 1
    
    elif not os.path.exists(HTML_path) and not os.path.exists(JavaScript_path):
        writeLog(f"{PhishID} has no files"+"\n")
        return 0
    
    else:
        writeLog(f"{PhishID} has no pop-up windows"+"\n")
        return -1

def checkForIFrame(URL, PhishID, HTML_path, JavaScript_path, CSS_path):

    iframe_found = False
    
    # Check if HTML path exists
    if os.path.exists(HTML_path):
        # Check HTML files for iframes
        html_files = [file for file in os.listdir(HTML_path) if file.endswith('.html')]
        for file in html_files:
            file_path = os.path.join(HTML_path, file)
            with open(file_path, 'r') as html_file:
                html_content = html_file.read()
                if re.findall(r"<iframe", html_content):
                    iframe_found = True
                    break
    
    # Check if JavaScript path exists
    if os.path.exists(JavaScript_path):
        # Check JavaScript files for iframes
        js_files = [file for file in os.listdir(JavaScript_path) if file.endswith('.js')]
        for file in js_files:
            file_path = os.path.join(JavaScript_path, file)
            with open(file_path, 'r') as js_file:
                js_content = js_file.read()
                if re.findall(r"<iframe", js_content):
                    iframe_found = True
                    break
    
    if iframe_found:
        writeLog(f"{PhishID} has iframes"+"\n")
        return 1
    
    elif not os.path.exists(HTML_path) and not os.path.exists(JavaScript_path):
        writeLog(f"{PhishID} has no files"+"\n")
        return 0
    
    else:
        writeLog(f"{PhishID} has no iframes"+"\n")
        return -1


def checkForRedirects(URL, PhishID, HTML_path, JavaScript_path, CSS_path):

    try:
        redirect_found = False
        
        # Check if HTML path exists
        if os.path.exists(HTML_path):
            # Check HTML files for redirects
            html_files = [file for file in os.listdir(HTML_path) if file.endswith('.html')]
            for file in html_files:
                file_path = os.path.join(HTML_path, file)
                with open(file_path, 'r') as html_file:
                    html_content = html_file.read()
                    if re.findall(r"window.location.replace|window.location.href", html_content):
                        redirect_found = True
                        break
        
        # Check if JavaScript path exists
        if os.path.exists(JavaScript_path):
            # Check JavaScript files for redirects
            js_files = [file for file in os.listdir(JavaScript_path) if file.endswith('.js')]
            for file in js_files:
                file_path = os.path.join(JavaScript_path, file)
                with open(file_path, 'r') as js_file:
                    js_content = js_file.read()
                    if re.findall(r"window.location.replace|window.location.href", js_content):
                        redirect_found = True
                        break
        
        if redirect_found:
            writeLog(f"{PhishID} has redirects"+"\n")
            return 1
        
        elif not os.path.exists(HTML_path) and not os.path.exists(JavaScript_path):
            writeLog(f"{PhishID} has no files"+"\n")
            return 0
        
        else:
            writeLog(f"{PhishID} has no redirects"+"\n")
            return -1
    
    except ConnectionError as e:
        # Handle the connection error here
        # You can print an error message or take appropriate action
        print("ConnectionError:", e)
        return -1

def extractText(string):
    # Check if the string is an integer
    if isinstance(string, int):
        return str(string)

    # Handle exceptions for empty string or None element
    if string is None or len(string) == 0:
        return ""

    # Find the index of the ':' symbol
    colon_index = string.find(':')

    if colon_index != -1:
        # Extract the text after ':' and remove leading/trailing whitespaces
        text_after_colon = string[colon_index + 1:].strip()

        return text_after_colon
    else:
        # Return an empty string if ':' is not found
        return ""
    
    
def checkFound(string):
    # Check if the string is an integer
    if isinstance(string, int):
        return -1  # Invalid value for integer input

    # Split the string into parts using ':' as the delimiter
    parts = string.split(':')
    
    if len(parts) > 1:
        # Extract the text after ':' and remove leading/trailing whitespaces
        validity = parts[1].strip()
        
        if validity == "Found":
            return 1
        else:
            return -1
    
    # Return -1 for invalid input format
    return -1

def extract_URL_features(URL, PhishID, response, soup, HTML_path, JavaScript_path, CSS_path):
    url = URL.strip()  # Remove leading and trailing spaces

    parsed_url = urllib.parse.urlparse(url)

    # The features of From URL

    # 1: Length of the URL
    length_of_URL = int(getLen(url, PhishID, response, soup))    

    # 2: Check for IP address (if present then 1, -1 otherwise)
    has_IP_address = int(checkforIP(url, PhishID, response, soup))

    # 3: Check for URL shortening services (if present then 1, -1 otherwise)
    has_shortening_service = int(has_ShorteningServices(url, PhishID, response, soup))

    # 4: Check for '@' symbol in the URL (if present: 1, if not present: -1)
    has_At_symbol = int(has_At_Symbol(url, PhishID, response, soup))

    # 5: Check for double slash in the URL (if present: 1, if not present: -1)
    hasDouble_slash = int(has_double_slash_redirecting(url, PhishID, response, soup))
        
    # 6: Check if the URL has prefix and suffix (if present: 1, if not present: -1)
    hasPrefix_suffix = int(has_prefix_suffix(url, PhishID, response, soup))

    # 7: Check if the URL has sub-domain (if present: 1, if not present: -1)
    has_SubDomain = int(has_sub_domain(parsed_url, PhishID, response, soup))

    # 8: Check the SSL state of the URL (if present: 1, if not present: -1)
    checkSSL_State = int(ssl_final_state(url, PhishID, response, soup))

    # 9: check for the 'port' in the URL (if present: 1, if not present: -1) 
    checkPort = int(has_port(parsed_url, PhishID, response, soup))

    # 10: get the domain length of the URL
    domainLength = int(getDomainLength(parsed_url, PhishID, response, soup))

    # 11: Check for the URL of Anchor (if present: 1, if not present: -1)
    urlAnchor = int(checkURLofAnchor(url, PhishID, response, soup))

    # 12: Check for the Links in Tags (if present: 1, if not present: -1)
    linksInTags = int(checkLinksInTags(url, PhishID, HTML_path, JavaScript_path, CSS_path))

    # 13: Check for the existence of the form (if present: 1, if not present: -1)
    formExists = int(checkForForm(url, PhishID, HTML_path, JavaScript_path, CSS_path))
    
    # 14: Check for Submitting to email (if present: 1, if not present: -1)
    toEmail = int(checkForSubmitToEmail(url, PhishID, HTML_path, JavaScript_path, CSS_path))

    # 15: Check for onmouseover (if present: 1, if not present: -1)
    onMouseOver = int(checkOnMouseOver(url, PhishID, HTML_path, JavaScript_path, CSS_path))

    # 16: Check for Right Click (if present: 1, if not present: -1)
    rightClick = int(checkRightClick(url, PhishID, HTML_path, JavaScript_path, CSS_path))
    
    # 17: Check for pop-up window (if present: 1, if not present: -1)
    popUpWindow = int(checkForPopUpWindow(url, PhishID, HTML_path, JavaScript_path, CSS_path))

    # 18: Check for IFrame (if present: 1, if not present: -1)
    hasIFrame = int(checkForIFrame(url, PhishID, HTML_path, JavaScript_path, CSS_path))
    
    # 19: Check for redirects
    re_directs = checkForRedirects(url, PhishID, HTML_path, JavaScript_path, CSS_path)

    # scraped_data = scrape_data_from_xpaths(url, parsed_url, PhishID, xpaths)

    # Store the scraped data into separate variables
    # DomainAuth = extractText(scraped_data["/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[7]/div[2]"])
    # PageAuth = extractText(scraped_data["/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[8]/div[2]"])
    # TrustFlow = extractText(scraped_data["/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[8]/div[2]"])
    # TrustMetric = extractText(scraped_data["/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[8]/div[4]"])
    # CitationFlow = extractText(scraped_data["/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[9]/div[2]"])
    # DomainValidity = checkFound(scraped_data["/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[9]/div[4]"])
    # RootIP = extractText(scraped_data["/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[23]/div[2]"])
    # TopicValue = extractText(scraped_data["/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[26]/div[2]"])
    # IndexedURLs = extractText(scraped_data["/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[27]/div[2]"])
    # SpamScore = extractText(scraped_data["/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[12]/div[4]"])
    # ReferringDomains = extractText(scraped_data["/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[14]/div[4]"])
    # GooglePageRank = scraped_data["/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[5]/div[1]/h2[1]/font[2]/b[1]"]

    # Create a dictionary to store the feature values
    features = {
        'HTML Path': HTML_path,
        'JavaScript Path':JavaScript_path,
        'CSS Path': CSS_path,

        'Length of URL': length_of_URL,
        'Has IP address': has_IP_address,
        'Shortening Service': has_shortening_service,
        'Having @ Symbol': has_At_symbol,
        'Double Slash Redirecting': hasDouble_slash,
        'Prefix-Suffix': hasPrefix_suffix,
        'Has Sub-domain': has_SubDomain,
        'SSL Final State': checkSSL_State,
        'Port': checkPort,
        'Domain Length': domainLength,
        'URL of Anchor': urlAnchor, 
        'Links In Tags': linksInTags,
        'Forms in the HTML': formExists,
        'Submits to Email': toEmail, 
        'On Mouseover': onMouseOver, 
        'Right Click': rightClick, 
        'Pop Window': popUpWindow,
        'IFrame': hasIFrame,
        'Redirects': re_directs,

        # 'Domain Authority': DomainAuth,
        # 'Page Authority': PageAuth,
        # 'Trust Flow': TrustFlow,
        # 'Trust Metric': TrustMetric,
        # 'Citation Flow': CitationFlow,
        # 'Domain Validity': DomainValidity,
        # 'Root IP': RootIP,
        # 'Topic Value': TopicValue,
        # 'Indexed URLs': IndexedURLs,
        # 'Spam Score': SpamScore,
        # 'Referring Domains': ReferringDomains,
        # 'Google Page Rank': GooglePageRank,
        'Statistical Report': -1
    }

    # Read the existing data from the Feature-Extracted.csv file
    existingData = pd.read_csv('Feature-Extracted.csv')

    # Update the feature values for the corresponding PhishID row, without overwriting or removing the values present in columns [HTML, CSS, JS, Images .... Status_Code]
    existingData.loc[existingData['PhishID'] == PhishID, features.keys()] = features.values()

    # Save the updated data back to the Feature-Extracted.csv file
    existingData.to_csv('Feature-Extracted.csv', index=False)

def generateCSV(excel_filePath):
    # Read the Excel file
    data = pd.read_excel(excel_filePath)

    # Extract existing column names
    columnNames = list(data.columns)

    # Define additional column names
    additional_columns = [
        'HTML Path', 'JavaScript Path', 'CSS Path', 'Length of URL', 'Has IP address', 'Shortening Service', 'Having @ Symbol',
        'Double Slash Redirecting', 'Prefix-Suffix', 'Has Sub-domain', 'SSL Final State',
        'Port', 'Domain Length', 'URL of Anchor', 'Links In Tags', 'Forms in the HTML', 'Submits to Email', 'On Mouseover', 'Right Click', 'Pop Window', 'IFrame', 'Redirects','Statistical Report'
    ]
    
    # Combine existing and additional column names
    all_columns = columnNames + additional_columns
    
    # Create a new DataFrame with the desired columns
    newData = pd.DataFrame(columns=all_columns)
    
    # Iterate over each row in the original data
    for index, row in data.iterrows():
        # Extract values from existing columns
        existing_values = [row[column_name] for column_name in columnNames]
        
        # Add empty values for additional columns
        additional_values = [''] * len(additional_columns)
        
        # Combine existing and additional values
        all_values = existing_values + additional_values
        
        # Create a new row in the DataFrame
        newData.loc[index] = all_values
    
    # Save the new DataFrame to a CSV file in the current working directory
    csv_file_path = 'Feature-Extracted.csv'
    newData.to_csv(csv_file_path, index=False)

def beginProcessing(URL, PhishID):

    # Instead of finding response, each and every time, find the response and soup object once and pass it to the function
    response = requests.get(URL)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Generate paths for the folders where the HTML, CSS and JS files are saved 
    HTML_path = f"/home/administrator/Desktop/Phishing-Verification/Phase-1\ \(Web\ Scrapping\ and\ Data\ collection\)/DatasetPreparation/Resources/{PhishID}/HTML"

    JavaScript_path = f"/home/administrator/Desktop/Phishing-Verification/Phase-1\ \(Web\ Scrapping\ and\ Data\ collection\)/DatasetPreparation/Resources/{PhishID}/JavaScript"

    CSS_path = f"/home/administrator/Desktop/Phishing-Verification/Phase-1\ \(Web\ Scrapping\ and\ Data\ collection\)/DatasetPreparation/Resources/{PhishID}/CSS"

    # Check if the URL is empty
    if URL == "":
        logging.warning(f"Empty URL for PhishID: {PhishID}")
        return

    
    # print into the log file
    logging.info(f"Processing {URL} with ID: {PhishID}")

    # Process the URL and extract features
    extract_URL_features(URL, PhishID, response, soup, HTML_path, JavaScript_path, CSS_path)


    # print into the log file
    logging.info(f"Processed {URL} with ID: {PhishID}")


if __name__ == '__main__':
    # Specify the path to the directory containing the Excel file
    dataDirectory = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation'

    # Specify the name of the Excel file
    excel_fileName = 'LogFile.xlsx'

    # Construct the full path to the Excel file
    excel_filePath = os.path.join(dataDirectory, excel_fileName)

    # Generate the CSV file
    generateCSV(excel_filePath)

    # Read the Excel file
    ExcelData = pd.read_excel(excel_filePath)

    # The columns present in the Excel Dataframe are: 
    # 'PhishID', 'URL', 'HTML', 'JS', 'CSS', 'Images', 'Not Found','Forbidden', 'Favicon', 'ScreenShot', 'Status Code'

    # Maintain a set of visited PhishIDs, don't process the same PhishID again
    visitedPhishIDs = set()

    # count = 0

    # Iterate over each row in the Excel file
    for index, row in ExcelData.iterrows():
        PhishID = row['PhishID']
        URL = row['URL']
        statusCode = row['Status Code']

        # Check if the URL is already processed or not, and the status code is not 0
        if PhishID not in visitedPhishIDs and statusCode != 0:

            # Add the PhishID to the set
            visitedPhishIDs.add(PhishID)
            # count+=1

            print(f"Processing started for this {URL}")
            # Call the function to begin the processing of URLs and also extract the content based features
            beginProcessing(URL, PhishID)

            print(f"Processing ended for this {URL}")
            # time.sleep(30)
            writeLog("----------------------------------------------------------------"+"\n")