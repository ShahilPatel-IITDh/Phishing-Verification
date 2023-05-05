import csv
import requests
from bs4 import BeautifulSoup

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
        phish_id = cells[0].text.strip()
        url = cells[1].text.strip()
        data.append([phish_id, url])

# Write the data to a CSV file
with open("phishtank_data_first15.csv", "w", newline="") as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(["Phish ID", "URL"])
    writer.writerows(data)