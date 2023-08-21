import requests
from bs4 import BeautifulSoup 
from urllib.parse import urlparse 
import pandas as pd

def extract_urls_from_excel(file_path, sheet_name='Sheet1', url_column='URL'):

    try:
        # Read the Excel file
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        
        # Extract URLs from the specified column
        urls_list = df[url_column].tolist()

        return urls_list
    
    except Exception as e:
        print(f"Error: {e}")
        return []

def find_max_count(strings_list):

    string_count_map = {}

    # Count occurrences of each string
    for string in strings_list:
        string_count_map[string] = string_count_map.get(string, 0) + 1

    with open("Output/map.txt", 'a') as f1:
        f1.write(f"{string_count_map}") 

    if not string_count_map:
        return None, None

    max_count = max(string_count_map.values())
    min_count = min(string_count_map.values())

    return max_count, min_count

if __name__ == "__main__":

    file_path = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Phishy-Data.xlsx'
    
    url_list = extract_urls_from_excel(file_path)

    for url in url_list:

        try: 
            all_links = []
            response = requests.get(url)
            response.raise_for_status() 
            soup = BeautifulSoup(response.content, "html.parser") 
            
            if soup.text:
                links = soup.find_all("link")
                if links:
                    for link in links:
                        the_link = link.get('href')
                        if the_link: 
                            parsed_url_link = urlparse(the_link)
                            domain_link = parsed_url_link.netloc
                            if(domain_link):
                                all_links.append(domain_link)
                            

                images = soup.find_all("img")

                if images:
                    for i in images:
                        check_url = i.get('src')
                        if check_url:
                            if "http" in check_url or "https" in check_url or "HTTP" in check_url or "HTTPS" in check_url:
                                parsed_url_images = urlparse(check_url)
                                domain_images = parsed_url_images.netloc
                                if(domain_images):
                                    all_links.append(domain_images)
                       

                scripts = soup.find_all("script")
                
                if scripts:
                    for script in scripts:
                        src = script.get('src')
                        if src:
                            parsed_url_src = urlparse(src)
                            domain_src = parsed_url_src.netloc
                            if(domain_src):
                                all_links.append(domain_src)  


                if len(all_links) != 0:

                    max_count_string,min_count_string = find_max_count(all_links) 
                    total_length =len(all_links)
                    with open("Output/ratio1.txt","a") as f3:
                        f3.write(f"{max_count_string/total_length}\n")           
                    

            else:
                print("no soup present")
                print("phishy")    
       

        except requests.exceptions.HTTPError as http_err:
            print(f"An HTTP error occurred: {http_err}")
            continue
        except Exception as err:
            print(f"An unexpected error occurred: {err}")
            continue
