import pandas as pd
import sys  
from bs4 import BeautifulSoup
import requests
from urllib.parse import urlparse

## only adding ratios
## check for threshold of legitimate like [min,max] count and complete the code. 

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
    
# compares the domain of the most frequent used and the base domain    

def find_max_count(strings_list):

    string_count_map = {}

    # Count occurrences of each string
    for string in strings_list:
        string_count_map[string] = string_count_map.get(string, 0) + 1

    with open("Output1/map.txt", 'a') as f1:
        f1.write(f"{string_count_map}") 

    if not string_count_map:
        return None, None

    max_count = max(string_count_map.values())
    min_count = min(string_count_map.values())

    return max_count, min_count


if __name__ == "__main__":
    # file_path = 'Legitimate-Data.xlsx'
    file_path = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Legitimate-Data.xlsx'
    url_list = extract_urls_from_excel(file_path)

    for url in url_list:
        try:
            response = requests.get(url)
            soup = BeautifulSoup(response.content, 'html.parser')
            a_tags = soup.find_all('a')

            hrefs = []

            if soup:
                for link in a_tags:
                    if link:
                        href = link.get('href')
                        if href:
                            hrefs.append(href)

            if len(hrefs) != 0:
                max_count_string, min_count = find_max_count(hrefs)
                with open("Output1/ratio.txt", 'a') as f:
                    f.write(f"{max_count_string}, {min_count}\n")
            
            else:
                # print("No hrefs present for URL:", url)
                print("phishy")
                continue

        except requests.exceptions.RequestException as e:
            print("An error occurred during the request for URL:", url)
            print("Error:", e)
            continue

        except Exception as e:

            print("An error occurred:", e)
            continue