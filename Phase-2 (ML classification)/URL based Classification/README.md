# Extracting URL-based features

This code reads the PhishID and URL columns from the excel files (Legitimate+Phishy) maintained is **DatasetPreparation** directory, an check for the status code of the URL, if not 0, then proceed.

## 1: Features from URLs
- URL Length
- Having IP Address (-1, 1)
- Shortening Service (-1, 1)
- Having *@* symbol (-1, 1)
- Double Slash Redirecting (-1, 1)
- Prefix/Suffix (-1, 1)
- Standard Port
- CTLD
- HTTPS in Domain
- Sensitive Words (-1, 1)
- Has Tilde
- Has Port

## 2: Output
The Code will create a *.csv* file containing the URL-based features, 2 separate files will be created each for Legitimate and Phishy URLs.

The *csv* files have to be merged to training the model.