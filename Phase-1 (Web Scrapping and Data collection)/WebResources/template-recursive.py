from urllib.parse import urlparse
import requests
from bs4 import BeautifulSoup
import re
from urllib.parse import urljoin


def do_fnx(urls, recursive_count, new_co):

    co = 0 
    
    if len(urls) == 1 and recursive_count >= 1:

        if recursive_count == 2:
            return
        else:
            try:
                r = requests.get(urls[0], headers=headers)
                r.raise_for_status()  # Check for any HTTP request errors

                html_content = r.content
                soup = BeautifulSoup(html_content, 'html.parser')

                with open(f'myfile{new_co}.html', 'w', encoding='utf-8') as f:
                    f.write(soup.prettify())

                anchor_tags = soup.find_all('a')

                with open(f'a_tags_file{new_co}.txt', 'a', encoding='utf-8') as f1:

                    if(anchor_tags):
                      for a_tag in anchor_tags:
                        href = a_tag.get('href')

                       ## write some conditions to filter out the corrct hrefs!! 
                        if href:
                          f1.write(href + '\n')
                        else:
                          print('no further a tags')  

                script_tags = soup.find_all('script') 
                        
                with open(f'script_tags_file{new_co}.txt','a',encoding='utf-8') as f2:
                   for script_tag in script_tags:
                        script_content = script_tag.string

                        if script_content:
                            f2.write(script_content + '\n') 


                for css in soup.find_all("link"):
                  if css.attrs.get("href"):
                    css_url = urljoin(urls[0], css.attrs.get("href"))
                    with open(f'css_tags_files{new_co}.txt','a',encoding='utf-8') as f3:
                      f3.write(css_url+'\n')                           
                   


            except (requests.RequestException, IOError) as e:
                print(f"Failed to fetch content for {urls[0]}: {e}")  

    else:
        for url in urls:
            try:
                r = requests.get(url, headers=headers)
                r.raise_for_status()  # Check for any HTTP request errors

                html_content = r.content
                soup = BeautifulSoup(html_content, 'html.parser')

                with open(f'myfile{co}.html', 'w', encoding='utf-8') as f:
                    f.write(soup.prettify())

                anchor_tags = soup.find_all('a') 

                if anchor_tags:
                    for a_t in anchor_tags:
                        if a_t:
                            href = a_t.get('href')
                            if href and href[0] == '/':
                                domain = re.findall(r"://([^/]+)/?", url)[0]
                                href = domain + href
                                href = 'https://' + href
                                # Recursive call
                                recursive_count += 1
                                new_co += 1
                                do_fnx([href], recursive_count, new_co)
                                break
               
                    # third_anchor_url = anchor_tags[2].get('href')
                    # if third_anchor_url:
                    #     recursive_count += 1
                    #     new_co += 1
                    #     #recursive call 
                    #     do_fnx([third_anchor_url], recursive_count, new_co)
                    


                with open(f'a_tags_file{co}.txt', 'a', encoding='utf-8') as f1:
                    for a_tag in anchor_tags:
                        href = a_tag.get('href')
                        ## write some conditions to get the correct url 
                        if href:
                            f1.write(href + '\n')
                        else:
                          print('no page')    

                script_tags = soup.find_all('script')

                with open(f'script_tags_file{co}.txt', 'a', encoding='utf-8') as f2:
                    for script_tag in script_tags:
                        script_content = script_tag.string

                        if script_content:
                            f2.write(script_content + '\n')

                for css in soup.find_all("link"):
                  if css.attrs.get("href"):
                    css_url = urljoin(url, css.attrs.get("href"))
                    with open(f'css_tags_files{co}.txt','a',encoding='utf-8') as f3:
                      f3.write(css_url+'\n')                 

            except (requests.RequestException, IOError) as e:
                print(f"Failed to fetch content for {url}: {e}")

            # new_co += 1
            recursive_count=0 
            co+=1


if __name__ == "__main__":
  
   headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
    }

   urls = ['https://vh420.timeweb.ru/blocked/?ref=cv56123.tw1.ru', 'https://www.github.com', 'https://www.twitter.com','https://practice.geeksforgeeks.org/']

   new_co=200
   recursive_count=0 
   do_fnx(urls,recursive_count,new_co) 

