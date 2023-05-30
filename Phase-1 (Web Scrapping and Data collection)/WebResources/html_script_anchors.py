from urllib.parse import urlparse
import requests
from bs4 import BeautifulSoup
import re

# Set User-Agent header to simulate a browser request
headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
}

# URLs to fetch and save HTML content
urls = ['https://wimoox-94.webselfsite.net/transcash_check', 'https://www.youtube.com', 'https://www.twitter.com', 'https://soldeverification.com/auth.html','https://urlz.fr/m2ZX']

# Fetch and save HTML content for each URL
co = 0
for url in urls:
    try:
        r = requests.get(url, headers=headers)
        r.raise_for_status()  # Check for any HTTP request errors

        html_content = r.content
        soup = BeautifulSoup(html_content, 'html.parser')

        with open(f'myfile{co}.html', 'w', encoding='utf-8') as f:
            f.write(soup.prettify())

        anchor_tags = soup.find_all('a')

        with open(f'a_tags_file{co}.txt', 'a', encoding='utf-8') as f1:
            for a_tag in anchor_tags:
                href = a_tag.get('href')

                if href:
                    f1.write(href + '\n')

        script_tags = soup.find_all('script')

        with open(f'script_tags_file{co}.txt', 'a', encoding='utf-8') as f2:
            for script_tag in script_tags:
                script_content = script_tag.string

                if script_content:
                    f2.write(script_content + '\n')

    except (requests.RequestException, IOError) as e:
        print(f"Failed to fetch content for {url}: {e}")

    co += 1

