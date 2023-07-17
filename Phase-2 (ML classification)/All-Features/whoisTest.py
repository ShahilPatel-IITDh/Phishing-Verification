from urllib.parse import urlparse
import whois


# class Domain:
#     def __init__(self, input_website):
#         self.input_website = input_website

#     def get_domain_info(self):
#         domain_info = whois.whois(self.input_website)
#         print(domain_info)


input_website = "https://www.instagram.com"
parsedURL = urlparse(input_website)
domain = parsedURL.netloc
whoisInstance = whois.whois(domain)
print(whoisInstance)