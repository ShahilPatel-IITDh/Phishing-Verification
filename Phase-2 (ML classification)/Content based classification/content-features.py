import os
import re
import requests
from bs4 import BeautifulSoup 
from urllib.parse import urlparse 
import pandas as pd

# lists to store the data
list_request = []
list_anchor = []
list_email = []
list_mouse_over = []
list_right_click = []
list_iFrame = []
list_form_action = []
list_favicon_domain = []
list_enclosed_links = []

headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
} 

# The helper function for requestingURL, which finds the tags in the file content and returns the list of tags
def find_tags_in_file(file_content, tag_name):

    tag_list = []
    soup = BeautifulSoup(file_content, 'html.parser')
    tags = soup.find_all(lambda tag: tag.name == tag_name)
    if tags:
        tag_list.append(tag_name)
    return tag_list

def requestingURL(url, HTMLPath):

    image_list = []
    video_list = []
    audio_list = []
    
    try:
        # Read all files in the given path
        files = os.listdir(HTMLPath)

        for file_name in files:
            if file_name.endswith('.html') or file_name.endswith('.js'):
                with open(os.path.join(HTMLPath, file_name), 'r', encoding='utf-8') as file:
                    file_content = file.read()

                    # Find all the image tags present in the file content
                    image_list.extend(find_tags_in_file(file_content, 'img'))

                    # Find all the video tags present in the file content
                    video_list.extend(find_tags_in_file(file_content, 'video'))

                    # Find all the audio tags present in the file content
                    audio_list.extend(find_tags_in_file(file_content, 'audio'))

        # Total Number of tags
        total_tags = len(image_list) + len(video_list) + len(audio_list)

        if total_tags == 0:
            # As division with 0 is not possible, make total_tags as 1, (OR) return 0
            total_tags = 1
            return 0

        # Domain matching with domain in image, video, audio tag
        count_outer_domain = 0
        parsed_url = urlparse(url)
        domain = parsed_url.netloc

        # Replace the 'www.' with an empty string
        domain_without_extra = domain.replace("www.", "")

        # Replace the '.com' with an empty string
        domain_without_extra = domain_without_extra.replace(".com", "")

        for link in image_list + video_list + audio_list:
            if (domain not in link) and (domain_without_extra not in link):
                count_outer_domain += 1

        # check validity
        percentage = (count_outer_domain / total_tags) * 100

        if percentage < 22:
            # Legitimate
            return 1

        elif 22 <= percentage < 61:
            # Suspicious
            return 0

        else:
            # Phishy
            return -1

    except (Exception, requests.exceptions.HTTPError, requests.exceptions.RequestException) as e:
        print(f"Error: {e}")
        return 0 

def extract_a_href_tags_from_file(HTMLPath):
    
    landingPage = os.path.join(HTMLPath, 'landingPage.html')

    with open(landingPage, 'r', encoding='utf-8') as file:
        content = file.read()

    a_tags = []
    start = 0

    while True:
        start = content.find('<a', start)

        if start == -1:
            break

        end = content.find('>', start)

        if end == -1:
            break

        a_tag_content = content[start:end]
        href_start = a_tag_content.find('href="')

        if href_start != -1:
            href_start += 6
            href_end = a_tag_content.find('"', href_start)

            if href_end != -1:
                a_href = a_tag_content[href_start:href_end]
                a_tags.append(a_href)
        start = end

    return a_tags

def urlAnchor(url, HTMLPath):
    try:
        # Extract a_href tags from the provided HTML file
        a_href = extract_a_href_tags_from_file(HTMLPath)

        # Processing on links (if needed)
        # processing_on_links(a_href)

        total_length = len(a_href)

        if total_length == 0:
            total_length = 1

        parsed_url = urlparse(url)
        domain = parsed_url.netloc

        domain_without_extra = domain.replace("www.", "")
        domain_without_extra = domain_without_extra.replace(".com", "")

        count_outer_domain = 0

        for href in a_href:
            if domain_without_extra not in href:
                count_outer_domain += 1

            if href in ("#", "#content", "#skip", "JavaScript ::void(0)"):
                count_outer_domain += 1

        percentage = (count_outer_domain / total_length) * 100

        if percentage < 31:
            return 1

        elif 31 <= percentage <= 67:
            return 0

        else:
            return -1

    except (Exception, requests.exceptions.HTTPError, requests.exceptions.RequestException) as e:
        print(f"Error: {e}")
        return 0  

