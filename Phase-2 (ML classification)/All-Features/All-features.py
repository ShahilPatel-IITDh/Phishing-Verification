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
import whois
from whois.parser import PywhoisError
from urllib.parse import urljoin, urlparse

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
        

def getLen(url, PhishID):
    if url is not None:
        writeLog(f"{PhishID} has length {len(url)}" + "\n")
        return len(url)

    writeLog(f"{PhishID} has length 0" + "\n")
    return 0
    
def checkforIP(url, PhishID):

    ip_pattern = r"^((\d{1,3}\.){3}\d{1,3})|localhost$"
    
    # Check if the URL contains an IP address
    
    if re.search(ip_pattern, url):
        writeLog(f"{PhishID} has IP address" + "\n")
        return 1

    else:
        writeLog(f"{PhishID} has no IP" + "\n")
        return -1

def has_ShorteningServices(url, PhishID):

    # Check if the URL matches any shortening service pattern
    for pattern in url_shortening_services:
        if re.search(pattern, url):
            writeLog(f"{PhishID} has URL shortened"+ "\n")
            return 1

    writeLog(f"{PhishID} doesn't have URL shortened"+ "\n")
    return -1

def has_At_Symbol(url, PhishID):
    # If the '@' is present in the URL, then return 1
    if '@' in url:
        writeLog(f"{PhishID} has @"+"\n")
        return 1
    
    # else return -1
    else:
        writeLog(f"{PhishID} has no @"+"\n")
        return -1

def has_double_slash_redirecting(url, PhishID):
    # If the '//' is present in the URL
    if '//' in url:
        writeLog(f"{PhishID} has //"+"\n")
        return 1

    else:
        writeLog(f"{PhishID} doesn't have //"+"\n")
        return -1

def has_prefix_suffix(url, PhishID):
    # If the URL starts with prefix then return 1
    if url.startswith(('http://', 'https://', 'ftp://', 'mailto:', 'tel:')) and '/' in url:
        writeLog(f"{PhishID} has prefix/suffix"+"\n")
        return 1

    else:
        writeLog(f"{PhishID} doesn't have prefix/suffix"+"\n")
        return -1

def has_sub_domain(parsedURL, PhishID):

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

def has_port(parsedURL, PhishID):
    # If the port is present in the parsed URL then return 1
    if(parsedURL.port):
        writeLog(f"{PhishID} has Port"+"\n")
        return 1
    
    else:
        writeLog(f"{PhishID} doesn't have Port"+"\n")
        return -1;

def getDomainLength(parsedURL, PhishID):
    try:    
        # get the domain
        domain = parsedURL.netloc
        whoisInstance = whois.whois(domain)

        domainName = whoisInstance.domain_name

        writeLog(f"{PhishID} has domain length of {len(domainName)}"+"\n")
        return len(domainName)

    except whois.parser.PywhoisError as e:
        # Handle the PywhoisError here
        writeLog(f"Error: No WHOIS match found for {PhishID} the domain")
        return 0


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

def subtract_dates(date1, date2):
    if isinstance(date1, list):
        date1 = date1[0]
    if isinstance(date2, list):
        date2 = date2[0]

    # Calculate the difference between the dates in days
    date_difference = (date2 - date1).days
        
    # Convert the difference to years
    date_difference_years = date_difference / 365
        
    return date_difference_years

def getDomainAge(url, parsedURL, PhishID):
    domain = parsedURL.netloc
    
    try:
        whoInstance = whois.whois(domain)
        creation_date = whoInstance.creation_date
        expiration_date = whoInstance.expiration_date
        
        registrationAge = subtract_dates(creation_date, expiration_date)

        # If the domain has been registered for less than a year, it is considered suspicious
        if registrationAge <= 365:
            return -1
        
        # If the domain has been registered for more than a year, it is considered legitimate
        else:
            return 1
    
    except whois.parser.PywhoisError as e:
        # Handle the PywhoisError here
        writeLog(f"Error: No WHOIS match found for {PhishID} the domain")
        return 0

