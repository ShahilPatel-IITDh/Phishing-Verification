import csv
import urllib.parse
import re
import whois
import requests
from bs4 import BeautifulSoup
from datetime import datetime  # Add this import for calculate_age_of_domain function
import logging

logging.basicConfig(filename='log.txt', level=logging.INFO, format='%(message)s')


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

# log_file = "log.txt"
def write_log(message):
    logging.info(message+"\n")

def get_url_length(url, phish_id):
    length = len(url)
    write_log(f"Length of {phish_id} = {length}")

    return length

def has_IP_Address(url, phish_id):
    ip_pattern = r"\b(?:\d{1,3}\.){3}\d{1,3}\b"

    # Check if the URL contains an IP address
    if re.search(ip_pattern, url):
        write_log(f"{phish_id} has IP address")
        return 1
    else:
        write_log(f"{phish_id} has no IP")
        return -1

def has_url_shortening(url, phish_id):
    # Check if the URL matches any shortening service pattern
    for pattern in url_shortening_services:
        if re.search(pattern, url):
            write_log(f"{phish_id} has URL shortened")
            return 1

    write_log(f"{phish_id} doesn't have URL shortened")
    return -1

def has_At_Symbol(url, phish_id):
    if '@' in url:
        write_log(f"{phish_id} has @")
        return 1
    else:
        write_log(f"{phish_id} has no @")
        return -1

def has_double_slash_redirecting(url, phish_id):
    if '//' in url:
        write_log(f"{phish_id} has //")
        return 1
    else:
        write_log(f"{phish_id} doesn't have //")
        return -1

def has_prefix_suffix(url, phish_id):
    if url.startswith(('http://', 'https://', 'ftp://', 'mailto:', 'tel:')) and '/' in url:
        write_log(f"{phish_id} has prefix/suffix")
        return 1
    else:
        write_log(f"{phish_id} doesn't have prefix/suffix")
        return -1

def has_sub_domain(parsed_url, phish_id):
    subdomain = parsed_url.hostname
    write_log(f"{phish_id}'s subdomain = {subdomain}")
    if subdomain is None:
        return -1
    else:
        return subdomain.count('.') > 1

# This function will return 1 if the SSL connection has reached its final state or -1 if it has not.
def ssl_final_state(url, phish_id):
    try:
        response = requests.get(url, verify=True)
        if response.is_redirect or response.ok:
            write_log(f"{phish_id} has SSL Certificate")
            return 1
        
    except requests.exceptions.RequestException:
        write_log(f"{phish_id} doesn't have SSL Certificate")
    return -1

def has_port(parsed_url, phish_id):
    if(parsed_url.port):
        write_log(f"{phish_id} has Port")
        return 1
    
    else:
        write_log(f"{phish_id} doesn't have Port")
        return -1;


def domain_length(parsed_url, phish_id):
    domain = parsed_url.netloc
    write_log(f"{phish_id} has domain length of {len(domain)}")
    return len(domain)


def extract_features(url, phish_id):
    url = url.strip()  # Remove leading and trailing spaces
    parsed_url = urllib.parse.urlparse(url)

    # Extracting features based on the given rules
    features = [
            int(get_url_length(url, phish_id)),
            int(has_IP_Address(url, phish_id)),
            int(has_url_shortening(url, phish_id)),
            int(has_At_Symbol(url, phish_id)),
            int(has_double_slash_redirecting(url, phish_id)),
            int(has_prefix_suffix(url, phish_id)),
            int(has_sub_domain(parsed_url, phish_id)),
            int(ssl_final_state(url, phish_id)),
            int(has_port(parsed_url, phish_id)),
            int(domain_length(parsed_url, phish_id)),
    ]

    return features

def add_column_names_and_features(input_file, output_file, column_names):
    # Read data from the input CSV file
    data = []
    with open(input_file, 'r', newline='') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            data.append(row)

    # Add column names at the beginning of the data
    data.insert(0, column_names)

    # Extract features from each URL and add them to the data
    for row in data[1:]:  # Skipping the header row
        phish_id = row[0].strip()
        url = row[1].strip()  # Assuming the URL is in the second column (index 1)
        features = extract_features(url, phish_id)
        row.extend(features)

        with open(output_file, 'a', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(row)
        
        write_log("-----------------------------------------------------------------------------")

    # # Write data with column names and features to the output CSV file
    # with open(output_file, 'w', newline='') as csvfile:
    #     writer = csv.writer(csvfile)
    #     writer.writerows(data)

def create_csv(output_file, column_names):
    with open(output_file, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(column_names)

if __name__ == "__main__":
    # Replace 'input.csv' with the actual path to your input CSV file
    input_file = 'unconfirmed-URL.csv'

    # Replace 'output.csv' with the desired output path and filename
    output_file = 'output.csv'

    # Replace the column_names list with the desired column names in the order PhishID, PhishURL, Result,
    # followed by the feature names in the given order
    column_names = ['PhishID', 'PhishURL', 'Result', 'Length of URL', 'Has IP address', 'Shortening Service', 'Having @ Symbol', 'Double Slash Redirecting', 'Prefix-Suffix', 'Has Sub-domain', 'SSL Final State', 'Port', 'Domain Length']

    create_csv(output_file, column_names)

    add_column_names_and_features(input_file, output_file, column_names)

    print("Column names and features added to the CSV file successfully.")