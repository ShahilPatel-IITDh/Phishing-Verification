import requests
import time
import json
import pandas as pd
import os

filePath = str(input("Enter the File Path: "))
urlCSV = pd.read_csv({filePath})

# Create a list to store the data, and a list to store the URLs, the URL will be stored under the attribute name URL
URLs = urlCSV['URL'].tolist()

# URLs = ['https://shrtlink.net/b0df448f','https://ch-post.vegocloud.online/card/255891313','https://docs.google.com/presentation/d/e/2PACX-1vS...']

API_Key = os.environ.get('VirusTotal_API_Key')

reportURL = 'https://www.virustotal.com/vtapi/v2/url/report'

for link in URLs:
    parameters = {'apikey': API_Key, 'resource': 1}

    response = requests.get(url = reportURL, params=parameters)
    json_response = json.loads(response.text)

    if json_response['positives'] <= 0:
        with open('VirusTotal.txt', 'a') as outFile:
            outFile.write(link) and outFile.write(" \tNOT MALICIOUS\n")
    
    else:
        with open('VirusTotal.txt', 'a') as outFile:
            outFile.write(link) and outFile.write(" \tMALICIOUS\n")

    time.sleep(20)