def checkForFavicon(URL, response, PhishID):
    # Parse the HTML content (needed for feature no. 21)
    textSoup = BeautifulSoup(response.text, 'html.parser')

    # List of favicon link types to check
    favicon_link_types = ['icon', 'apple-touch-icon', 'shortcut icon', 'mask-icon', 'fluid-icon', 'manifest', 'yandex-tableau-widget']

    for link_type in favicon_link_types:
        # Find the favicon link in the head section
        favicon_links = textSoup.find_all('link', rel=link_type)

        if favicon_links:
            for favicon_link in favicon_links:

                # Extract the href attribute value
                favicon_href = favicon_link.get('href')

                # Join the favicon href with the base URL to get the complete URL
                favicon_url = urljoin(URL, favicon_href)

                # Check if the favicon URL is hosted as a file or somewhere else
                if favicon_url.startswith(('http://', 'https://')):
                    # The favicon is hosted somewhere
                    writeLog(f"{PhishID} has a favicon" + "\n")
                    return 1

                else:
                    # The favicon URL follows the file structure
                    # Append the URL with the domain name and check its status
                    domain_name = urllib.parse.urlparse(URL).netloc
                    favicon_url = f"https://{domain_name}/{favicon_url}"

                    favicon_response = requests.get(favicon_url)

                    if favicon_response.status_code == 200:
                        # The favicon URL is accessible
                        writeLog(f"{PhishID} has an accessible favicon" + "\n")
                        return 1
                    else:
                        # The favicon URL is not accessible
                        writeLog(f"{PhishID} has either has no favicon or is not accessible" + "\n")
                        return -1
                    
    # Favicon link not found
    return 0

def checkForStandardPort(parsed_url, PhishID):
    # Extract the port number from the URL
    port = parsed_url.port

    # Check if the port number is in the list of standard ports
    standard_ports_open = [80, 443]
    standard_ports_closed = [21, 22, 23, 445, 1433, 1521, 3306, 3389]

    if port in standard_ports_open:
        # The port is OPEN and standard, consider it phishing
        writeLog(f"{PhishID} is using a non-standard port ({port}), indicating phishing" + "\n")
        return 1

    elif port in standard_ports_closed:
        # The port is CLOSED and standard, consider it legitimate
        writeLog(f"{PhishID} is using a non-standard port ({port}), indicating legitimacy" + "\n")
        return -1

    else:
        # The port is neither standard nor open, consider it phishing
        writeLog(f"{PhishID} is using a non-standard port ({port}), indicating phishing" + "\n")
        return 1


def checkForCTLD(URL, PhishID):
    try:
        # Remove "www." from the URL
        parsed_url = urlparse(URL)
        domain_parts = parsed_url.netloc.split('.')

        cctld = domain_parts[-1] if len(domain_parts) > 1 else ''

        known_cctlds = {"uk", "us", "ca", "au", "fr", "eu","in","cn", "tk", "de", "nl","ru","jp","kr","ca","pl","gr","cz","hu","it","es"} # Add more ccTLDs as needed

        if cctld in known_cctlds:
            domain_parts = domain_parts[:-1]
        
        domain = '.'.join(domain_parts) if domain_parts else parsed_url.netloc
        domain = domain.replace("www.", "")
        
        dotCount = domain.count(".")
        
        # Classify the URL based on the number of dots
        if dotCount == 1:
            return 1
        
        elif dotCount == 2:
            return 0
        
        else:
            return -1
        
    except Exception as e:
        # Handle any exceptions or errors during URL classification
        print("Error occurred during URL classification:", e)
        return -999

def checkForHTTPSInDomain(URL, PhishID):
    parsedURL = urlparse(URL)
    domain = parsedURL.netloc

    if "https" in domain or "HTTPS" in domain:
        writeLog(f"{PhishID} is using HTTPS in the domain, indicating phishing" + "\n")
        return -1
    
    else:
        writeLog(f"{PhishID} is NOT using HTTPS in the domain, indicating legitimacy" + "\n")
        return 1

