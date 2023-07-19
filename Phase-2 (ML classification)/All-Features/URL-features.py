# Code to Extract the URL based and content based features from the Excel sheet containing URL, PhishID and other fields.
# - Check if the *status code* column, is 0 or not. If not then process the URL and it's source code

import threading
import time
import os
import pandas as pd
import csv
import urllib.parse
import re
import requests
from bs4 import BeautifulSoup
import logging
from urllib.parse import urljoin, urlparse

# Maintian a log file to print the status of the URL processing
logging.basicConfig(filename='Complete-LogFile.log', level=logging.DEBUG, format='%(asctime)s %(message)s')

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

def has_port(parsedURL, PhishID):
    # If the port is present in the parsed URL then return 1
    if(parsedURL.port):
        writeLog(f"{PhishID} has Port"+"\n")
        return 1
    
    else:
        writeLog(f"{PhishID} doesn't have Port"+"\n")
        return -1;


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

def checkForStandardPort(parsedURL, PhishID):
    # Extract the port number from the URL
    port = parsedURL.port

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
            writeLog(f"Number of dots in {URL} is 1")
            return 1
        
        elif dotCount == 2:
            writeLog(f"Number of dots in {URL} is 2")
            return 0
        
        else:
            writeLog(f"Number of dots in {URL} is more than 2")
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


def getNumberOfSubDomain(parsedURL, PhishID):
    subdomain = parsedURL.hostname.split('.')
    num_levels = len(subdomain) - 1  # Subtract 1 for the root domain
    writeLog(f"subdomain levels = {num_levels}")
    return num_levels


def checkEmbeddedDomain(URL, PhishID):
     # Extract the path part of the URL
    path = URL.split('/', 3)[-1]  # Get the fourth component after splitting by '/'
    
    # Define a regular expression pattern to check for dot-separated domain patterns
    pattern = r'(?i)(\w+\.)+\w+'

    # Search for the pattern in the path
    matches = re.search(pattern, path)

    # If a match is found, return True, otherwise return False
    matches = bool(matches)
    if(matches==True):
        return 1
    
    return -1

def getTokens(URL, PhishID):
    # Define a regular expression pattern to find non-alphanumeric characters
    pattern = r'[^a-zA-Z0-9]'

    # Find all non-alphanumeric characters in the URL using the pattern
    matches = re.findall(pattern, URL)

    # Return the number of non-alphanumeric characters found
    return len(matches)


def checkSensitiveWords(URL, PhishID):
    sensitive_words = ['secure', 'account', 'webscr', 'login', 'ebayisapi', 'signin', 'banking', 'confirm']

    for word in sensitive_words:
        if word in URL.lower():  # Convert the URL to lowercase for case-insensitive matching
            writeLog("Sensitive Words present in the url")
            return 1
    
    writeLog("Sensitive words not present")
    return -1

def getDomainLength(parsedURL, PhishID):
    domain = parsedURL.hostname

    if domain:
        writeLog(f"Length of Domain: {len(domain)}")
        return len(domain)
    else:
        writeLog(f"Domain not present")
        return -1


def checkTilde(URL, PhishID):
    return '∼' in URL


def numberOfDots_inURL(URL, PhishID):
    return URL.count('.')

def isHyphenThere(parsedURL, PhishID):
    domain = parsedURL.hostname

    if domain:
        return '-' in domain
    else:
        return False

# ------------------------------------------------------------------------------#

