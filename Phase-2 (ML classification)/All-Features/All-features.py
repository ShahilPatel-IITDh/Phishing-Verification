import pandas as pd
import ipaddress
import re
from urllib.parse import urlparse
import os
import sys  
from bs4 import BeautifulSoup
import requests
import whois
from whois.parser import PywhoisError
from datetime import datetime

headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
}

# URL based feature list
list_len = []
list_ip = []
list_short = []
list_at = []
list_dslash = []
list_has_dash = []
list_standard_port = []
list_ctld = []
list_https_in_domain = []
list_check_sensitive = []
list_has_tilde = []
list_has_port = []

# Content based feature list
one = []
two = []
three = []
four = []
five = []
six = []
seven = []
eight = []
nine = []
ten = []
eleven = []
twelve = []
thirteen = [] 
fourteen =[]

# Third party based feature list
google_index = []
list_current_age_of_domain = []
list_match_domain_name = []
list_length_of_domain = []

# PhishID list
phishID_list = []

# Function to pad an array with zeros
def pad_with_zeros(arr, target_length):
    return arr + [0] * (target_length - len(arr))

def generateCSV():

    data = {
        'Length of URL': list_len,
        'Has IP address': list_ip,
        'Shortening Service': list_short,
        'Having @ Symbol' : list_at,
        'Double Slash Redirecting' : list_dslash,
        'Prefix-Suffix' : list_has_dash,
        'CTLD': list_ctld,
        'HTTPS in Domain': list_https_in_domain, 
        'Sensitive Words': list_check_sensitive,
        'Has Tilde': list_has_tilde,
        'Has Port': list_has_port,
        'PhishID': phishID_list,
        'frequency_of_a_tags': one,
        'frequency_of_alltags': three,
        'presence_of_iframes': five,
        'presence_of_popups' : six,
        'right_click_disabling' : seven,
        'checking_sfh': ten, 
        'request_url': eleven,
        'url-of-anchor': twelve,
        'links_in_meta_img': thirteen,
        'check_hidden_content': fourteen,
        'Current Domain Age': list_current_age_of_domain,
        'Matching Domain Name': list_match_domain_name,
        'Length of Domain': list_length_of_domain,
        'Google page index': google_index,
    }

    # Create a DataFrame from the dictionary
    df = pd.DataFrame(data)

    # Write the Phishy DataFrame to a Phishy-Data CSV file
    # df.to_csv('Phishy-Data-2.csv', index=False)

    # Write the Legitimate DataFrame to a Legitimate-Data CSV file
    # df.to_csv('Legitimate-Data-2.csv', index=False)

    # Write the Unconfirmed DataFrame to a Unconfirmed-Data CSV file
    # df.to_csv('Unconfirmed-Data.csv', index = False)

    # Sample testing
    # df.to_csv('Sample-Data.csv', index = False)
    df.to_csv('Sample-Phishy.csv', index = False)


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

def check_StandardPort(url):
    parsedURL = urlparse(url)

    # Extract the port number from the URL
    port = parsedURL.port
        # Check if the port number is in the list of standard ports
    standard_ports_open = [80, 443]
    standard_ports_closed = [21, 22, 23, 445, 1433, 1521, 3306, 3389]

    if port in standard_ports_open:
        # The port is OPEN and standard, consider it phishing
        return -1

    elif port in standard_ports_closed:
        # The port is CLOSED and standard, consider it legitimate
        return 1

    else:
        # The port is neither standard nor open, consider it suscpicious
        return 0

def checkForCTLD(url):
    try:
        # Remove "www." from the URL
        parsed_url = urlparse(url)
        domain_parts = parsed_url.netloc.split('.')

        cctld = domain_parts[-1] if len(domain_parts) > 1 else ''

        known_cctlds = {"uk", "us", "ca", "au", "fr", "eu","in","cn", "tk", "de", "nl","ru","jp","kr","pl","gr","cz","hu","it","es"} # Add more ccTLDs as needed

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

def checkForHTTPSInDomain(url):
    parsedURL = urlparse(url)
    domain = parsedURL.netloc

    if ("https" in domain or "HTTPS" in domain) or ('http' in domain or 'HTTP' or domain):
        return -1
    
    else:
        return 1

