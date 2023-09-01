import requests
import time
import json
from bs4 import BeautifulSoup
import pandas as pd

def extract_urls_from_excel(file_path, sheet_name='Sheet1', url_column='URL'):
    try:
        # Read the Excel file
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        
        # Extract URLs from the specified column
        urls_list = df[url_column].tolist()

        return df, urls_list  # Return both the DataFrame and URLs list

    except Exception as e:
        print(f"Error: {e}")
        return None, []

def start_processing(dataframe, links, api_key, url_needed):
    print("Inside the main processing function\n")

    iterations = 1

    for site in links:
        try:
            paras = {
                'apikey': api_key,
                'resource': site
            }

            respo = requests.get(url_needed, params=paras)
            respo.raise_for_status()  # Raise an exception if the HTTP request fails

            respo_json = respo.json()

            with open("number_of_vendors1.txt", "a") as f:
                f.write(f"number of vendors are: {respo_json['positives']} for {site}\n")

            # Update the DataFrame based on the condition
            if respo_json['positives'] < 16:
                dataframe.loc[dataframe['URL'] == site, 'virus_total_results'] = 1
            else:
                dataframe.loc[dataframe['URL'] == site, 'virus_total_results'] = -1
            
            # Save the updated DataFrame to the Excel file after each URL is processed
            updated_file_path = 'Legitimate_Updated.xlsx'
            dataframe.to_excel(updated_file_path, index=False)
            print(f"Updated Excel file saved as '{updated_file_path}'")

        except Exception as e:
            print(f"Error processing {site}: {e}")
            continue

        print(f"{iterations}"+'\n')
        iterations+=1
        time.sleep(20)
    
    return dataframe

if __name__ == "__main__":
    file_path = 'Legitimate-300-Samples.xlsx'
    dataframe, url_list = extract_urls_from_excel(file_path)
    api_key = '5817e99e88310b2a9dfe7de9b7b7efaec1a02273bb52c917a2f09340a9b79218'
    url_needed = 'https://www.virustotal.com/vtapi/v2/url/report'
    
    updated_dataframe = start_processing(dataframe, url_list, api_key, url_needed)
    
    if updated_dataframe is not None:
        print("Processing completed. Final Excel file saved.")