def extract_URL_features(URL, PhishID, response, soup):

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

    # 8: check for the 'port' in the URL (if present: 1, if not present: -1) 
    checkPort = int(has_port(parsed_url, PhishID))

    # 9: Match the domain of favicon URL and 
    favicon = int(checkForFavicon(url, response, PhishID))
    
    # 10: Check for standard Port usage
    standardPort = int(checkForStandardPort(parsed_url, PhishID))

    # 11: CTLD, country code removing and testing domain
    ctld = int(checkForCTLD(url, PhishID))

    # 12: HTTPS in domain. (If present it means phishing)
    httpsInDomain = int(checkForHTTPSInDomain(url, PhishID))

    # 13: Check number of sub-domain levels in the URL
    numOfSubDomains = int(getNumberOfSubDomain(parsed_url, PhishID))

    # 14: Check if the url has embedded domains
    hasEmbeddedDomain = int(checkEmbeddedDomain(url, PhishID))

    # 15: get number of non-alphanumric characters in the URL
    numberOfTokens = int(getTokens(url, PhishID))

    # 16: check if the sensitive words are present or not in the URL
    checkSensitive = int(checkSensitiveWords(url, PhishID))

    # 17: Get the domain Length
    domainLength = int(getDomainLength(parsed_url, PhishID))

    # 18: check if the URL has tilde
    hasTilde = int(checkTilde(url, PhishID))

    # 19: Get the number of dots present in the URL
    numberOfDots = int(numberOfDots_inURL(url, PhishID))

    # 20: Check if the Domain has '-'
    checkHyphen = int(isHyphenThere(parsed_url, PhishID))

    # Create a dictionary to store the feature values
    features = {
        'Length of URL': length_of_URL,
        'Has IP address': has_IP_address,
        'Shortening Service': has_shortening_service,
        'Having @ Symbol': has_At_symbol,
        'Double Slash Redirecting': hasDouble_slash,
        'Prefix-Suffix': hasPrefix_suffix,
        'Has Sub-domain': has_SubDomain,
        'Port': checkPort,
        'Match Favicon': favicon,
        'Standard Port': standardPort,
        'CTLD': ctld,
        'HTTPS in Domain': httpsInDomain,
        'Sub-Domain Levels': numOfSubDomains,
        'Embedded Domains': hasEmbeddedDomain, 
        'Number of Tokens': numberOfTokens, 
        'Sensitive Words': checkSensitive,
        'Domain Length': domainLength,
        'Has Tilde': hasTilde, 
        'Dots in URL': numberOfDots,
        'Hyphen in Domain Name': checkHyphen
    }

    # Read the existing data from the Feature-Extracted.csv file
    existingData = pd.read_csv('Full-URL-Feature-Extracted.csv')

    # Update the feature values for the corresponding PhishID row, without overwriting or removing the values present in columns [HTML, CSS, JS, Images .... Status_Code]
    existingData.loc[existingData['PhishID'] == PhishID, features.keys()] = features.values()

    # Save the updated data back to the Feature-Extracted.csv file
    existingData.to_csv('Full-URL-Feature-Extracted.csv', index=False)


def generateCSV(excel_filePath):
    # Read the Excel file
    data = pd.read_excel(excel_filePath)

    # Extract existing column names
    columnNames = list(data.columns)

    # Only URL-based features
    additional_columns = [
        'Length of URL', 'Has IP address', 'Shortening Service', 'Having @ Symbol',
        'Double Slash Redirecting', 'Prefix-Suffix', 'Has Sub-domain', 'Match Favicon', 'Standard Port', 'CTLD', 'HTTPS in Domain', 'Sub-Domain Levels', 'Embedded Domains', 'Number of Tokens', 'Sensitive Words', 'Domain Length', 'Has Tilde', 'Dots in URL', 'Hyphen in Domain Name'
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
    csv_file_path = 'Full-URL-Feature-Extracted.csv'
    newData.to_csv(csv_file_path, index=False)

def beginProcessing(URL, PhishID):

    # Instead of finding response, each and every time, find the response and soup object once and pass it to the function
    try:
        response = requests.get(URL)
        soup = BeautifulSoup(response.content, 'html.parser')

        # Check if the URL is empty
        if URL == "":
            logging.warning(f"Empty URL for PhishID: {PhishID}")
            return

        
        # print into the log file
        logging.info(f"Processing {URL} with ID: {PhishID}")

        # Create a thread to process the URL within the time limit
        url_thread = threading.Thread(target=extract_URL_features, args=(URL, PhishID, response, soup))

        # Start the thread
        url_thread.start()

        # Set a time limit for the thread to finish (2 minutes)
        url_thread.join(timeout=120)

        # Check if the thread is still alive (i.e., the processing is not completed within 2 minutes)
        if url_thread.is_alive():
            print("URL processing took more than 2 minutes. Features set to NULL.")

        # print into the log file
        logging.info(f"Processed {URL} with ID: {PhishID}")
    
    except requests.exceptions.ConnectTimeout as e:
        print(f"Connection to {URL} timed out. Error: {e}")
    except requests.exceptions.RequestException as e:
        print(f"An error occurred while making the request. Error: {e}")


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
        if PhishID not in visitedPhishIDs and statusCode != 0:

            # Add the PhishID to the set
            visitedPhishIDs.add(PhishID)

            print(f"Processing started for this {URL}")
                
            # Call the function to begin the processing of URLs and also extract the content based features
                
            beginProcessing(URL, PhishID)
            print(f"Processing ended for this {URL}")
            print(count)
            print("-------------------------------------------------------------------"+"\n")# time.sleep(30)
            writeLog("----------------------------------------------------------------"+"\n")
            
            count+=1