def checkForLinksInMeta_link_script(URL, PhishID, HTML_path, JavaScript_path, CSS_path):

    domain = urllib.parse.urlparse(URL).netloc
    total_links = 0
    same_domain_links = 0

    # Function to count links with the same domain in a given content
    def count_same_domain_links(content):
        nonlocal total_links, same_domain_links
        soup = BeautifulSoup(content, 'html.parser')
        tags = ['meta', 'script', 'link']
        for tag in tags:
            for link in soup.find_all(tag, href=True):
                total_links += 1
                link_url = urllib.parse.urlparse(link['href']).netloc
                if link_url == domain:
                    same_domain_links += 1
            for script in soup.find_all(tag, src=True):
                total_links += 1
                script_url = urllib.parse.urlparse(script['src']).netloc
                if script_url == domain:
                    same_domain_links += 1

    # Scan HTML files
    if os.path.exists(HTML_path):
        html_files = [file for file in os.listdir(HTML_path) if file.endswith('.html')]
        for file in html_files:
            file_path = os.path.join(HTML_path, file)
            with open(file_path, 'r', encoding='utf-8') as html_file:
                content = html_file.read()
                count_same_domain_links(content)

    # Scan JavaScript files
    if os.path.exists(JavaScript_path):
        js_files = [file for file in os.listdir(JavaScript_path) if file.endswith('.js')]
        for file in js_files:
            file_path = os.path.join(JavaScript_path, file)
            with open(file_path, 'r', encoding='utf-8') as js_file:
                content = js_file.read()
                count_same_domain_links(content)

    if total_links == 0:
        return 0

    percentage = same_domain_links / total_links * 100

    if percentage < 17:
        writeLog(f"{PhishID} has {percentage}% of links with the same domain, indicating legitimacy" + "\n")
        return 1  # Legitimate
    
    elif 17 <= percentage < 81:
        writeLog(f"{PhishID} has {percentage}% of links with the same domain, indicating suspicious" + "\n")
        return 0  # Suspicious
    
    else:
        writeLog(f"{PhishID} has {percentage}% of links with the same domain, indicating phishing" + "\n")
        return -1  # Phishing


def checkForFormAction(URL, PhishID, HTML_path, JavaScript_path, CSS_path):
    domain = urllib.parse.urlparse(URL).netloc

    # Function to check form action field in a given content
    def check_form_action(content):
        soup = BeautifulSoup(content, 'html.parser')
        forms = soup.find_all('form')
        for form in forms:
            action_url = form.get('action')
            if not action_url or action_url == 'about:blank':
                writeLog(f"{PhishID} has a blank form action, indicating phishing" + "\n")
                return -1  # Phishing

            else:
                action_domain = urllib.parse.urlparse(action_url).netloc
                if action_domain != domain:
                    writeLog(f"{PhishID} has a form action to a different domain, indicating phishing" + "\n")
                    return 0  # Suspicious

        writeLog(f"{PhishID} has a form action to the same domain, indicating legitimacy" + "\n")
        return 1  # Legitimate

    # Scan HTML files
    if os.path.exists(HTML_path):
        html_files = [file for file in os.listdir(HTML_path) if file.endswith('.html')]
        for file in html_files:
            file_path = os.path.join(HTML_path, file)
            with open(file_path, 'r', encoding='utf-8') as html_file:
                content = html_file.read()
                result = check_form_action(content)
                if result == -1:  # Phishing
                    writeLog(f"{PhishID} has a form action to a different domain, indicating phishing" + "\n")
                    return -1

    # Scan JavaScript files
    if os.path.exists(JavaScript_path):
        js_files = [file for file in os.listdir(JavaScript_path) if file.endswith('.js')]
        for file in js_files:
            file_path = os.path.join(JavaScript_path, file)
            with open(file_path, 'r', encoding='utf-8') as js_file:
                content = js_file.read()
                result = check_form_action(content)
                if result == -1:  # Phishing
                    writeLog(f"{PhishID} has a form action to a different domain, indicating phishing" + "\n")
                    return -1
    writeLog(f"{PhishID} has a form action to the same domain, indicating legitimacy" + "\n")
    return 1  # Legitimate


def checkForDNSRecord(URL, PhishID):
    try:
        # Get the domain information using whois
        domain_info = whois.whois(URL)

        # Check if the domain info is empty (inactive phishing web page)
        if not domain_info:
            return 1  # Legitimate

        # Check the registration date if it exists
        if 'creation_date' in domain_info:
            creation_date = domain_info['creation_date']

            # If it's a list, get the first date (considering multiple dates)
            if isinstance(creation_date, list):
                creation_date = creation_date[0]

            # Check if the registration length is less than 1 year
            current_date = datetime.now()
            registration_length = (current_date - creation_date).days
            if registration_length < 365:
                return -1  # Legitimate
            
    except whois.parser.PywhoisError:
        # Exception occurred (e.g., invalid domain or connection issue)
        return 0 # Suspicious

    return 1  # Phishing


