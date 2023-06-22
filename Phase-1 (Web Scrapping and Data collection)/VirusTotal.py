# import requests
# import time 
# import json 
# import csv
# import os


# # list to store the links from the csv file
# links = []
# # The Dataset is already provided by the instructor
# dataset ="legitimateDatabase.csv"
# # The fileCounter is used to track the current file number on which our loop will be running
# fileCounter = 0

# # Read the URLs from the CSV file

# with open (dataset, 'r') as data:
#     readCSV = csv.reader(data)
#     for lines in readCSV:
#         fileCounter += 1
#         # The 0th element is the link which we will be using to test to find if the link is malicious or not.
#         links.append(lines[0])

#         if(fileCounter > 19):#only take 20 links in the links from thw given dataset 
#             break
#         else:
#             pass
        
#     print(links)

# # API Key is stored in the environment variable, so we need to get it from there
# API_Key = os.environ.get('VirusTotal_API_Key')

# # URL to get the report of the URL
# reportURL = 'https://www.virustotal.com/vtapi/v2/url/report'


# # List to store the report of the URL in form of json files json_d1.json, json_d2.json, json_d3.json, etc.
# jsonFiles = [] 

# for index in range(1,21):
#     # Create 20 json files in a single run.
#     jsonFiles.append(f'json_d{index}.json') 

# print(jsonFiles)

# ################################ if I take only 20 requests per day ##########################

# #gives the number of urls that we scan through
# iterations = 0

# #threshold tells the number of positives above which url is considered malicious
# threshold = 1

# for site in links:
#     if(iterations<20):
#         paras = {
#         'apikey' : API_Key,
#         'resource' : site
#         }
        
#         response = requests.get(reportURL, params=paras)
#         try:
#             response_json = json.loads(response.content)

#         except:
#             print("Error: Failed to decode JSON response")
#             continue  # Skip this URL and move on to the next one

#         if(response_json['positives'] >= threshold):

#             with open('final_url_list_results.txt', 'a') as f:
#                 f.write(site + "\t malicious!" + '\n') 
#                 print("the number of vendors thinking it was malicious are:-", response_json['positives']) 

#             with open(jsonFiles[iterations], 'w') as j:
#                 json.dump(response_json, j, indent=4)


#         elif(response_json['positives'] <= 0):

#             with open('final_url_list_results.txt', 'a') as f:
#                 f.write(site + "\tNot malicious!" + '\n') 
#                 print("the number of vendors thinking it was malicious are:-", response_json['positives'])  

#             with open(jsonFiles[iterations], 'w') as j:
#                 json.dump(response_json, j, indent=4)    


#         else:
#             print('no such url found')        
   
#         time.sleep(20) 
#         iterations += 1 

#     #say if only 20 requests per day then we change it to 499!
#     elif(iterations>=20):
#         break    

import csv
import requests
import json
import os
import time

def testURL_with_VirusTotal(url):
    api_key = os.environ.get('VirusTotal_API_Key')
    url = 'https://www.virustotal.com/vtapi/v2/url/report'
    params = {'apikey': api_key, 'resource': url}
    response = requests.get(url, params=params, timeout=10)
    return response.json()

def processCSVFile(csvFile):
    with open (csvFile, 'r') as data:
        # DictReader is used to read the csv file as a dictionary, so that we can access the columns by their names
        reader = csv.DictReader(data)
        for row in reader:
            phishID = row[0]
            URL = row[1]

            responseJSON = testURL_with_VirusTotal(URL)
                                   
            # Write the response to a JSON file, with ID as it's name
            with open(f'{phishID}.json', 'w') as jsonFile:
                json.dump(responseJSON, jsonFile, indent=4)
            
            print(f'Processed {phishID}.json')
            time.sleep(15)

processCSVFile("legitimateDatabase.csv")