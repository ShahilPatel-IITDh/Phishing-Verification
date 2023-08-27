import pandas as pd
import os
import sys  
from bs4 import BeautifulSoup
import requests
from urllib.parse import urlparse
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
}

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

phishID_list = []

def generateCSV():

    data = {
        # 'URL': list_url,
        'PhishID': phishID_list,
        'frequency_of_a_tags': one,
        'frequency_of_alltags': three,
        'presence_of_iframes': five,
        'presence_of_popups' : six,
        'right_click_disabling' : seven,
        # 'num_of_redirects' : eight,
        # 'checking_cookies': nine,
        'checking_sfh': ten, 
        'request_url': eleven,
        'url-of-anchor': twelve,
        'links_in_meta_img': thirteen
    }

    # Create a DataFrame from the dictionary
    df = pd.DataFrame(data)

    # Write the Phishy DataFrame to a Phishy-Data CSV file
    # df.to_csv('Phishy-1.csv', index=False)

    # Write the Legitimate DataFrame to a Legitimate-Data CSV file
    df.to_csv('Legitimate-1.csv', index=False)

    

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


#helper function two
def find_max_count(strings_list):

    string_count_map = {}

    # Count occurrences of each string
    for string in strings_list:
        string_count_map[string] = string_count_map.get(string, 0) + 1

    # Find the string with the maximum count
    max_count_string = max(string_count_map, key=string_count_map.get) 

    # with open("max_url-count.txt","a") as f3:
    #     if(max_count_string):
    #         f3.write(f"{max_count_string}\n") 

        # else:
        #     f3.write("no highest one\n")
        #     f3.write(f"{string_count_map}\n")
        
        # f3.write("-----------------------------")

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
    # for script in scripts:
    #     if "event.button==2" in str(script):
    #         return -1
    if(scripts):
        for script in scripts:
            if "event.button==2" in str(script):
                return -1  
            
        return 1
        
    else:
        return 1        
        
   

# def redirects(soup,url):

#     try:    
#         response = requests.get(url, headers=headers)
#         response.raise_for_status()
        
#         if(response.history):
#            if(len(response.history) <=1):
#                return 1
#            elif (len(response.history)>=2 and len(response.history) < 4):
#                return 0
#            else:
#                return -1
#         else:
#             return 0
           
#     except requests.exceptions.RequestException as e:
#         return -99

# def check_cookies(soup,url):

#     try:
#         response = requests.get(url, headers=headers)
#         cookies = response.cookies

#         if cookies:
#             return 1
#         else:
#             return -1
#     except requests.exceptions.RequestException as e:
#         return -99        

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

    # print(f"Count of outer domain links: {count_outer_domain}")  
    # print(f"Total number of links: {total_length}")      

    ##check validity 
    percentage = (count_outer_domain/total_length)*(100)

    with open("percentages.txt","a") as f:
        f.write(f"{percentage}\n")
        f.write("---------------------")

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


# Define a function for processing HTML content
def begin_processing(phishid, url):
        
    # Legitimate HTML file path (My Laptop)
    # html_file_path = f"/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Legitimate-Resources/{phishid}/HTML/landingPage.html"

    # Phishy HTML file path (My Laptop)
    # html_file_path = f'/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Phishy-Resources/{phishid}/HTML/landingPage.html'
 
    # ---------------------------------------------------------------------------------------------------------------------------------------------------- # 

    # For lab PC

    # Legitimate
    html_file_path = f"/home/administrator/Documents/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Legitimate-Resources/{phishid}/HTML/landingPage.html"

    # Phishy
    # html_file_path = f'/home/administrator/Documents/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Phishy-Resources/{phishid}/HTML/landingPage.html'

    with open(html_file_path, 'r') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    # write all the functions from here and pass the soup here
    #1st content feature
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
        
    # c_f8 = redirects(soup,url)
    # eight.append(c_f8) 
        
    # c_f9 = check_cookies(soup,url)
    # nine.append(c_f9) 
        
    c_10 = check_sfh(soup,url)
    ten.append(c_10) 
        
    c_11 = request_url(soup,url)
    eleven.append(c_11)
        
    c_12 = url_of_anchor(soup,url)
    twelve.append(c_12)
        
    c_13 = links_in_general(soup,url)
    thirteen.append(c_13)
        

if __name__ == "__main__":
    
    # Legitimate Excel file (My Laptop)
    # ExcelFilePath = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Legitimate-Data.xlsx'

    # Legitimate Folder Path (My Laptop)
    # resources_folder_path = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Legitimate-Resources/'

    # Phishy Excel file (My Laptop)
    # ExcelFilePath = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Phishy-Data.xlsx'

    # Phishy Folder Path (My Laptop)
    # resources_folder_path = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Phishy-Resources/'

    # ----------------------------------------------------------------------------------------------------------------------------------------- #

    # Path for Lab PC
    
    # Legitimate
 
    ExcelFilePath = '/home/administrator/Documents/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Legitimate-Data.xlsx'
    resources_folder_path = '/home/administrator/Documents/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Legitimate-Resources/'

    # Phishy
    # ExcelFilePath = '/home/administrator/Documents/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Phishy-Data.xlsx'
    # resources_folder_path = '/home/administrator/Documents/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Phishy-Resources/'


    # Load the Excel file using pandas
    df = pd.read_excel(ExcelFilePath)
    # print(df) 
    # print("the 6th feature_list is:-",six)   

    # output_folder_path = '/home/administrator/Desktop/Phishing-Verification/Phase-2 (ML classification)/Content based classification/'

    # os.makedirs(output_folder_path, exist_ok=True)

    urls = []
    count = 1

    for index, row in df.iterrows():

        phishid = str(row['PhishID'])
        check_html = row['HTML'] 
        check_url = row['URL']

        phishid_folder_path = os.path.join(resources_folder_path, phishid, 'HTML')

        if os.path.exists(phishid_folder_path) and check_html == 1:
            begin_processing(phishid, check_url)
        
        generateCSV()
        
        print(count)
        count+=1