def getNumberOfSubDomain(url):
    parsedURL = urlparse(url)
    subdomain = parsedURL.hostname.split('.')
    num_levels = len(subdomain) - 1  # Subtract 1 for the root domain
    return num_levels

def checkSensitiveWords(url):
    sensitive_words = ['secure', 'account', 'webscr', 'login', 'ebayisapi', 'signin', 'banking', 'confirm', 'credit', 'verify', 'reset', 'verification', 'authenticate']

    for word in sensitive_words:
        if word in url.lower():  # Convert the URL to lowercase for case-insensitive matching
            # if present then classify url as phishy
            return -1
        
    # if not present then classify url as legitimate
    return 1

def checkTilde(url):
    # Check if the URL contains a tilde character, if present then classify it as phishing
    if "~" in url:
        return -1
    
    # If not present then classify it as legitimate
    else:
        return 1

def numberOfDots_inURL(url):
    # Extract the domain from the URL
    parsedURL = urlparse(url)
    domain = parsedURL.netloc

    # Count the number of dots in the domain
    dotCount = domain.count(".")

    # Classify the URL based on the number of dots
    if dotCount == 1:
        return 1
    
    elif dotCount == 2:
        return 0
    
    else:
        return -1

def isHyphenThere(url):
    # Extract the domain from the URL
    parsedURL = urlparse(url)
    domain = parsedURL.netloc

    # Check if the domain contains a hyphen
    if "-" in domain:
        # If present then classify it as phishing
        return -1
    
    else:
        # If not present then classify it as legitimate
        return 1
      
def checkForPort(url):
    parsedURL = urlparse(url)
    # If the port is present in the parsed URL then return 1
    if(parsedURL.port):
        return 1
    
    else:
        return -1;


#helper function for frequency 
def find_max_count_string(strings_list):

    string_count_map = {}

    # Count occurrences of each string
    for string in strings_list:
        string_count_map[string] = string_count_map.get(string, 0) + 1

    # Find the string with the maximum count
    max_count_string = max(string_count_map, key=string_count_map.get)

    if string_count_map[max_count_string] > 0:
        return max_count_string

    # return -99
    return -1


# helper function two
def find_max_count(strings_list):

    string_count_map = {}

    # Count occurrences of each string
    for string in strings_list:
        string_count_map[string] = string_count_map.get(string, 0) + 1

    # Find the string with the maximum count
    max_count_string = max(string_count_map, key=string_count_map.get) 

    return max_count_string


def frequency_alltags(soup,url):

    all_links = [] 

    if soup:
        links = soup.find_all("link")
        if links:
            for link in links:
                the_link = link.get('href')

                if the_link: 
                    try:
                        parsed_url_link = urlparse(the_link)
                        domain_link = parsed_url_link.netloc

                        if(domain_link):
                            all_links.append(domain_link) 
                        
                        # else:
                        #     return 0
                    
                    except:
                        return -1    
                # else:
                #     return 0        
        else:
            return 1               
                            

        images = soup.find_all("img")

        if images:
            for i in images:
                check_url = i.get('src')
                if check_url:
                    if "http" in check_url or "https" in check_url or "HTTP" in check_url or "HTTPS" in check_url:

                        try:
                            parsed_url_images = urlparse(check_url)
                            domain_images = parsed_url_images.netloc

                            if(domain_images):
                                all_links.append(domain_images) 
                            
                            # else:
                            #     return 0

                        except:
                            return -1
                            
                    else:
                        return 0        
                # else:
                #     return 0            
        else:
            return 1                    
                       

        scripts = soup.find_all("script")
                
        if scripts:
            for script in scripts:
                src = script.get('src')
                if src:
                    try:

                        parsed_url_src = urlparse(src)
                        domain_src = parsed_url_src.netloc
                        
                        if(domain_src):
                            all_links.append(domain_src)  
                        
                        # else:
                        #     ##continue
                        
                    except:
                        return -1    
                else:
                    return 1        
        else:
            return 1                


        if len(all_links) != 0:
            max_count_string = find_max_count(all_links) 

            try:
                parsed_url_base = urlparse(url)
                base_domain = parsed_url_base.netloc  

            except:
                return -1
            
            if(max_count_string!=base_domain):
                    return -1
            else:
                    return 1 
             
        else:
            return 1  
         
    else:
        return 1              


