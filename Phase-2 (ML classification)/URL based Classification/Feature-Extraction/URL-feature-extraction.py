import csv
import urllib.parse
import re
import whois
from datetime import datetime


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

# Function to check if a URL contains any of the shortening services
def has_url_shortening_service(url):
    for service in url_shortening_services:
        if re.search(service, url):
            return True
    return False

def get_domain_registration_length(url):
    try:
        domain = url.split("//")[-1].split("/")[0]
        w = whois.whois(domain)
        if w.creation_date and w.expiration_date:
            registration_length = (w.expiration_date - w.creation_date).days
            return registration_length
    except whois.parser.PywhoisError:
        pass
    return -1  # Return -1 if the registration length cannot be determined

# Function to extract features from a URL
def extract_features(url):
    url = url.strip()  # Remove leading and trailing spaces
    parsed_url = urllib.parse.urlparse(url)

    # Extracting features based on the given rules
    features = [
        int('-' in parsed_url.netloc),  # having_IP_Address
        len(url),  # URL_Length based on the length of the PhishURL string
        int(has_url_shortening_service(url)),  # Shortening_Service
        int('@' in parsed_url.netloc),  # having_At_Symbol
        int('//' in url),  # double_slash_redirecting
        int('-' in parsed_url.netloc or '-' in parsed_url.path),  # Prefix_Suffix
        int(parsed_url.netloc.split('.', 1)[0] != ''),  # having_Sub_Domain
        1 if parsed_url.scheme == 'https' else (0 if parsed_url.scheme == 'http' else -1),  # SSLfinal_State
        # int(get_domain_registration_length(url)),  # Domain_registration_length
        -1,  # Domain_registration_length (feature not provided in the URL)
        int('favicon' in parsed_url.path),  # Favicon
        int(parsed_url.port != ''),  # port
        int('https' in parsed_url.netloc or 'https' in parsed_url.path),  # HTTPS_token
        1,  # Request_URL (feature not provided in the URL)
        1,  # URL_of_Anchor (feature not provided in the URL)
        # ... rest of the features ...
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
    column_names = ['PhishID', 'PhishURL', 'Result',
                    'having_IP_Address', 'URL_Length', 'Shortening_Service', 'having_At_Symbol',
                    'double_slash_redirecting', 'Prefix_Suffix', 'having_Sub_Domain', 'SSLfinal_State',
                    'Domain_registration_length', 'Favicon', 'port', 'HTTPS_token', 'Request_URL',
                    'URL_of_Anchor', 'Links_in_tags', 'SFH', 'Submitting_to_email', 'Abnormal_URL',
                    'Redirect', 'on_mouseover', 'RightClick', 'popUpWindow', 'Iframe', 'age_of_domain',
                    'DNSRecord', 'web_traffic', 'Page_Rank', 'Google_Index', 'Links_pointing_to_page',
                    'Statistical_report']

    add_column_names_and_features(input_file, output_file, column_names)

    print("Column names and features added to the CSV file successfully."),