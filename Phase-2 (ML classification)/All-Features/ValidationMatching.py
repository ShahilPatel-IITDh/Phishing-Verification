import pandas as pd
import re

with open('unconfirmed_results.txt', 'r') as text_file:
    content = text_file.read()

# Find the relevant substring using regular expression

pattern = r'(: 1|: -1| :-1|)'
match = re.search(pattern, content)

if match:
    matched_string = match.group()
else:
    matched_string = None


# Read the Excel file
excel_data = pd.read_excel('/home/administrator/Documents/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Unconfirmed-Data.xlsx')

# Filter rows based on the matched string 
filtered_data = excel_data[excel_data['URL'].str.contains(matched_string)]['PhishID']


# read the CSV file
csv_data = pd.read_csv('Unconfirmed-Data.csv')

# Update the 'result' column in the CSV file

for index, phish_id in filtered_data.items():
    if matched_string.endswith(': 1') or matched_string.endswith(':1'):
        csv_data.loc[csv_data['PhishID'] == phish_id, 'Result'] = 1
    
    else:
        csv_data.loc[csv_data['PhishID'] == phish_id, 'Result'] = -1

# Save the updated CSV file

csv_data.to_csv('Unconfirmed-Data.csv', index=False)