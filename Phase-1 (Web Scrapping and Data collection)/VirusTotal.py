import csv
import os
import time
import requests
import json

# Replace YOUR_API_KEY with your actual VirusTotal API key
API_Key = os.environ.get('VirusTotal_API_Key')

# Define the VirusTotal API endpoints
scanURL = 'https://www.virustotal.com/vtapi/v2/url/scan'
reportURL = 'https://www.virustotal.com/vtapi/v2/url/report'

# Open the CSV file and skip the header row
with open('legitimateDatabase.csv', newline='') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)
    
    # Iterate over the next 500 rows
    for i, row in enumerate(reader):
        if i >= 500:
            break
        
        phish_id, url = row
        
        # Scan the URL using the VirusTotal API
        params = {'apikey': API_Key, 'url': url}
        response = requests.post(scanURL, data=params)
        json_response = response.json()
        
        # Wait for the scan to finish
        resource = json_response['resource']
        params = {'apikey': API_Key, 'resource': resource}
        while True:
            response = requests.get(reportURL, params=params)
            json_response = response.json()
            if json_response['response_code'] == 1:
                break
            else:
                print(f"Error scanning URL {url}: {json_response['verbose_msg']}")
                break
        
        # Save the scan results in a JSON file
        json_filename = f"{phish_id}.json"
        with open(json_filename, 'w') as json_file:
            json.dump(json_response, json_file)
        
        print(f"Scanned URL {url} ({i+1}/500)")
        
        # Add a delay of 10 seconds
        time.sleep(10)