def frequency_atags(soup,url):

    hrefs_domain = []

    if soup:
        a_tags = soup.find_all('a')
        if(a_tags):
            for link in a_tags:
                if link:
                    href = link.get('href')
                    if href:
                        try:
                            parsed_href = urlparse(href)
                            domain_href = parsed_href.netloc 
                            if domain_href:  # Check if the domain is not empty before appending
                                hrefs_domain.append(domain_href) 
                            # else:
                            #     #continue    
                        except:
                            return -1
                #     else:
                #         return 0 
                # else:
                #     return 0          
        

            if len(hrefs_domain) != 0:
                max_count_string = find_max_count_string(hrefs_domain) 
                try:
                    parsed_url_base = urlparse(url)
                    base_domain = parsed_url_base.netloc 

                    if(base_domain == max_count_string):
                        return 1 #legitimate
                    else:
                        return -1  #phishy 
                except :
                    return -1    
                
            else:
                return 1 # return legitimate
            
        else:
            return 1    # return legitimate

    else:
        return 1    # return legitimate    
    
def check_iframes(soup,url):

    if re.findall(r"<iframe>|<frameBorder>", soup.text):
        return -1
    
    return 1


def check_popup(soup,url):

    if(soup):
        script_tags = soup.find_all('script')
        #Loop through the script tags
        if(script_tags):
            for script_tag in script_tags:
                script_content = script_tag.string 
                if script_content:
                    if re.search(r"alert\(|confirm\(", script_content):
                        return -1
                    else:
                        return 1 
                else:
                    return 1    
        else:
            return 1 ## to fill none values   
    else:
        return 1    ##no soup present       
                

def right_click_disabled(soup,url):

    scripts = soup.find_all('script')

    if(scripts):
        for script in scripts:
            if "event.button==2" in str(script):
                return -1  
            
        return 1
        
    else:
        return 1    


def check_sfh(soup,url):

    try:
        if soup.text:
            if re.findall(r"[mail\(\)|mailto:?]", soup.text):
                return -1
            else:
                return 1
        else:
            return 1
    except requests.exceptions.RequestException as e:
        print("An error occurred during the request:", e)
        return -99
    
    except Exception as e:
        print("An error occurred:", e)
        return -99
    
def processing_on_links(url, img, vid, aud): ##helper function

    total_length = len(img) + len(vid) + len(aud) 

    tld_list = [".com",".org",".net",".gov",".edu",".info",".biz",".name",".coop",".mobi",".int",".pro",".aero",".post",".jobs"]

    if(total_length == 0):
        total_length = 1 
        ## in original code return 0 from here

    parsed_url = urlparse(url)
    domain = parsed_url.netloc 
    # print("the domain is: ",domain)

    domain_without_extra = domain.replace("www.","")
    for tld in tld_list:
        domain_without_extra = domain_without_extra.replace(tld, "")
    # print("removing extra:-",domain_without_extra)

    count_outer_domain = 0 

    for link in img:

        if (domain not in link) and (domain_without_extra not in link):
            count_outer_domain += 1 

    for link in vid:

        if domain not in link and (domain_without_extra not in link):
            count_outer_domain += 1 

    for link in aud:
        
        if domain not in link and (domain_without_extra not in link):
            count_outer_domain += 1                

    ##check validity 
    percentage = (count_outer_domain/total_length)*(100)

    if(percentage<22):
        return 1   

    elif(percentage>=22 and percentage<61):
        return 0
        
    else:
        return -1     

def request_url(soup,url):

    image_list = []
    video_list = [] 
    audio_list = [] 

    if(soup):
        img_tags = soup.find_all('img')  # Find all <img> tags 

        for tag in img_tags:
            src = tag.get('src')
            if src:
                image_list.append(src) 

        video_tags = soup.find_all('video')  # Find all <video> tags 

        for tag in video_tags:
            src = tag.get('src')
            if src:
                video_list.append(src)
            
        audio_tags = soup.find_all('audio')  # Find all <audio> tags 

        for tag in audio_tags:
            src = tag.get('src')
            if src:
                audio_list.append(src) 

        returned_result = processing_on_links(url,image_list, video_list, audio_list)  
        return returned_result

    else:
        return 1

