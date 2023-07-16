# Extracting all the features

This code reads the PhishID and URL columns from the excel file maintained is **DatasetPreparation** directory, an check for the status code of the URL, if not 0, then proceed.

## 1: Features from URLs
- URL Length
- Having IP Address (-1, 1)
- Shortening Service (-1, 1)
- Having *@* symbol (-1, 1)
- Double Slash Redirecting (-1, 1)
- SSL final state (-1, 1)
- Favicons (-1, 1) 
- Port (-1, 1)
- HTTPS Token (-1, 1)
- URL of Anchor (-1, 1)
- Links in Tags (-1, 1)

## 2: Features from Source code