def onMouseOver(url, JSPath):

    try:
        # Check if the folder path exists
        if not os.path.exists(JSPath):
            print("Error: Folder path does not exist.")
            return -1

        js_files = [f for f in os.listdir(JSPath) if f.endswith('.js')]
        if not js_files:
            print("No .js files found in the folder path.")
            return -1

        for js_file in js_files:

            js_file_path = os.path.join(JSPath, js_file)

            with open(js_file_path, 'r', encoding='utf-8') as file:
                js_content = file.read()

            # Pass the JS content into BeautifulSoup
            soup = BeautifulSoup(js_content, 'html.parser')

            # Use BeautifulSoup to find onmouseover attribute in the content
            onmouseover_elements = soup.find_all(attrs={"onmouseover": True})
            
            if onmouseover_elements:
                return 1

        # If onmouseover not found in any file
        return -1

    except (Exception, requests.exceptions.HTTPError, requests.exceptions.RequestException) as e:
        print(f"Error: {e}")
        return 0

def check_for_email_submission(soup):
    # Check if email submission is present in any tags
    tags_with_email_submission = soup.find_all(string=re.compile(r"(?i)(mailto|mail\(\))"))
    if tags_with_email_submission:
        return -1  # Phishy - Found email submission in the content
    else:
        return 1  # Legitimate - No email submission found in the content

def submitEmail(url, HTMLPath, JSPath):

    try:
        # Check if the HTML folder path exists and contains .HTML files
        if not os.path.exists(HTMLPath):
            print("Error: HTML folder path does not exist.")
            return 0

        html_files = [f for f in os.listdir(HTMLPath) if f.endswith('.html')]
        if not html_files:
            print("No .HTML files found in the HTML folder path.")
            return 0

        # Check if the JSPath folder path exists and contains .js files
        if not os.path.exists(JSPath):
            print("Error: JSPath folder path does not exist.")
            return 0

        js_files = [f for f in os.listdir(JSPath) if f.endswith('.js')]
        if not js_files:
            print("No .js files found in the JSPath folder path.")
            return 0

        # Read contents of .HTML files and check for patterns
        for html_file in html_files:
            html_file_path = os.path.join(HTMLPath, html_file)
            with open(html_file_path, 'r', encoding='utf-8') as file:
                content = file.read()

            soup = BeautifulSoup(content, 'html.parser')
            result = check_for_email_submission(soup)
            if result == -1:
                # Phishy - Found email submission in the HTML content
                return -1

        # Read contents of .js files and check for patterns
        for js_file in js_files:
            js_file_path = os.path.join(JSPath, js_file)
            with open(js_file_path, 'r', encoding='utf-8') as file:
                content = file.read()

            # Pass the JS content into BeautifulSoup
            soup = BeautifulSoup(content, 'html.parser')
            result = check_for_email_submission(soup)
            if result == -1:
                # Phishy - Found email submission in the JS content
                return -1

        # Legitimate - No email submission found in any file
        return 1

    except (Exception, requests.exceptions.HTTPError, requests.exceptions.RequestException) as e:
        print(f"Error: {e}")
        return 0

def Check_RightClick(url, JSPath):

    try:
        # Check if the JSPath folder path exists and contains .js files
        if not os.path.exists(JSPath):
            print("Error: JSPath folder path does not exist.")
            return 0

        js_files = [f for f in os.listdir(JSPath) if f.endswith('.js')]
        if not js_files:
            print("No .js files found in the JSPath folder path.")
            return 0

        # Regular expression pattern to detect right-click disabling code
        right_click_disabled_pattern = r'\b(?:event\.preventDefault|oncontextmenu\s*=\s*[\'"]\s*(?:return\s+)?false\s*[\'"])\b'

        for js_file in js_files:
            js_file_path = os.path.join(JSPath, js_file)

            with open(js_file_path, 'r', encoding='utf-8') as file:
                js_content = file.read()

            # Create BeautifulSoup object from JS content
            soup = BeautifulSoup(js_content, 'html.parser')

            # Convert the BeautifulSoup object to a string to perform the pattern search
            js_content_str = str(soup)

            # Check if the pattern is present in the JS content
            if re.search(right_click_disabled_pattern, js_content_str):
                # Right-click disabled, return -1
                return -1

        # Right-click not disabled in any file, return 1
        return 1

    except (Exception, requests.exceptions.HTTPError, requests.exceptions.RequestException) as e:
        print(f"Error: {e}")
        return 0

