import requests
from bs4 import BeautifulSoup 
from urllib.parse import urlparse 
import pandas as pd

# lists to store the data
list_request = []
list_anchor = []

headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
} 

def processing_on_links(url):

    image_list = []
    video_list = []
    audio_list = []

    try:
        
        # replace the below code with the code to extract features from the saved content files
        response = requests.get(url, headers=headers)
        response.raise_for_status() 
        soup = BeautifulSoup(response.content, 'html.parser') 
        img_tags = soup.find_all('img') 

        for tag in img_tags:
            src = tag.get('src')
            if src:
                image_list.append(src) 

        video_tags = soup.find_all('video')  # Find all <video> tags 

        for tag in video_tags:
            src = tag.get('src')
            if src:
                video_list.append(src)
                
        audio_tags = soup.find_all('audio')  # Find all <audio> tags 

        for tag in audio_tags:
            src = tag.get('src')
            if src:
                audio_list.append(src) 

        total_length = len(image_list) + len(video_list) + len(audio_list) 

        if(total_length == 0):
            total_length = 1 
            # in original code return 0 from here

        parsed_url = urlparse(url)
        domain = parsed_url.netloc 

        domain_without_extra = domain.replace("www.","")
        domain_without_extra = domain_without_extra.replace(".com","") 

        count_outer_domain = 0 

        for link in image_list:

            if (domain not in link) and (domain_without_extra not in link):
                count_outer_domain += 1 

        for link in video_list:

            if domain not in link and (domain_without_extra not in link):
                count_outer_domain += 1 

        for link in audio_list:
            
            if domain not in link and (domain_without_extra not in link):
                count_outer_domain += 1                

        ##check validity 
        percentage = (count_outer_domain/total_length)*(100)

        if(percentage<22):
            return 1    

        elif(percentage>=22 and percentage<61):
            return 0
        
        else:
            return -1    

    except requests.exceptions.RequestException as e:
        print(f"Error fetching the URL: {e}")
        return 0
    
def urlAnchor(url):
    try:
        
        # replace the below code with the code to extract features from the saved content files
        response = requests.get(url , headers = headers)
        response.raise_for_status() 
        soup = BeautifulSoup(response.content, 'html.parser')  

        a_tags = soup.find_all('a') 
        a_href = []

        for link in a_tags:
            href = link.get('href')
            if(href):
                a_href.append(href) 

        # processing_on_links(a_href)

        total_length= len(a_href)

        if(total_length == 0):
            total_length = 1 

        parsed_url = urlparse(url)
        domain = parsed_url.netloc 
        # print("the domain is: ",domain) 

        domain_without_extra = domain.replace("www.","")
        domain_without_extra = domain_without_extra.replace(".com","") 
        # print("removing extra:-",domain_without_extra)  

        count_outer_domain = 0

        for href in a_href:

            if(domain_without_extra not in href):
                count_outer_domain += 1  

            if(href == "#" or href == "#content" or href == "#skip" or href == "JavaScript ::void(0)"):
                count_outer_domain += 1 

        percentage = (count_outer_domain/total_length)*100 
        
        # print(percentage)
        if(percentage<31):
            return 1
          
        elif(percentage>=31 and percentage<=67):
            return 0    
        
        else:
            return 1         

    except requests.exceptions.RequestException as e:
        print(f"Error fetching the URL: {e}")    

def beginProcess(url):

    # 0: Append the url also in the csv file
    # list_url.append(url)

    # 1: Request the url
    requestURL = int(processing_on_links(url))
    list_request.append(requestURL)

    # 2: URL of anchor
    URL_anchor = int(urlAnchor(url))
    list_anchor.append(URL_anchor)


def generateCSV():

    data = {
        # 'URL': list_url,
        'URL Request': list_request,
        'URL Anchor': list_anchor,
    }

    # Create a DataFrame from the dictionary
    df = pd.DataFrame(data)

    # Write the Phishy DataFrame to a Phishy-Data CSV file
    # df.to_csv('Phishy-Data.csv', index=False)

    # Write the Legitimate DataFrame to a Legitimate-Data CSV file
    df.to_csv('Legitimate-Data.csv', index=False)

if __name__ == '__main__':
    
    # Replace 'your_file_path.xlsx' with the actual path to your Excel file
    ExcelFilePath = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Legitimate-Data.xlsx'
    
    # ExcelFilePath = '/home/administrator/Desktop/Phishing-Verification/Phase-1 (Web Scrapping and Data collection)/DatasetPreparation/Phishy-Data.xlsx'

    # Read the Excel file into a pandas DataFrame
    df = pd.read_excel(ExcelFilePath) 

    set_of_urls = set()

    count = 0
    # Iterate through the DataFrame and print URLs for rows with 'Status Code' equal to 200
    for index, row in df.iterrows():
        url = row['URL']

        if url not in set_of_urls:
            set_of_urls.add(url)
            if row['Status Code'] == 200:

                # For cross-checking
                with open("urls_in_excel.txt","a") as f:
                    f.write(row['URL'] + "\n") 
                    f.write(f"{count}"+"\n")
                    f.write("--------------------------------------"+"\n")

                print(count)
                count+=1
                if count==10:
                    break
                else:
                    beginProcess(row['URL'])

    generateCSV()        