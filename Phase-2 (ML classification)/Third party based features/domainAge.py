from urllib.parse import urlparse
import whois

input_website = "https://www.instagram.com"
parsedURL = urlparse(input_website)
domain = parsedURL.netloc
whoisInstance = whois.whois(domain)
print(whoisInstance)