import csv
import requests
from bs4 import BeautifulSoup

# function to remove a given substring from a string
def removeSubstr(string, sub):
    if string.find(sub) == -1:
        return string
    else:
        return string.replace(sub, "")

# Create a list to store the data
data = []

# Loop through all the pages
for page in range(15):
    # Send a GET request to the webpage and get the HTML content
    url = f"https://phishtank.org/phish_search.php?page={page}&active=y&verified=u"
    response = requests.get(url)
    html = response.content

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(html, "html.parser")

    # Find the table that contains the data
    table = soup.find("table", {"class": "data"})

    # Get the rows in the table
    rows = table.find_all("tr")

    # Loop through each row in the table and extract the Phish ID and Phish URL
    for row in rows[1:]:
        cells = row.find_all("td")
        
        # Find the span element in the row, we will use the value inside it to be removed from the URL string
        span_element = row.find('span', class_='small')
        substr = span_element.text.strip()
        # print(substr)

        phish_id = cells[0].text.strip()
        extraURL = cells[1].text.strip()
        url = removeSubstr(extraURL, substr)
        data.append([phish_id, url])

# Write the data to a CSV file
with open("phishtank_data_first15.csv", "w", newline="") as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(["Phish ID", "URL"])
    writer.writerows(data)