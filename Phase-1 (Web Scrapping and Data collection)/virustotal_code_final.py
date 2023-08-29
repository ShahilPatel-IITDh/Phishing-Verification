import requests 
import time 
import json 
import csv
from bs4 import BeautifulSoup
import pandas as pd

# links = []
# filename ="url_dataset.csv"
# count_files = 0 

# c_val=1 #to get urls from 137 to 300 
     

# with open(filename, 'r') as c:
#     csvread = csv.reader(c) 
#     for i, lines in enumerate(csvread):
#         if i < 312: # skip the first 136 lines
#             continue
#         count_files += 1
#         links.append(lines[0])
#         if count_files >88: # only take 20 links from the given filename
#             break

   
        
# print(links)

# print(f"length of links is{len(links)}")

# api_key = 'a86f0d04435957a63eb4bf78268c485af2f61af95c70c014a8593ed10609e0b4'

# url_needed = 'https://www.virustotal.com/vtapi/v2/url/report'

# json_files = [] 
# # #'json_d1.json', 'json_d2.json', 'json_d3.json', 'json_d4.json', 'json_d5.json', 'json_d6.json', 'json_d7.json', 'json_d8.json', 'json_d9.json', 'json_d10.json','json_d11.json' 

# for index in range(313,401):#make the json file names 
#     json_files.append(f'json_d{index}.json') 

# print(json_files)

# # ################################ if I take only 20 requests per day ##########################

# iterations=0#gives the number of urls that we scan through
# threshold=1#threshold tells the number of positives above which url is considered malicious

# for site in links:

#     if(iterations<92):
#         paras = {
#         'apikey' : api_key,
#         'resource' : site
#     }
#         respo = requests.get(url_needed, params=paras)
#         try:
#             respo_json = json.loads(respo.content)
#         # s='json_files.json' 
#         # with open(s+co,'w') as j1:
#         #     json.dump(respo_json, j1, indent=4) 
#         except:
#             print("Error: Failed to decode JSON response")
#             continue  # Skip this URL and move on to the next one

#         if(respo_json['positives'] >=threshold):

#             with open('final_url_list_results.txt', 'a') as f:
#                 f.write(site + "\t malicious!" + '\n') 
#                 print("the number of vendors thinking it was malicious are:-", respo_json['positives']) 

#             with open(json_files[iterations], 'w') as j:
#                 json.dump(respo_json, j, indent=4)


#         elif(respo_json['positives'] <= 0):

#             with open('final_url_list_results.txt', 'a') as f:
#                 f.write(site + "\tNot malicious!" + '\n') 
#                 print("the number of vendors thinking it was malicious are:-", respo_json['positives'])  

#             with open(json_files[iterations], 'w') as j:
#                 json.dump(respo_json, j, indent=4)    


#         else:
#             print('no such url found')        
        
#         iterations+=1
#         time.sleep(20) 
#     #say if only 20 requests per day then we change it to 499!
#     elif(iterations>=92):
#         break  


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
    

def start_processing(links , json_files , api_key , url_needed):

    print("inside the main processing function\n")

    iterations = 0 

    for site in links:

        if(iterations >= 100): ## only do processing for 100 urls
            return
        
        paras = {
         'apikey' : api_key,
         'resource' : site
        }

        respo = requests.get(url_needed, params=paras)

        try:
            respo_json = json.loads(respo.content)
        # s='json_files.json' 
        # with open(s+co,'w') as j1:
        #     json.dump(respo_json, j1, indent=4) 
        except:
            print("Error: Failed to decode JSON response")
            continue  # Skip this URL and move on to the next one 

        # respo_json['positives'] 

        with open ("number_of_vendors.txt","a") as f:
            f.write(f"number of vendors are:-{respo_json['positives']} for {site}\n")

        with open(json_files[iterations], 'w') as j:
            json.dump(respo_json, j, indent=4)  

        iterations += 1

        time.sleep(20)    
      



if __name__ == "__main__":
    # file_path = 'Legitimate-Data.xlsx'
    file_path = 'Phishy-Data.xlsx'
    url_list = extract_urls_from_excel(file_path) 
    api_key = 'a86f0d04435957a63eb4bf78268c485af2f61af95c70c014a8593ed10609e0b4'
    url_needed = 'https://www.virustotal.com/vtapi/v2/url/report'
    json_files = []
    for index in range(0,100):
        json_files.append(f'json_d{index+1}.json')  

    start_processing(url_list,json_files,api_key,url_needed)    





    