def processing_on_anchors(a_hrefs, url): ## helper function

    total_length= len(a_hrefs)

    if(total_length == 0):
        total_length = 1 

    try:

        parsed_url = urlparse(url)
        domain = parsed_url.netloc 

        domain_without_extra = domain.replace("www.","")
        domain_without_extra = domain_without_extra.replace(".com","") 

        count_outer_domain = 0

        for href in a_hrefs:

            if(domain_without_extra not in href):
                count_outer_domain += 1  

            if(href == "#" or href == "#content" or href == "#skip" or href == "JavaScript ::void(0)"):
                count_outer_domain += 1 

        percentage = (count_outer_domain/total_length)*100 
        
        # print(percentage)

        if(percentage<31):
            return 1

        elif(percentage>=31 and percentage<=67):
            return 0  

        else:
            return -1        

    except:
        return -1


def url_of_anchor(soup,url):

    if(soup):
        a_tags = soup.find_all('a') 
        a_href = []

        for link in a_tags:
            href = link.get('href')
            if(href):
                a_href.append(href) 



        classification_result = processing_on_anchors(a_href,url) 
        return classification_result 

def links_in_general(soup,url):

    try:

        parsed_url = urlparse(url)
        domain = parsed_url.netloc  
        just_main = domain.replace("www.", "")
        just_main = just_main.replace(".com", "") 

        links_href = []
        meta_content = []
        script_src = []
        if(soup):

            links = soup.find_all("link")
            if links:
                for link in links:
                    the_link = link.get('href')
                    if the_link:
                        links_href.append(the_link)

            meta = soup.find_all("meta")
            if meta:
                for m in meta:
                    check_url = m.get('content')
                    if check_url:
                        if "http" in check_url or "https" in check_url:
                            meta_content.append(check_url)

            scripts = soup.find_all("script")
            if scripts:
                for script in scripts:
                    src = script.get('src')
                    if src:
                        script_src.append(src)

            total_length = len(links_href) + len(meta_content) + len(script_src)
            unsafe = 0

            if total_length == 0:
                total_length = 1 

            for addy in links_href:
                if domain not in addy  and addy[0] != '/':
                    unsafe += 1

            for addy in meta_content:
                if domain not in addy and addy[0] != '/':
                    unsafe += 1             

            for addy in script_src:
                if domain not in addy and addy[0] != '/':
                    unsafe += 1 

            # print("unsafe count is:-",unsafe)        

            percentage = (unsafe / total_length) * 100 

            if percentage < 17:
                return 1
            
            elif 17 <= percentage <= 81:
                return 0
            
            else:
                return -1                 

        else:
            return 1
        
    except:
        return -1

def check_hidden_content(soup, url):

    try:
        if soup: 

            div_tags = soup.find_all('div')
            hidden_found = False
            not_found = 0

            if div_tags:
                for div in div_tags:
                    style_attr = div.get('style')
                    if style_attr:
                        if 'visibility: hidden' in style_attr or 'display: none' in style_attr:
                            hidden_found = True
                            break
                
            if hidden_found:
                    return -1 
                
            else:
                not_found+=1
            
            # Check for <button> and <input> conditions
            button_tags = soup.find_all('button')
            input_tags = soup.find_all('input')
            
            for button in button_tags:
                if button.get('disabled') == 'disabled':
                    hidden_found = True
                    break 

            if hidden_found:
                return -1    
            
            else:
                not_found+=1
            
            for input_elem in input_tags:
                input_type = input_elem.get('type')
                input_disabled = input_elem.get('disabled')
                input_value = input_elem.get('value')
                
                if input_type == 'hidden' or input_disabled == 'disabled' or input_value == 'hello':
                    hidden_found = True 
                    break

            if hidden_found:
                return -1 
            
            else:
                not_found+=1   

            if(not_found == 3): #legitimate condition
                return 1

        else:
            return 1
        
    except requests.exceptions.RequestException as req_exc:
        return -99
        
    except Exception as e:
        return -99

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

    except Exception as e:
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
    
    except Exception as e:

        # Handle the PywhoisError here, and consider the url as suspicious
        return 0