def checkIFrame(url, HTMLPath):

    try:
        # Check if the HTML folder path exists and contains .html files
        if not os.path.exists(HTMLPath):
            print("Error: HTML folder path does not exist.")
            return -1

        html_files = [f for f in os.listdir(HTMLPath) if f.endswith('.html')]

        if not html_files:
            print("No .html files found in the HTML folder path.")
            return -1

        # Scan each HTML file for the keywords
        for html_file in html_files:
            html_file_path = os.path.join(HTMLPath, html_file)

            with open(html_file_path, 'r', encoding='utf-8') as file:
                content = file.read()

            # Create BeautifulSoup object from the HTML content
            soup = BeautifulSoup(content, 'lxml')

            # Check for the presence of 'iframe' tags
            if soup.find('iframe'):
                # If any <iframe> tag is found in any HTML file, return -1
                return -1

            # Check for the presence of 'frameBorder' attribute in <iframe> tags
            iframe_tags_with_frameborder = soup.find_all('iframe', attrs={'frameborder': True})

            if iframe_tags_with_frameborder:
                # If any <iframe> tag with 'frameBorder' attribute is found in any HTML file, return -1
                return -1

        # If none of the keywords is found in any HTML file, return 1
        return 1

    except (Exception, requests.exceptions.HTTPError, requests.exceptions.RequestException) as e:
        print(f"Error: {e}")
        return -1

def checkFormAction(url, response, soup):
    domain = url.split('//')[-1].split('/')[0]

    try:
        # Fetch the HTML content of the URL
        # response = requests.get(url)
        response.raise_for_status()
        # response_content = response.content

        # soup = BeautifulSoup(response_content, 'html.parser')

        forms = soup.find_all('form', action=True)

        if len(forms) == 0:
            return 1
        
        else:
            for form in forms:
                action = form['action'].strip()

                if action == "" or action == "about:blank":
                    return -1
                
                elif url not in action and domain not in action:
                    return 0
                
                else:
                    return 1

    except (Exception, requests.exceptions.HTTPError, requests.exceptions.RequestException) as e:
        print(f"Error: Unable to fetch the URL - {e}")
        return 0

def checkFaviconDomain(url, response, soup):

    try:
        # Fetch the HTML content of the URL
        response = requests.get(url)
        response.raise_for_status()
        response_content = response.content

        soup = BeautifulSoup(response_content, 'html.parser')

        # Get the favicon link
        favicon_link = None
        favicon_tag = soup.find('link', rel='icon')
        if favicon_tag:
            favicon_link = favicon_tag.get('href')

        # If favicon is not present, return 0
        if not favicon_link:
            return 0

        # Parse the domain name from the URL and the favicon link
        url_domain = urlparse(url).netloc
        favicon_domain = urlparse(favicon_link).netloc

        # Compare the domain names
        if url_domain == favicon_domain:
            return 1
        
        else:
            return -1

    except (Exception, requests.exceptions.HTTPError, requests.exceptions.RequestException) as e:
        print(f"Error: Unable to fetch the URL - {e}")
        return -99

def enclosedLinks(url, HTMLPath, JSPath):
    
    parsed_url = urlparse(url)
    domain = parsed_url.netloc  
    
    links_href = []
    meta_content = []
    script_src = []

    # List all HTML files in the specified directory
    html_files = [f for f in os.listdir(HTMLPath) if f.endswith('.html')]

    for html_file in html_files:
        file_path = os.path.join(HTMLPath, html_file)
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()

        soup = BeautifulSoup(content, 'html.parser')

        links = soup.find_all("link")

        for link in links:
            the_link = link.get('href')
            if the_link and ("http" in the_link or "https" in the_link):
                links_href.append(the_link)

        meta = soup.find_all("meta")

        for m in meta:
            check_url = m.get('content')
            if check_url and ("http" in check_url or "https" in check_url):
                meta_content.append(check_url)

        scripts = soup.find_all("script")

        for script in scripts:
            src = script.get('src')
            if src and ("http" in src or "https" in src):
                script_src.append(src)

    total_length = len(links_href) + len(meta_content) + len(script_src)
    unsafe = 0
                
    # avoid divison by zero
    if total_length == 0:
        total_length = 1

    for addy in links_href + meta_content + script_src:
        if domain not in addy and addy[0] != '/':
            unsafe += 1

    percentage = (unsafe / total_length) * 100

    if percentage < 17:
        return 1

    elif 17 <= percentage <= 81:
        return 0

    else:
        return -1


