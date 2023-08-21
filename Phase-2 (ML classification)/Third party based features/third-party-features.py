import pandas as pd
import ipaddress
import re
from urllib.parse import urlparse 
import whois
from whois.parser import PywhoisError
import logging
from datetime import datetime

# Maintian a log file to print the status of the URL processing
logging.basicConfig(filename='LogFile.log', level=logging.DEBUG, format='%(asctime)s %(message)s')

# function to write the message into the log file
def writeLog(message):
    logging.info(message+"\n") 

# Lists to store the values returned by functions
list_current_age_of_domain = []
list_match_domain_name = []
list_length_of_domain = []

def subtract_dates(date1, date2):
    if isinstance(date1, list):
        date1 = date1[0]
    if isinstance(date2, list):
        date2 = date2[0]

    if(date2 is not None and date1 is not None):
    # Calculate the difference between the dates in days
        date_difference = (date2 - date1).days
            
        # Convert the difference to years
        date_difference_years = date_difference / 365
            
        return date_difference_years
    
    else:
        return 0

# Get the current age of the domain
def get_current_age_Ofdomain(url, whoisInstance):

    if not whoisInstance:
        return 0
    
    try:
        if whoisInstance.creation_date is not None:
            creation_date = whoisInstance.creation_date
            
            # Extract the appropriate datetime value from the list if needed
            if isinstance(creation_date, list):
                creation_date = creation_date[0]

            current_datetime = datetime.now()

            # Calculate date difference
            date_difference = current_datetime - creation_date
            current_age = date_difference.days

            if current_age <= 365:
                return -1

            else:
                return 1
        
        else:
            return 0

    except whois.parser.PywhoisError as e:

        # Handle the PywhoisError here, and consider the url as suspicious
        writeLog(f"Error: No WHOIS match found for {url} the domain")
        return 0


# get the overall length of time till the URL will be valid (expiration date - creation date)
def length_domain(url, whoisInstance):

    # If the website is inactive then return {-1, 0, 1}
    if not whoisInstance:
        return 0

    try:
        creation_date = whoisInstance.creation_date
        expiration_date = whoisInstance.expiration_date

        # Check if either date is None
        if creation_date is None or expiration_date is None:
            return 0  # Cannot calculate registration age

        # Ensure creation_date is a valid datetime object
        if isinstance(creation_date, list):
            creation_date = min(creation_date)  # Use the earliest dat

        # Ensure expiration_date is a valid datetime object
        if isinstance(expiration_date, list):
            expiration_date = max(expiration_date)  # Use the latest date
        
        registrationAge = (expiration_date - creation_date).days
    
        if registrationAge <= 365:
            return -1

        else:
            return 1
    
    except whois.parser.PywhoisError as e:

        # Handle the PywhoisError here, and consider the url as suspicious
        writeLog(f"Error: No WHOIS match found for {url} the domain")
        return 0

def match_domain_name(domain, whoisInstance):

    # The domain in the argument has www. so the processed domain won't have www.
    processedDomain = domain.replace("www.", "")

    # Also the domain name in the whoisInstance will have uppercase letter, so convert it to lower case
    if whoisInstance.domain_name is None:
        return 0
    
    else:
        # Convert each element of the list to lowercase and compare
        if any(processedDomain == name.lower() for name in whoisInstance.domain_name):
            # If the domain name in the URL matches any domain name in the whois records, it's legitimate
            return 1

        else:
            return -1

def beginProcess(url):

    try:
        parsedURL = urlparse(url)
        domain = parsedURL.netloc
        whoisInstance = whois.whois(domain)

        # Features:

        # 1: Current age of domain (Current Date - Creation date)
        current_age_OfDomain = int(get_current_age_Ofdomain(url, whoisInstance))
        list_current_age_of_domain.append(current_age_OfDomain)


        # 2: Length of Domain (Expiration Date - Creation date)
        lengthOfDomain = int(length_domain(url, whoisInstance))
        list_length_of_domain.append(lengthOfDomain)

        # 3: Domain name matching
        matchDomainName = int(match_domain_name(domain, whoisInstance))
        list_match_domain_name.append(matchDomainName)
        

    except whois.parser.PywhoisError:
        # Exception occurred (e.g., invalid domain or connection issue)
        print(f"Not able to process: {url}")
        return 0


# The function to generate CSV file with extracted features
def generateCSV():
    
    data = {
        # 'URL': list_url,
        'Current Domain Age': list_current_age_of_domain,
        'Matching Domain Name': list_match_domain_name,
        'Length of Domain': list_length_of_domain
    }

    # Create a DataFrame from the dictionary
    df = pd.DataFrame(data)

    # Write the Phishy DataFrame to a Phishy-Data CSV file
    df.to_csv('Phishy-Data.csv', index=False)

    # Write the Legitimate DataFrame to a Legitimate-Data CSV file
    # df.to_csv('Legitimate-Data.csv', index=False)


if __name__ == '__main__':

    # Path to Legitimate data
    # ExcelFilePath = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Legitimate-Data.xlsx'
    
    # Path to Phishy data
    ExcelFilePath = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Phishy-Data.xlsx'

    # Read the Excel file into a pandas DataFrame
    df = pd.read_excel(ExcelFilePath) 

    set_of_urls = set()

    count = 0
    # Iterate through the DataFrame and print URLs for rows with 'Status Code' equal to 200
    for index, row in df.iterrows():
        url = row['URL']

        if url not in set_of_urls:
            set_of_urls.add(url)
            if row['Status Code'] == 200:

                # For cross-checking
                with open("urls_in_excel.txt","a") as f:
                    f.write(row['URL'] + "\n") 
                    f.write(f"{count}"+"\n")
                    f.write("--------------------------------------"+"\n")

                print(count)
                count+=1

                beginProcess(row['URL'])
                
    generateCSV()