def match_domain_name(domain, whoisInstance):

    # The domain in the argument has www. so the processed domain won't have www.
    processedDomain = domain.replace("www.", "")

    try:
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
        
    except Exception as e:
        return 0


def getPageIndex(url):
    try:
        google_search = "https://www.google.com/search?q=site:" + url + "&hl=en"

        response = requests.get(google_search, cookies={"CONSENT": "YES+1"})

        soup = BeautifulSoup(response.content, 'html.parser')

        not_indexed = re.compile("did not match any documents")

        if soup(text = not_indexed):
            return -1

        else:
            return 1

    except:
        return -1


def beginProcess(phishid, url, count):

    global list_current_age_of_domain, list_match_domain_name, list_length_of_domain 

    # Legitimate HTML file path (My Laptop)
    # html_file_path = f"/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Legitimate-Resources/{phishid}/HTML/landingPage.html"

    # Phishy HTML file path (My Laptop)
    html_file_path = f'/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Phishy-Resources/{phishid}/HTML/landingPage.html'
    
    # Unconfirmed HTML file path (My Laptop)
    # html_file_path = f'/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Unconfirmed-Resources/{phishid}/HTML/landingPage.html'

    # ---------------------------------------------------------------------------------------------------------------------------------------------------- # 

    # For lab PC

    # Legitimate
    # html_file_path = f"/home/administrator/Documents/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Legitimate-Resources/{phishid}/HTML/landingPage.html"

    # Phishy
    # html_file_path = f'/home/administrator/Documents/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Phishy-Resources/{phishid}/HTML/landingPage.html'


    try:
        print(count)
            
        parsedURL = urlparse(url)
        domain = parsedURL.netloc
        whoisInstance = whois.whois(domain)
        
        with open(html_file_path, 'r') as f:
            html_content = f.read()

        soup = BeautifulSoup(html_content, 'html.parser')

        # 1: Length of URL
        len_of_url = int(url_length(url))
        list_len.append(len_of_url)

        # 2: IP address in URL
        ip_in_domain = int(domain_is_ip(url))
        list_ip.append(ip_in_domain)

        # 3: Shortening Services in URL
        shortening_services = int(is_shortening_services(url))
        list_short.append(shortening_services)

        # 4: @ symbol in URL
        at_symbol = int(is_at_symbol(url))
        list_at.append(at_symbol) 
            
        # 5: Double slash in URL
        dslash_position = int(redirecting_slash(url))
        list_dslash.append(dslash_position)   

        # 6: prefix-suffix in URL
        has_dash = int(check_dash(url))
        list_has_dash.append(has_dash) 

        # 7: check for country code
        ctld = int(checkForCTLD(url))
        list_ctld.append(ctld)

        # 8: Check for https in domain (if https present in domain name-->phishy)
        httpsInDomain = int(checkForHTTPSInDomain(url))
        list_https_in_domain.append(httpsInDomain)

        # 9: Check for sensitive words in the URL
        checkSensitive = int(checkSensitiveWords(url))
        list_check_sensitive.append(checkSensitive)

        # 11: check if the URL has tilde
        hasTilde = int(checkTilde(url)) 
        list_has_tilde.append(hasTilde)

        # 12: Check if the URL has port
        hasPort = int(checkForPort(url))
        list_has_port.append(hasPort)

        phishID_list.append(phishid)
        
        c_f1 = frequency_atags(soup,url) 
        one.append(c_f1) 

        c_f3 = frequency_alltags(soup,url)
        three.append(c_f3) 
                
        c_f5 = check_iframes(soup,url)
        five.append(c_f5)
        
        c_f6 = check_popup(soup,url)
        six.append(c_f6)
                
        c_f7 = right_click_disabled(soup,url)
        seven.append(c_f7)
        
        c_10 = check_sfh(soup,url)
        ten.append(c_10) 
                
        c_11 = request_url(soup,url)
        eleven.append(c_11)
                
        c_12 = url_of_anchor(soup,url)
        twelve.append(c_12)
                
        c_13 = links_in_general(soup,url)
        thirteen.append(c_13)

        c_14 = check_hidden_content(soup, url)
        fourteen.append(c_14)

        # 1: Current age of domain (Current Date - Creation date)
        current_age_OfDomain = int(get_current_age_Ofdomain(url, whoisInstance))
        list_current_age_of_domain.append(current_age_OfDomain)

        # 2: Length of Domain (Expiration Date - Creation date)
        lengthOfDomain = int(length_domain(url, whoisInstance))
        list_length_of_domain.append(lengthOfDomain)
        
        # 3: Domain name matching
        matchDomainName = int(match_domain_name(domain, whoisInstance))
        list_match_domain_name.append(matchDomainName)

        # Google page index
        googlePageIndex = getPageIndex(url)
        google_index.append(googlePageIndex)

        print("Length of current Age of Domain: ", len(list_current_age_of_domain))
        print("Length of length of Domain: ", len(list_length_of_domain))
        print("Length of Match domain: ", len(list_match_domain_name))
        print("Phish ID list: ", len(phishID_list))

        print("----------------------------------------------")

        max_length = max(
            len(list_len),
            len(list_current_age_of_domain),
            len(list_length_of_domain),
            len(list_match_domain_name)
        )

        # Append zeros to lists if necessary
        # print("code is here-1")
        list_current_age_of_domain += [0] * (max_length - len(list_current_age_of_domain))
        
        # print("code is here-2")
        list_length_of_domain += [0] * (max_length - len(list_length_of_domain))
        
        # print("code is here-3")
        list_match_domain_name += [0] * (max_length - len(list_match_domain_name))

    except Exception as e:
        # Exception occurred (e.g., invalid domain or connection issue)
        print(f"Not able to process: {url}, {e}")
        return 0

