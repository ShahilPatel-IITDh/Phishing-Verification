import os
import requests
import json
import time

# The API key is stored in the environment variable, fetch it using the following code, where 'VirusTotal_API_Key' is the name of the environment variable.
API_Key = os.environ.get('VirusTotal_API_Key')

# URLs for testing
URLS = ['https://www.google.com', 'https://www.facebook.com', 'https://www.youtube.com', 'https://www.twitter.com', 'https://www.instagram.com', 'http://www.NotExisting.com', 'http://www.NotExisting2.com']

VirusTotal = 'https://www.virustotal.com/api/v3/report'

for site in URLS:
    parameters = {'apikey': API_Key, 'resource': site}
    response = requests.get(VirusTotal, params = parameters)
    response_json = json.loads(response.content)

    if response_json['positives'] <= 0:
        with open('TestResults.txt', 'a') as TR:
            TR.write(site) and TR.write(' -\tNOT MALICIOUS\n')
            
    elif 1 >= response_json['positives'] >=30:
        with open('TestResults.txt', 'a') as TR:
            TR.write(site) and TR.write(' -\tMAYBE MALICIOUS\n')
    
    elif response_json['positives'] > 30:
        with open('TestResults.txt', 'a') as TR:
            TR.write(site) and TR.write(' -\tMALICIOUS\n')

    else:
        print('URL not found')
    
    # We use sleep for 10 seconds because our API is not premium so we are allowed to make at-most 1 request every 4 seconds. 
    time.sleep(10)