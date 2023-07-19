import pandas as pd
import ipaddress
import re
import urllib.request
from bs4 import BeautifulSoup
import socket
import requests
from urllib.parse import urlparse 

list_len = []
list_ip = []
list_short = []
list_at = []
list_dslash = []
list_prefix_suffix = []

def generateCSV():

    data = {
        'URL': df['URL'],
        'length': list_len,
        'ip': list_ip,
        'short': list_short,
        'at' : list_at,
        'double_slash' : list_dslash,
        'prefix-suffix' : list_prefix_suffix
    }

    # Create a DataFrame from the dictionary
    df = pd.DataFrame(data)

    # Write the DataFrame to a CSV file
    df.to_csv('Faster-URL-Feature-Extracted.csv', index=False)

def url_length(url):

    if (len(url) < 54):
        #legitimate 
        return 1

    elif (54 <= len(url) <= 75):
        # suspicious
        return 0

    else:
        # phishy
        return -1 
    
def domain_is_ip(url):

    parsed_url = urlparse(url)
    domain = parsed_url.netloc

    try:
        ipaddress.ip_address(domain) 
        return -1
    
    except:
        return 1 
    
def is_shortening_services(url):

    match = re.search('bit\.ly|goo\.gl|shorte\.st|go2l\.ink|x\.co|ow\.ly|t\.co|tinyurl|tr\.im|is\.gd|cli\.gs|'
                      'yfrog\.com|migre\.me|ff\.im|tiny\.cc|url4\.eu|twit\.ac|su\.pr|twurl\.nl|snipurl\.com|'
                      'short\.to|BudURL\.com|ping\.fm|post\.ly|Just\.as|bkite\.com|snipr\.com|fic\.kr|loopt\.us|'
                      'doiop\.com|short\.ie|kl\.am|wp\.me|rubyurl\.com|om\.ly|to\.ly|bit\.do|t\.co|lnkd\.in|'
                      'db\.tt|qr\.ae|adf\.ly|goo\.gl|bitly\.com|cur\.lv|tinyurl\.com|ow\.ly|bit\.ly|ity\.im|'
                      'q\.gs|is\.gd|po\.st|bc\.vc|twitthis\.com|u\.to|j\.mp|buzurl\.com|cutt\.us|u\.bb|yourls\.org|'
                      'x\.co|prettylinkpro\.com|scrnch\.me|filoops\.info|vzturl\.com|qr\.net|1url\.com|tweez\.me|v\.gd|tr\.im|link\.zip\.net',
                      url)
    if match:
        return -1
    
    else:
        return 1 
    

def is_at_symbol(url):

    if re.findall("@", url):
        return -1

    else:
        return 1    
    

def redirecting_slash(url):

    if url.startswith("HTTP") or url.startswith("http"):
        double_slash_position = url.find("//", 7)

    elif url.startswith("HTTPS") or url.startswith("https"):
        double_slash_position = url.find("//", 8) 


    if double_slash_position > 7:#phishing
        return -1
    else:#legitimate
        return 1 
    
    
def check_dash(url):

    parsed_url = urlparse(url)
    domain = parsed_url.netloc 

    if("-" in domain):#phishy
        return -1 
    
    else:# legitimate
        return 1
        

def beginProcess(url):

    # 1: Lenght of URL
    len_of_url = int(url_length(url))
    list_len.append(len_of_url)

    with open("length.txt","a") as f1:
        f1.write(f"{url } : {len_of_url} lenght of URL" + "\n")


    # 2: IP address in URL
    ip_in_domain = int(domain_is_ip(url))
    list_ip.append(ip_in_domain)

    with open("ip_confirm.txt","a") as f2:
        f2.write(f"{url} : {ip_in_domain}" + "\n")

    # 3: Shortening Services in URL
    shortening_services = int(is_shortening_services(url))
    list_short.append(shortening_services)

    with open("shortening.txt","a") as f3:
        f3.write(f"{url} : {shortening_services}" + "\n") 


    # 4: @ symbol in URL
    at_symbol = int(is_at_symbol(url))
    list_at.append(at_symbol) 

    with open("at_symbol.txt","a") as f3:
        f3.write(f"{url} : {at_symbol}" + "\n") 
    

    # 5: Double slash in URL
    dslash_position = int(redirecting_slash(url))
    list_dslash.append(dslash_position)   

    with open("double_slash.txt","a") as f4:
        f4.write(f"{url} : {dslash_position}" + "\n") 

    # 6: prefix-suffix in URL
    prefix_suffix = int(check_dash(url))
    list_prefix_suffix.append(prefix_suffix) 

    with open("prefix-suffix.txt","a") as f5:
        f5.write(f"{url} : {prefix_suffix}" + "\n") 
    
    

if __name__ == '__main__':
    # Replace 'your_file_path.xlsx' with the actual path to your Excel file
    ExcelFilePath = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/LogFile.xlsx'

    # Read the Excel file into a pandas DataFrame
    df = pd.read_excel(ExcelFilePath) 

    count = 0
    # Iterate through the DataFrame and print URLs for rows with 'Status Code' equal to 200
    for index, row in df.iterrows():
        if row['Status Code'] == 200:

            # For cross-checking
            with open("urls_in_excel.txt","a") as f:
                f.write(row['URL'] + "\n") 
                f.write(f"{count}")
                f.write("--------------------------------------")


            print(count)
            count+=1
            beginProcess(row['URL'])

    generateCSV()        