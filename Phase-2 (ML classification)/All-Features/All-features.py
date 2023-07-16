# Code to Extract the URL based and content based features from the Excel sheet containing URL, PhishID and other fields.
# - Check if the *status code* column, is 0 or not. If not then process the URL and it's source code

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

xpaths = [
    "/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[7]/div[2]",
    "/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[7]/div[4]",
    "/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[8]/div[2]",
    "/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[8]/div[4]",
    "/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[9]/div[2]",
    "/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[9]/div[4]",
    "/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[23]/div[2]",
    "/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[26]/div[2]",
    "/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[27]/div[2]"
]

# Function to extract the Domain features form 3rd party website: 'https://checkpagerank.net/index.php'
def scrape_data_from_xpaths(url, parsedURL, PhishID, xpaths):
    # Create a new instance of the Chrome driver
    driver = webdriver.Chrome()

    # Scrape data from each specified XPath
    scrapedData = {}

    try:
        # Convert the parsed URL back to a string
        domain = parsedURL.netloc
        print(domain)
        # Navigate to the required link
        driver.get('https://checkpagerank.net/index.php')

        # Find the input field (search box) for the URL and enter the parsed URL
        url_input = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//input[@title='Valid link only']")))
        url_input.send_keys(domain)

        # Find the submit button and click it
        submit_button = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//button[normalize-space()='Submit']")))
        submit_button.click()

        # Wait for 5 seconds to allow the page to load
        driver.implicitly_wait(5)

        # Scrape data from each xPath and store it in the dictionary
        for xpath in xpaths:
            try:
                element = driver.find_element(By.XPATH, xpath)
                scrapedData[xpath] = element.text
            
            except NoSuchElementException:
                scrapedData[xpath] = -1

        # Return the data dictionary
        return scrapedData
    
    finally:
        # Quit the WebDriver to close the browser window
        driver.quit()
        

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

def checkLinksInTags(url, PhishID, response, soup):
    success = 0
    i = 0

    if response.status_code != 200:
        return -999

    if soup:
        domain = re.findall(r"://([^/]+)/?", url)[0]

        for link in soup.find_all('link', href=True):
            dots = [x.start(0) for x in re.finditer('\.', link['href'])]
            if url in link['href'] or domain in link['href'] or len(dots) == 1:
                success += 1
            i += 1

        for script in soup.find_all('script', src=True):
            dots = [x.start(0) for x in re.finditer('\.', script['src'])]
            if url in script['src'] or domain in script['src'] or len(dots) == 1:
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
    else:
        return -999

def checkForForm(URL, PhishID, response, soup):

    if response.status_code != 200:
        return -999

    # If the 'form' element is not present then return 1
    if len(soup.find_all('form', action=True)) == 0:
        writeLog(f"{PhishID} has no form"+"\n")
        return 1
    
    else:
        domain = re.findall(r"://([^/]+)/?", URL)[0]

        # If the domain part is not present in the 'action' attribute of the form then return -1
        for form in soup.find_all('form', action=True):
            if form['action'] == "" or form['action'] == "about:blank":
                writeLog(f"{PhishID} has no action"+"\n")
                return -1
            
            elif URL not in form['action'] and domain not in form['action']:
                writeLog(f"{PhishID} has no domain in action"+"\n")
                return 0
            
            else:
                writeLog(f"{PhishID} has domain in action"+"\n")
                return 1

def checkForSubmitToEmail(URL, PhishID, response, soup):

    if response.status_code != 200:
        return -999

    if soup.text == "":
        writeLog(f"{PhishID} has no text"+"\n")
        return -1
    
    else:
        if re.findall(r"[mail\(\)|mailto:?]", soup.text):
            writeLog(f"{PhishID} has mailto"+"\n")
            return -1
        else:
            writeLog(f"{PhishID} has no mailto"+"\n")
            return 1

def checkOnMouseOver(URL, PhishID, response, soup):

    if response.status_code != 200:
        return -999


    if soup.text == "":
        writeLog(f"{PhishID} has no text"+"\n")
        return -1
    else:
        if re.findall(r"<script>.+onmouseover.+</script>", soup.text):
            writeLog(f"{PhishID} has onmouseover"+"\n")
            return 1
        else:
            writeLog(f"{PhishID} has no onmouseover"+"\n")
            return -1

def checkRightClick(URL, PhishID, response, soup):

    if response.status_code != 200:
        return -999

    if soup.text == "":
        writeLog(f"{PhishID} has no text"+"\n")
        return -1
    else:
        if re.findall(r"event.button ?== ?2", soup.text):
            writeLog(f"{PhishID} has right click"+"\n")
            return 1
        else:
            writeLog(f"{PhishID} has no right click"+"\n")
            return -1

