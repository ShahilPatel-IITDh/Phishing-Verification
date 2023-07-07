import csv
import urllib.parse
import re
import whois
import requests
from bs4 import BeautifulSoup
from datetime import datetime  # Add this import for calculate_age_of_domain function

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

def extract_features(url):
    url = url.strip()  # Remove leading and trailing spaces
    parsed_url = urllib.parse.urlparse(url)

    # Extracting features based on the given rules
    features = [
            
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
        url = row[1].strip()  # Assuming the URL is in the second column (index 1)
        features = extract_features(url)
        row.extend(features)

    # Write data with column names and features to the output CSV file
    with open(output_file, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(data)

if __name__ == "__main__":
    # Replace 'input.csv' with the actual path to your input CSV file
    input_file = 'unconfirmed-URL.csv'

    # Replace 'output.csv' with the desired output path and filename
    output_file = 'output.csv'

    # Replace the column_names list with the desired column names in the order PhishID, PhishURL, Result,
    # followed by the feature names in the given order
    column_names = ['PhishID', 'PhishURL', 'Result']

    add_column_names_and_features(input_file, output_file, column_names)

    print("Column names and features added to the CSV file successfully.")