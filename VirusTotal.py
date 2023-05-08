import requests 
import time 
import json 
import csv

# url_phishtank = "https://phishtank.org/"
# r = requests.get(url_phishtank)
# html = r.content
# soup = BeautifulSoup(html,'html.parser')

links = []
filename ="url_dataset.csv"
count_files = 0 

# Read the URLs from the CSV file
with open(filename, 'r') as c:
    csvread = csv.reader(c) 
    for lines in csvread:
        count_files += 1
        links.append(lines[0])
        if(count_files > 19):#only take 20 links in the links from thw given filename 
            break
        else:
            pass
        
print(links)

api_key = 'a86f0d04435957a63eb4bf78268c485af2f61af95c70c014a8593ed10609e0b4'

url_needed = 'https://www.virustotal.com/vtapi/v2/url/report'

json_files = [] 
#'json_d1.json', 'json_d2.json', 'json_d3.json', 'json_d4.json', 'json_d5.json', 'json_d6.json', 'json_d7.json', 'json_d8.json', 'json_d9.json', 'json_d10.json','json_d11.json' 

for index in range(1,21):#make the json file names 
    json_files.append(f'json_d{index}.json') 

print(json_files)

################################ if I take only 20 requests per day ##########################

iterations=0#gives the number of urls that we scan through
threshold=1#threshold tells the number of positives above which url is considered malicious

for site in links:

    if(iterations<20):
        paras = {
        'apikey' : api_key,
        'resource' : site
    }
        respo = requests.get(url_needed, params=paras)
        try:
            respo_json = json.loads(respo.content)
        # s='json_files.json' 
        # with open(s+co,'w') as j1:
        #     json.dump(respo_json, j1, indent=4) 
        except:
            print("Error: Failed to decode JSON response")
            continue  # Skip this URL and move on to the next one

        if(respo_json['positives'] >=threshold):

            with open('final_url_list_results.txt', 'a') as f:
                f.write(site + "\t malicious!" + '\n') 
                print("the number of vendors thinking it was malicious are:-", respo_json['positives']) 

            with open(json_files[iterations], 'w') as j:
                json.dump(respo_json, j, indent=4)


        elif(respo_json['positives'] <= 0):

            with open('final_url_list_results.txt', 'a') as f:
                f.write(site + "\tNot malicious!" + '\n') 
                print("the number of vendors thinking it was malicious are:-", respo_json['positives'])  

            with open(json_files[iterations], 'w') as j:
                json.dump(respo_json, j, indent=4)    


        else:
            print('no such url found')        
        
   
        time.sleep(20) 
        iterations+=1 
    #say if only 20 requests per day then we change it to 499!
    elif(iterations>=20):
        break    
       
