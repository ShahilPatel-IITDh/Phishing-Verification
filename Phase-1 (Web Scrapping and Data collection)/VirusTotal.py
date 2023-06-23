import requests
import time
import json
import csv
import os

csv_file = 'phishTankDatabase(not-confirmed).csv'
API_Key = os.environ.get('VirusTotal_API_Key')
# API_Key = 'a86f0d04435957a63eb4bf78268c485af2f61af95c70c014a8593ed10609e0b4'
url_needed = 'https://www.virustotal.com/vtapi/v2/url/report'
threshold = 5

links = [] #store the phish_urls here
ids = []   #store the phish_ids here 


# Open the CSV file
with open(csv_file, 'r') as file:
    # Create a CSV reader object
    reader = csv.reader(file)

    # Skip the header row
    next(reader)

    # Process each row in the CSV file
    for row in reader:
        # Extract the Phish ID and URL from the row
        phish_id = row[0]
        url = row[1]
        links.append(url)
        ids.append(phish_id)      


for index, site in enumerate(links):

    paras = {
        'apikey': API_Key,
        'resource': site
    }

    respo = requests.get(url_needed, params=paras)

    try:
        respo_json = json.loads(respo.content)
    except:
        print("Error: Failed to decode JSON response")
        continue  # Skip this URL and move on to the next one

    if 'positives' in respo_json:

        if respo_json['positives'] >= threshold:
            with open('results.txt', 'a') as f:
                f.write(f'{ids[index]}' + "\t malicious!" + '\n')
            print("the number of vendors thinking it was malicious are:", respo_json['positives'])

            with open(f'{ids[index]}.json', 'w') as j:
                json.dump(respo_json, j, indent=4)

        elif respo_json['positives'] < threshold:
            with open('results.txt', 'a') as f:
                f.write(f'{ids[index]}'+ "\tNot malicious!" + '\n')
            print("the number of vendors thinking it was malicious are:", respo_json['positives'])

            with open(f'{ids[index]}.json', 'w') as j:
                json.dump(respo_json, j, indent=4) 

        else:
            print('no info found')        
    else:
        print('No information about the URL')

    time.sleep(20)
