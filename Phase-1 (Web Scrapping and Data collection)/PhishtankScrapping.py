# Overview: As some URLs on the PhishTank site weren't mentioned completely on a single table, the user requires to click on the URL ID link to visit a new webpage where the complete URL will be present, So this code will automate the process of:
# 1. Open the PhishTank site
# 2. Iterate through each webpage and it's corresponding table entries
# 3. Click on the URL ID link to visit a new webpage, for each table entry
# 4. Extract the URL from the new webpage
# 5. Save the URL and it's corresponding ID in a CSV file on local machine

# Import the required libraries
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

