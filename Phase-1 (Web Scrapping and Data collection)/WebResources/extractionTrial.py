import os
import requests
from selenium import webdriver

# set the URL of the webpage to download
url = "https://facebook.com"

# set the path to the Chrome driver executable (for ubuntu)
chromedriver_path = "/home/administrator/Downloads/chromedriver_linux64/chromedriver"

# create a new Chrome browser instance
options = webdriver.ChromeOptions()
options.add_argument("--headless")
browser = webdriver.Chrome(executable_path=chromedriver_path, options=options)

# navigate to the URL
browser.get(url)

# get the source page of the current
source = browser.page_source
with open("source.html", "w") as f:
    f.write(source)

# get the URLs of all the JS scripts on the page
js_urls = []
for script in browser.find_elements_by_tag_name("script"):
    src = script.get_attribute("src")
    if src:
        js_urls.append(src)

# download each JS script
for js_url in js_urls:
    response = requests.get(js_url)
    filename = os.path.basename(js_url)
    with open(filename, "wb") as f:
        f.write(response.content)

# get the URLs of all the CSS files on the page
css_urls = []
for link in browser.find_elements_by_tag_name("link"):
    rel = link.get_attribute("rel")
    if rel == "stylesheet":
        href = link.get_attribute("href")
        css_urls.append(href)

# download each CSS file
for css_url in css_urls:
    response = requests.get(css_url)
    filename = os.path.basename(css_url)
    with open(filename, "wb") as f:
        f.write(response.content)

# close the browser
browser.quit()