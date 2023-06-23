# Import required libraries
import requests
import time
import json
import csv
import os

# File to fetch the URLs for testing
csv_file = 'phishTankDatabase(not-confirmed).csv'
# Set the API_Key
API_Key = '26bb9dc3cb7502eefc6334871545ac0172244df419b6d18401214119e6dab057'

# report will be generated using this URL
reportURL = 'https://www.virustotal.com/vtapi/v2/url/report'

# ThresholdVendors will check if the number of vendors marking a URL as malicious is greater than threshold value
ThresholdVendors = 5

# Dictionary to map ID to URL
Map_ID_URL = {}

# Create JSON_Files folder if it doesn't exist
JSON_Folder = 'JSON_Files'
if not os.path.exists(JSON_Folder):
    os.makedirs(JSON_Folder)

# Open the CSV file and populate the ID-to-URL mapping
with open(csv_file, 'r') as file:
    # Create a CSV reader object
    reader = csv.reader(file)

    # Skip the header row
    next(reader)

    # Process each row in the CSV file
    for row in reader:
        # Extract the Phish ID and URL from the row
        phish_ID = row[0]
        phishyURL = row[1]
        
        # Add URL to ID mapping
        Map_ID_URL[phish_ID] = phishyURL

# Create a CSV file for results
resultFile = 'results.csv'

# Iterate over the ID-to-URL mapping
for phishID, url in Map_ID_URL.items():

    # Set parameters for the API request
    parameters = {
        'apikey': API_Key,
        'resource': url
    }

    # Send the API request to get the response
    response = requests.get(reportURL, params=parameters)

    try:
        # Try to decode the JSON response
        responseJSON = json.loads(response.content)

    except json.decoder.JSONDecodeError as e:
        # Handle JSON decoding errors
        print("Error: Failed to decode JSON response: ", str(e))
        continue  # Skip this URL and move on to the next one
        
    # If positive key is found in the JSON file, check for the number of positives
    if 'positives' in responseJSON:

        if responseJSON['positives'] >= ThresholdVendors:
            malicious = -1
        else:
            malicious = 1

        with open(resultFile, 'a') as resultCSV:
            writer = csv.writer(resultCSV)
            writer.writerow([phishID, url, malicious])                
            # Write the result to the CSV file
            # writer.writerow([phishID, url, malicious])  # Write row to CSV

        print(f"the number of vendors thinking {phishID} was malicious are:", responseJSON['positives'])

        # Save the JSON response to a file
        with open(f'{JSON_Folder}/{phishID}.json', 'w') as j:
            json.dump(responseJSON, j, indent=4)

    else:
        print('No information about the URL')

    # Sleep for 20 seconds before making the next API request
    time.sleep(20)