# ------------------------------------------------------------------------------#
def extract_URL_features(URL, PhishID, response, soup, HTML_path, JavaScript_path, CSS_path):
    url = URL.strip()  # Remove leading and trailing spaces

    parsed_url = urllib.parse.urlparse(url)

    # The features of From URL

    # 1: Length of the URL
    length_of_URL = int(getLen(url, PhishID))    

    # 2: Check for IP address (if present then 1, -1 otherwise)
    has_IP_address = int(checkforIP(url, PhishID))

    # 3: Check for URL shortening services (if present then 1, -1 otherwise)
    has_shortening_service = int(has_ShorteningServices(url, PhishID))

    # 4: Check for '@' symbol in the URL (if present: 1, if not present: -1)
    has_At_symbol = int(has_At_Symbol(url, PhishID))

    # 5: Check for double slash in the URL (if present: 1, if not present: -1)
    hasDouble_slash = int(has_double_slash_redirecting(url, PhishID))
        
    # 6: Check if the URL has prefix and suffix (if present: 1, if not present: -1)
    hasPrefix_suffix = int(has_prefix_suffix(url, PhishID))

    # 7: Check if the URL has sub-domain (if present: 1, if not present: -1)
    has_SubDomain = int(has_sub_domain(parsed_url, PhishID))

    # 8: Check the SSL state of the URL (if present: 1, if not present: -1)
    checkSSL_State = int(ssl_final_state(url, PhishID, response, soup))

    # 9: check for the 'port' in the URL (if present: 1, if not present: -1) 
    checkPort = int(has_port(parsed_url, PhishID))

    # 10: get the domain length of the URL (using whois)
    domainLength = int(getDomainLength(parsed_url, PhishID))

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
    re_directs = int(checkForRedirects(url, PhishID, HTML_path, JavaScript_path, CSS_path))

    # 20: Domain Age
    domainAge = int(getDomainAge(url, parsed_url, PhishID))

    # 21: Match the domain of favicon URL and 
    favicon = int(checkForFavicon(url, response, PhishID))
    
    # 22: Check for standard Port usage
    standardPort = int(checkForStandardPort(parsed_url, PhishID))

    # 23: CTLD, country code removing and testing domain
    ctld = int(checkForCTLD(url, PhishID))

    # 24: HTTPS in domain. (If present it means phishing)
    httpsInDomain = int(checkForHTTPSInDomain(url, PhishID))

    # 25: Links in <meta>, <link>, <script>
    linksInMeta_Link_script = int(checkForLinksInMeta_link_script(url, PhishID, HTML_path, JavaScript_path, CSS_path))

    # 26: Check for form action
    formAction = int(checkForFormAction(url, PhishID, HTML_path, JavaScript_path, CSS_path))

    # 27: DNS Record (If a phishing web page is inactive then its entry will be empty Else if the phishing web page is active but its registration length is < 1 year)
    dnsRecord = int(checkForDNSRecord(url, PhishID))

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

        'Domain Age': domainAge,
        'Match Favicon': favicon,
        'Standard Port': standardPort,
        'CTLD': ctld,
        'HTTPS in Domain': httpsInDomain,

        'Links in Meta, Link, Script': linksInMeta_Link_script,
        'Form Action': formAction,
        'DNS Record': dnsRecord,
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
        'Port', 'Domain Length', 'URL of Anchor', 'Links In Tags', 'Forms in the HTML', 'Submits to Email', 'On Mouseover', 'Right Click', 'Pop Window', 'IFrame', 'Redirects','Domain Age', 'Match Favicon', 'Standard Port', 'CTLD', 'HTTPS in Domain', 'Links in Meta, Link, Script', 'Form Action', 'DNS Record'
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

    count = 0

    # Iterate over each row in the Excel file
    for index, row in ExcelData.iterrows():
        PhishID = row['PhishID']
        URL = row['URL']
        statusCode = row['Status Code']

        # Check if the URL is already processed or not, and the status code is not 0
        if PhishID not in visitedPhishIDs and statusCode != 0 and count<=10:

            # Add the PhishID to the set
            visitedPhishIDs.add(PhishID)
            count+=1

            print(f"Processing started for this {URL}")
            # Call the function to begin the processing of URLs and also extract the content based features
            beginProcessing(URL, PhishID)

            print(f"Processing ended for this {URL}")
            # time.sleep(30)
            writeLog("----------------------------------------------------------------"+"\n")