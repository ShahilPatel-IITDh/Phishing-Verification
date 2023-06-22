import json
import requests
import time
import csv
import os


# list to store the links from the csv file
links = []
# The Dataset is already provided by the instructor
dataset = "legitimateDatabase.csv"
# The fileCounter is used to track the current file number on which our loop will be running
fileCounter = 0

# Read the URLs from the CSV file
with open(dataset, 'r') as data:
    # csv.reader will read the 
    readCSV = csv.reader(data)

    for lines in readCSV:
        fileCounter += 1
        # The 1st indexed element is the URL which we will be using to test to find if the URL is malicious or not.
        links.append(lines[1])

        # We only need 20 links from the given dataset
        if (fileCounter > 19): 
            break
        
        else:
            pass

    print(links)

# API Key is stored in the environment variable, so we need to get it from there
API_Key = os.environ.get('VirusTotal_API_Key')

# URL to get the report of the URL
reportURL = 'https://www.virustotal.com/vtapi/v2/url/report'

# list to store the json files
jsonFiles = []

for index in range(1, 21):
    # Create 20 json files in a single run.
    jsonFiles.append(f'json_d{index}.json')

# print(jsonFiles)

################################ if I take only 20 requests per day ##########################

# gives the number of urls that we scan through
iterations = 0

# threshold tells the number of positives above which url is considered malicious
threshold = 3

for site in links:
    if (iterations < 20):

        paras = {
            'apikey': API_Key,
            'resource': site
        }

        response = requests.get(reportURL, params=paras, timeout=300)
        
        # try to decode the json response, if it fails then skip this URL and move on to the next one
        try:
            response_json = json.loads(response.content)

        # if the json response is not valid then print the error and move on to the next URL
        except:
            print("Error: Failed to decode JSON response")
            continue  # Skip this URL and move on to the next one


        # if the response is valid then check if the URL is malicious or not
        if (response_json['positives'] >= threshold):
            

            with open('URL_testResults.txt', 'a') as f:
                f.write(site + "\t malicious!" + '\n')

                print("the number of vendors thinking it was malicious are:-",
                      response_json['positives'])

            with open(jsonFiles[iterations], 'w') as j:
                json.dump(response_json, j, indent=4)

        elif (response_json['positives'] <= 0):

            with open('URL_testResults.txt', 'a') as f:
                f.write(site + "\tNot malicious!" + '\n')

                print("the number of vendors thinking it was malicious are:-",
                      response_json['positives'])

            with open(jsonFiles[iterations], 'w') as j:
                json.dump(response_json, j, indent=4)

        else:
            print('no such url found')

        time.sleep(20)
        iterations += 1

    # say if only 20 requests per day then we change it to 499!
    elif (iterations >= 20):
        break