def beginProcess(url, phishID):

    # Folder paths for HTML, JS content
    HTMLPath = f"/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Legitimate-Resources/{phishID}/HTML/"

    JSPath = f"/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Legitimate-Resources/{phishID}/JavaScript/"

    # 0: Append the url also in the csv file
    # list_url.append(url)

    # Fetch the HTML content of the URL
    response = requests.get(url, headers=headers)
    response.raise_for_status()

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')

    # 1: Request the url
    requestURL = int(requestingURL(url, HTMLPath))
    list_request.append(requestURL)

    # 2: URL of anchor
    URL_anchor = int(urlAnchor(url, HTMLPath))
    list_anchor.append(URL_anchor)

    # 3: Submitting to Mail
    submit_to_mail = int(submitEmail(url, HTMLPath, JSPath))
    list_email.append(submit_to_mail)

    # 4: On Mouseover
    on_mouse_over = int(onMouseOver(url, JSPath))
    list_mouse_over.append(on_mouse_over)

    # 5: Right Click
    right_click = int(Check_RightClick(url, JSPath))
    list_right_click.append(right_click)

    # 6: IFrame
    iFrame = int(checkIFrame(url, HTMLPath))
    list_iFrame.append(iFrame)

    # 7: Form Action
    form_action = int(checkFormAction(url, response, soup))
    list_form_action.append(form_action)

    # 8: Favicon domain check
    favicon_domain = int(checkFaviconDomain(url, response, soup))
    list_favicon_domain.append(favicon_domain)

    # 9: Links in Meta, link and script tags
    enclosed_links = int(enclosedLinks(url, HTMLPath, JSPath))
    list_enclosed_links.append(enclosed_links)


def generateCSV():

    data = {
        # 'URL': list_url,
        'URL Request': list_request,
        'URL Anchor': list_anchor,
        'Submit to Email': list_email,
        'On Mouse Over': list_mouse_over,
        'Right Click': list_right_click, 
        'IFrame': list_iFrame,
        'Form Action': list_form_action,
        'Favicon Domain': list_favicon_domain,
        'Enclosed Links': list_enclosed_links
    }

    # Create a DataFrame from the dictionary
    df = pd.DataFrame(data)

    # Write the Phishy DataFrame to a Phishy-Data CSV file
    # df.to_csv('Phishy-Data.csv', index=False)

    # Write the Legitimate DataFrame to a Legitimate-Data CSV file
    df.to_csv('Legitimate-Data.csv', index=False)

if __name__ == '__main__':
    
    # Replace 'your_file_path.xlsx' with the actual path to your Excel file
    ExcelFilePath = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Legitimate-Data.xlsx'
    
    # ExcelFilePath = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Phishy-Data.xlsx'

    # Read the Excel file into a pandas DataFrame
    df = pd.read_excel(ExcelFilePath) 

    set_of_urls = set()

    count = 0
    # Iterate through the DataFrame and print URLs for rows with 'Status Code' equal to 200
    for index, row in df.iterrows():
        URL = row['URL']
        phishID = row['PhishID']

        if URL not in set_of_urls:
            set_of_urls.add(URL)

            if row['Status Code'] == 200:
                
                # For cross-checking
                with open("urls_in_excel.txt","a") as f:
                    f.write(URL + "\n") 
                    f.write(f"{count}"+"\n")
                    f.write("--------------------------------------"+"\n")

                print(count)
                count+=1

                # count limit added just for checking the code on a small set of URLs
                beginProcess(URL, phishID)

        generateCSV()