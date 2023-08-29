# import requests 
# import time 
# import json 
# import csv
# from bs4 import BeautifulSoup
# import pandas as pd


# def extract_urls_from_excel(file_path, sheet_name='Sheet1', url_column='URL'):
#     try:
#         # Read the Excel file
#         df = pd.read_excel(file_path, sheet_name=sheet_name)
        
#         # Extract URLs from the specified column
#         urls_list = df[url_column].tolist()

#         return urls_list
#     except Exception as e:
#         print(f"Error: {e}")
#         return [] 
    

# def start_processing(links , json_files , api_key , url_needed):

#     print("inside the main processing function\n")

#     iterations = 0 

#     for site in links:
    
#         paras = {
#          'apikey' : api_key,
#          'resource' : site
#         }

#         respo = requests.get(url_needed, params=paras)

#         try:
#             respo_json = json.loads(respo.content)
#         # s='json_files.json' 
#         # with open(s+co,'w') as j1:
#         #     json.dump(respo_json, j1, indent=4) 
#         except:
#             print("Error: Failed to decode JSON response")
#             continue  # Skip this URL and move on to the next one 

#         # respo_json['positives'] 

#         with open ("number_of_vendors_unconfirmed.txt","a") as f:

#             f.write(f"number of vendors are : {respo_json['positives']} for {site}\n") 

#         result = None    

#         if(respo_json['positives'] >= 16):
#             result = -1 
#         elif(respo_json['positives'] < 16):
#             result = 1  


#         with open("unconfirmed_results.txt","a") as fi:
#             fi.write(f"{site} : {result}\n")

#         with open(json_files[iterations], 'w') as j:
#             json.dump(respo_json, j, indent=4)  

#         iterations += 1

#         time.sleep(20)    
      



# if __name__ == "__main__":
#     # file_path = 'Legitimate-Data.xlsx'
#     file_path = 'LogFile.xlsx'
#     url_list = extract_urls_from_excel(file_path) 
#     api_key = 'a86f0d04435957a63eb4bf78268c485af2f61af95c70c014a8593ed10609e0b4'
#     url_needed = 'https://www.virustotal.com/vtapi/v2/url/report'
#     json_files = []
#     for index in range(0,100):
#         json_files.append(f'json_d{index+1}.json')  

#     start_processing(url_list,json_files,api_key,url_needed)    


import requests 
import time 
import json 
import csv
from bs4 import BeautifulSoup
import pandas as pd

def extract_urls_from_excel(file_path, sheet_name='Sheet1', url_column='URL', start_row=60):
    try:
        # Read the Excel file
        df = pd.read_excel(file_path, sheet_name=sheet_name, skiprows=range(1, start_row))
        
        # Extract URLs from the specified column
        urls_list = df[url_column].tolist()

        return urls_list
    except Exception as e:
        print(f"Error: {e}")
        return [] 

def start_processing(links , json_files , api_key , url_needed):

    print("inside the main processing function\n")

    iterations = 0 

    for site in links:
        try:
            paras = {
                'apikey' : api_key,
                'resource' : site
            }

            respo = requests.get(url_needed, params=paras)
            respo_json = json.loads(respo.content)

            with open("number_of_vendors_unconfirmed.txt","a") as f:
                f.write(f"number of vendors are : {respo_json['positives']} for {site}\n")

            result = None    

            if(respo_json['positives'] >= 16):
                result = -1 
            elif(respo_json['positives'] < 16):
                result = 1  

            with open("unconfirmed_results.txt","a") as fi:
                fi.write(f"{site} : {result}\n")

            with open(json_files[iterations], 'w') as j:
                json.dump(respo_json, j, indent=4)  

            iterations += 1

            time.sleep(20)
        except Exception as e:
            print(f"Error processing {site}: {e}")
            continue

if __name__ == "__main__":
    file_path = 'LogFile.xlsx'
    url_list = extract_urls_from_excel(file_path, start_row=60) 
    api_key = 'a86f0d04435957a63eb4bf78268c485af2f61af95c70c014a8593ed10609e0b4'
    url_needed = 'https://www.virustotal.com/vtapi/v2/url/report'
    json_files = [f'json_d{index+1}.json' for index in range(0, 100)]

    start_processing(url_list, json_files, api_key, url_needed)