def checkForPopUpWindow(URL, PhishID, response, soup):

    if response.status_code != 200:
        writeLog(f"{PhishID} request failed"+"\n")
        return -999

    if soup.text == "":
        writeLog(f"{PhishID} has no text"+"\n")
        return -1
    else:
        detected = False

        # Check for different pop-up window scenarios
        if re.findall(r"alert\(", soup.text):
            writeLog(f"{PhishID} has alert"+"\n")
            detected = True

        if re.findall(r"window\.open\(", soup.text):
            writeLog(f"{PhishID} has window.open"+"\n")
            detected = True

        if re.findall(r"confirm\(", soup.text):
            writeLog(f"{PhishID} has confirm"+"\n")
            detected = True

        # Add more checks for other pop-up window patterns as needed

        if detected:
            return 1
        else:
            writeLog(f"{PhishID} has no pop-up windows"+"\n")
            return -1

def checkForIFrame(URL, PhishID, response, soup):

    if response.status_code != 200:
        return -999

    iframes = soup.find_all('iframe')

    if len(iframes) > 0:
        writeLog(f"{PhishID} has iframe"+"\n")
        return 1
    else:
        writeLog(f"{PhishID} has no iframe"+"\n")
        return -1   

def checkForRedirects(URL, PhishID, response, soup):
    if soup.text == "":
        print("added -1 to 19th feature")
        return -1

    else:
        try:
            responseNew = requests.head(URL, allow_redirects=True)
            length_unsafe = len(responseNew.history) 
            
            # (1->legitimate, -1->phishing)
            if(length_unsafe <=1):
                return 1
            
            else:
                return -1

        except requests.exceptions.RequestException:
            # Handle any exceptions that occur during the request
            print("error")  

def extract_URL_features(URL, PhishID, response, soup):
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
    linksInTags = int(checkLinksInTags(url, PhishID, response, soup))

    # 13: Check for the existence of the form (if present: 1, if not present: -1)
    formExists = int(checkForForm(url, PhishID, response, soup))
    
    # 14: Check for Submitting to email (if present: 1, if not present: -1)
    toEmail = int(checkForSubmitToEmail(url, PhishID, response, soup))

    # 15: Check for onmouseover (if present: 1, if not present: -1)
    onMouseOver = int(checkOnMouseOver(url, PhishID, response, soup))

    # 16: Check for Right Click (if present: 1, if not present: -1)
    rightClick = int(checkRightClick(url, PhishID, response, soup))
    
    # 17: Check for pop-up window (if present: 1, if not present: -1)
    popUpWindow = int(checkForPopUpWindow(url, PhishID, response, soup))

    # 18: Check for IFrame (if present: 1, if not present: -1)
    hasIFrame = int(checkForIFrame(url, PhishID, response, soup))
    
    # 19: Check for redirects
    re_directs = int(checkForRedirects(url, PhishID, response, soup))

    scraped_data = scrape_data_from_xpaths(url, parsed_url, PhishID, xpaths)

    # # Store the scraped data into separate variables
    DomainAuth = scraped_data["/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[7]/div[2]"]
    PageAuth = scraped_data["/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[8]/div[2]"]
    TrustFlow = scraped_data["/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[8]/div[2]"]
    TrustMetric = scraped_data["/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[8]/div[4]"]
    CitationFlow = scraped_data["/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[9]/div[2]"]
    DomainValidity = scraped_data["/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[9]/div[4]"]
    RootIP = scraped_data["/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[23]/div[2]"]
    TopicValue = scraped_data["/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[26]/div[2]"]
    IndexedURLs = scraped_data["/html[1]/body[1]/div[1]/div[2]/div[2]/div[3]/div[27]/div[2]"]

    # Create a dictionary to store the feature values
    features = {
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

        'Domain Authority': DomainAuth,
        'Page Authority': PageAuth,
        'Trust Flow': TrustFlow,
        'Trust Metric': TrustMetric,
        'Citation Flow': CitationFlow,
        'Domain Validity': DomainValidity,
        'Root IP': RootIP,
        'Topic Value': TopicValue,
        'Indexed URLs': IndexedURLs,
        'Statistical Report': -1,
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
        'Length of URL', 'Has IP address', 'Shortening Service', 'Having @ Symbol',
        'Double Slash Redirecting', 'Prefix-Suffix', 'Has Sub-domain', 'SSL Final State',
        'Port', 'Domain Length', 'URL of Anchor', 'Links In Tags', 'Forms in the HTML', 'Submits to Email', 'On Mouseover', 'Right Click', 'Pop Window', 'IFrame', 'Redirects', 'Domain Authority', 'Page Authority', 'Trust Flow', 'Trust Metric', 'Citation Flow', 'Domain Validity', 'Root IP', 'Topic Value', 'Indexed URLs', 'Statistical Report'
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

    # Check if the URL is empty
    if URL == "":
        logging.warning(f"Empty URL for PhishID: {PhishID}")
        return

    
    # print into the log file
    logging.info(f"Processing {URL} with ID: {PhishID}")

    # Process the URL and extract features
    extract_URL_features(URL, PhishID, response, soup)


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
        # Count is kept below 10 just for testing purpose of the code
        if PhishID not in visitedPhishIDs and statusCode != 0 and count<10:

            count+=1

            # Add the PhishID to the set
            visitedPhishIDs.add(PhishID)

            # Call the function to begin the processing of URLs and also extract the content based features
            beginProcessing(URL, PhishID)
            writeLog("----------------------------------------------------------------")