if __name__ == '__main__':

    # ---------------------------------------------------------------My Laptop----------------------------------------------------------------------#
    
    # Path to Excel sheet having Legitimate URL Dataset
    # ExcelFilePath = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Legitimate-Data.xlsx'
    
    # Legitimate Folder Path
    # resources_folder_path = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Legitimate-Resources/'

    # Path to Excel sheet having Phishy URL Dataset
    # ExcelFilePath = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Phishy-Data.xlsx'
    
    # Phishy Folder Path
    # resources_folder_path = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Phishy-Resources/'

    # Unconfirmed Folder
    # ExcelFilePath = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Unconfirmed-Data.xlsx'

    # Unconfirmed Folder
    # resources_folder_path = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Unconfirmed-Resources/'

    # Testing Sample
    ExcelFilePath = '/home/administrator/Desktop/Phishing-Verification/Validation/Phishy-300-Samples.xlsx'

    resources_folder_path = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Phishy-Resources/'

    # ---------------------------------------------------------------Lab PC----------------------------------------------------------------------#

    # Path to Excel sheet having Legitimate URL Dataset
    # ExcelFilePath = '/home/administrator/Documents/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Legitimate-Data.xlsx'

    # Legitimate Folder Path
    # resources_folder_path = '/home/administrator/Documents/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Legitimate-Resources/'


    # Path to Excel sheet having Phishy URL Dataset
    # ExcelFilePath = '/home/administrator/Documents/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Phishy-Data.xlsx'
    
    # Phishy Folder Path
    # resources_folder_path = '/home/administrator/Documents/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Phishy-Resources/'

    # Read the Excel file into a pandas DataFrame
    df = pd.read_excel(ExcelFilePath) 

    set_of_urls = set()

    count = 1

    # Iterate through the DataFrame and print URLs for rows with 'Status Code' equal to 200

    for index, row in df.iterrows():
        url = row['URL']
        phishid = str(row['PhishID'])

        if url not in set_of_urls:
            set_of_urls.add(url)

            if row['Status Code'] == 200:

                check_html = row['HTML'] 
                
                phishid_folder_path = os.path.join(resources_folder_path, phishid, 'HTML')
                
                if os.path.exists(phishid_folder_path) and check_html == 1:
                    
                    beginProcess(phishid, row['URL'], count)
                    
                    generateCSV()

                    count+=1