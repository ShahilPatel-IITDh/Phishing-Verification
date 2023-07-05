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

# Function to check if the URL has any URL shortening service, if it has, it is considered as a suspicious URL
def has_url_shortening_service(url):
    for service in url_shortening_services:
        if re.search(service, url):
            return True
    return False

# This function is used to extract the domain registration length of the URL, if the domain is registered for less than or equal to 1 year, it is considered as a suspicious URL
# def get_domain_registration_length(url):
#     domain = urllib.parse.urlparse(url).netloc
#     try:
#         domain_info = whois.whois(domain)
#         if domain_info.creation_date is not None and domain_info.expiration_date is not None:
#             registration_length = (domain_info.expiration_date - domain_info.creation_date).days
#             return registration_length
#     except whois.parser.PywhoisError:
#         return None

# Function to check if the URL has any favicons or not
def has_favicon(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        favicon_link = soup.find('link', rel=True)
        if favicon_link is not None:
            # check point to check if the code is running
            print("favicon downloaded")
            return 1
        else:
            print("no favicon")
            return -1
    except requests.exceptions.RequestException:
        print("error in downloading favicon")
        return -1

# Function to extract the number of requests made in the URL
def extract_request_url(url):
    try:
        response = requests.get(url)
        return len(response.history)  # Number of requests made to reach the final URL
    except requests.exceptions.RequestException:
        return -1  # Error occurred while making the request

# Function to extract the number of URL of anchors in the HTML content of the URL
def extract_url_of_anchor(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        anchors = soup.find_all('a')
        return len(anchors)
    except requests.exceptions.RequestException:
        return -1

# Function to extract the number of links in the tags of the HTML content of the URL
def extract_links_in_tags(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        links = soup.find_all(href=True)
        return len(links)
    except requests.exceptions.RequestException:
        return -1

# Function to extract the value of the Server Form Handler (SFH) attribute from the HTML content of the URL
def extract_sfh(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        forms = soup.find_all('form')
        sfh_values = [form.get('action') for form in forms]
        return len(set(sfh_values))  # Number of unique SFH values
    except requests.exceptions.RequestException:
        return -1

# Function to check if the URL contains a form that submits to an email
def has_submitting_to_email(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        forms = soup.find_all('form')
        for form in forms:
            if re.search(r'mailto:', form.get('action', '')):
                return 1
        return 0
    except requests.exceptions.RequestException:
        return -1

# Function to check if the URL contains an abnormal URL format
def has_abnormal_url(url):
    try:
        response = requests.get(url)
        return not response.url == url  # Compare the final URL with the requested URL
    except requests.exceptions.RequestException:
        return -1

# Function to check if the URL triggers a redirect
def has_redirect(url):
    try:
        response = requests.get(url)
        return len(response.history) > 0  # Check if there were any redirects in the requests
    except requests.exceptions.RequestException:
        return -1

# Function to check if the URL contains onmouseover event attribute
def has_on_mouseover(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        elements = soup.find_all(onmouseover=True)
        return len(elements) > 0  # Check if there are any elements with onmouseover attribute
    except requests.exceptions.RequestException:
        return -1

# Function to check if the URL contains RightClick event attribute
def has_right_click(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        elements = soup.find_all(oncontextmenu=True)
        return len(elements) > 0  # Check if there are any elements with oncontextmenu attribute
    except requests.exceptions.RequestException:
        return -1

# Function to check if the URL contains pop-up windows
def has_popup_window(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        scripts = soup.find_all('script')
        for script in scripts:
            if re.search(r'window.open', script.string or ''):
                return 1
        return 0
    except requests.exceptions.RequestException:
        return -1

# Function to check if the URL contains an iframe
def has_iframe(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        iframes = soup.find_all('iframe')
        return len(iframes) > 0  # Check if there are any iframe elements
    except requests.exceptions.RequestException:
        return -1

# Function to calculate the age of the domain
# def calculate_age_of_domain(url):
#     try:
#         domain = urllib.parse.urlparse(url).netloc
#         domain_info = whois.whois(domain)
#         if domain_info.creation_date is not None:
#             registration_date = domain_info.creation_date
#             current_date = datetime.now()
#             age_of_domain = (current_date - registration_date).days
#             return age_of_domain
#         else:
#             return -1  # Unable to retrieve domain registration date
#     except whois.parser.PywhoisError:
#         return -1  # Error occurred while retrieving domain information

# Function to check if the domain has a DNS record
# def has_dns_record(url):
#     try:
#         domain = urllib.parse.urlparse(url).netloc
#         domain_info = whois.whois(domain)
#         return domain_info.name_servers is not None
#     except whois.parser.PywhoisError:
#         return -1  # Error occurred while retrieving domain information

# Function to check the web traffic of the URL
def check_web_traffic(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        alexa_div = soup.find('div', id='div_1')
        if alexa_div is not None:
            return 1
        else:
            return 0
    except requests.exceptions.RequestException:
        return -1
    
# Function to extract the Google PageRank of the URL
def extract_page_rank(url):
    # Implement your own logic to retrieve the PageRank from Google or use a third-party library/API
    # This function is just a placeholder
    return -1

# Function to check if the URL is indexed by Google
def is_indexed_by_google(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        noindex_meta_tag = soup.find('meta', attrs={'name': 'googlebot', 'content': 'noindex'})
        return noindex_meta_tag is None
    except requests.exceptions.RequestException:
        return -1

# Function to extract the number of external links pointing to the page
def extract_links_pointing_to_page(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        external_links = soup.find_all('a', href=re.compile(r'^https?://(?!' + re.escape(urllib.parse.urlparse(url).netloc) + ')'))
        return len(external_links)
    except requests.exceptions.RequestException:
        return -1

# Function to check if the URL has a statistical report
def has_statistical_report(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        scripts = soup.find_all('script')
        for script in scripts:
            if re.search(r'statistic|stats|analytic|analyse', script.string or '', re.IGNORECASE):
                return 1
        return 0
    except requests.exceptions.RequestException:
        return -1

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
            # int(get_domain_registration_length(url)),  # Domain_registration_length (need to check whois library)
            0,
            # int(get_domain_registration_length(url)) if get_domain_registration_length(url) is not None else 0,
            0,
            # has_favicon(url),  # Favicon
            int(parsed_url.port != ''),  # port
            int('https' in parsed_url.netloc or 'https' in parsed_url.path),  # HTTPS_token
            int(extract_request_url(url)), # Request_URL
            int(extract_url_of_anchor(url)), # URL_of_Anchor
            int(extract_links_in_tags(url)), # Links_in_tags
            int(extract_sfh(url)), # SFH
            int(has_submitting_to_email(url)), # Submitting_to_email
            int(has_abnormal_url(url)), # Abnormal_URL
            int(has_redirect(url)), # Redirect
            int(has_on_mouseover(url)), # on_mouseover
            int(has_right_click(url)), # RightClick
            int(has_popup_window(url)), # popUpWindow
            int(has_iframe(url)), # Iframe
            0,
            # int(calculate_age_of_domain(url)), # age_of_domain (need to check working of whois library)

            0,
            # int(has_dns_record(url)), # DNSRecord (need to check working of whois library)
            
            int(check_web_traffic(url)), # web_traffic 
            1,
            # int(extract_page_rank(url)), # Page_Rank (need to find some API for this)
            int(is_indexed_by_google(url)), # Google_Index
            int(extract_links_pointing_to_page(url)), # Links_pointing_to_page
            int(has_statistical_report(url)), # Statistical_report
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

    print("Column names and features added to the CSV file successfully.")