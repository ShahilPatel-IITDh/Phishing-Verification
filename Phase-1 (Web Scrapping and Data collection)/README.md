# Phase-1

## Web Scrapping and Data collection
This phase includes the following tasks:
- [1] Web Scrapping using BeautifulSoup and Selenium
- [2] Creation of a dataset consisting of the legitimate as well as confirmed phishy URLs from PhishTank
- [3] Using API of VirusTotal to test whether a URL is malicious or not
- [4] Generation of JSON files for each URL tested against the VirusTotal
- [5] Automating the process of webresources collection for confirmed phishy URLs(This can be done using a recursive code written by *Shahil Patel* and *Shivam Tirmare*), or using a library called pywebcopy. The code for both the methods is available in the folder _*WebResources*_.

## Tools and Technologies used:
- Python
- BeautifulSoup
- Selenium
- VirusTotal API
- JSON
- Github
- PhishTank
- Pywebcopy

Motive of this phase is to collect the data which will be used to train a machine learning model to classify a URL as legitimate or phishy. The classification will be based on __URL__ as well as __visual features__ of the website. The *WebResources* folder contains code which will be used to download the web-resources of the website.

The PhishtankScrapping.py code will be used to scrap the legitimate URLs from various webpages available on the PhishTank website. The code will scrap the URLs from the website and store them in a CSV file. The CSV file will contain the following columns:
- Phish ID
- URL

The same code can be used to scrap the URLs from a database containing confirmed phishy URLs (Phishtank Archives)

The _VirusTotal.py_ uses the VirusTotal API to test whether a URL is malicious or not. The code will take the URLs from the CSV file and test them against the VirusTotal. The VirusTotal API will return a JSON file containing the results of the test. The JSON file will be stored in a folder named _*JSON*_.
