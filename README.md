# Browser Extension for URL Phishing Detection

This repository contains the code for developing a browser extension that can be installed in web browsers to check whether the visited URLs are phishy or legitimate. The project is divided into 3 phases, each serving a specific purpose.

## Phase 1: Web Scraping and Resource Collection

In this phase, the code automates the extraction of legitimate and confirmed phishy URLs from the Phishtank database and archives. It utilizes web scraping techniques to collect the necessary data. The code also downloads web resources and complete websites using automation, recursion, and the pywebcopy library. Additionally, it checks the URLs against the VirusTotal API, which generates JSON files specifying whether the URL is malicious or legitimate, and also gives a detailed report of how many vendor classify the URLs as malicious.

## Phase 2: URL Classification Model Training

The second phase focuses on utilizing the collected resources to train a classification model using machine learning and deep learning techniques. The aim is to develop a robust model that can accurately classify URLs as legitimate or malicious. Various techniques and algorithms are employed to train the model using the collected data.

## Phase 3: Browser Extension Development

In the third and final phase, the code is dedicated to developing the browser extension itself. The extension incorporates the trained classification model and integrates the VirusTotal API. When a user enters a URL into their browser, the extension checks the URL using the classification model and the VirusTotal API. Based on the results, the extension notifies the user whether the URL is malicious or phishy.

## Repository Structure

The repository is organized as follows:

- `Phase-1`: Contains the code for web scraping, resource collection, and URL verification against the VirusTotal API.
- `Phase-2`: Includes the code for training the classification model using machine learning and deep learning techniques.
- `Phase-3`: Contains the code for developing the browser extension that incorporates the classification model and the VirusTotal API.

Feel free to explore each phase for detailed code implementation and documentation.

## Usage

To use this project, follow the steps below:

1. Clone the repository to your local machine.
2. Navigate to the desired phase folder.
3. Follow the instructions provided in the respective phase's README file to set up and run the code.

Please refer to the individual phase folders for more specific usage instructions and details.

## Contributing

COntributions are made by _Shahil Patel_ and _Shivam Tirmare_.

## License
