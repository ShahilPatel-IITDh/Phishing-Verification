import pandas as pd
import sys  
import re
from bs4 import BeautifulSoup
import requests
from urllib.parse import urlparse 


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

def checkiframe(stext):
    if re.findall(r"<iframe>|<frameBorder>", stext):
        return "phishing"
    
    return "legitimate"




if __name__ == "__main__":

    file_path = 'Phishy-Data.xlsx'
    url_list = extract_urls_from_excel(file_path) 

    for url in url_list:
        try:
            response = requests.get(url)
            response.raise_for_status()  # Raise an exception for HTTP errors

            soup = BeautifulSoup(response.content, 'html.parser')
           
    
            hrefs_domain = []

            if soup:
                result = checkiframe(soup.text)
                with open("results.txt","a") as f:
                    f.write(f"{url},{result}\n")

            
            else:
                print("no soup present")
                print("phishy")
                continue

        except Exception as e:
            print(f"An exception occurred for URL {url}: {e}")
            continue
