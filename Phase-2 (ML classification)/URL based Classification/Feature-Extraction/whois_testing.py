import tld
from tld import whois

class Domain:
    def __init__(self, input_website):
        self.input_website = input_website
    
    def get_domain_information(self):
        try:
            domain = tld.get_tld(self.input_website)
            whois_info = whois.get_whois(domain)
            return whois_info
        except Exception as e:
            return str(e)


input_website = ['https://www.google.com', 'https://www.facebook.com','https://www.twitter.com','https://www.github.com', 'https://www.linkedin.com', 'https://www.amazon.com', 'https://www.youtube.com', 'https://www.microsoft.com', 'https://www.instagram.com', 'https://www.netflix.com']

for website in input_website:
    domain = Domain(website)
    print(domain.get_domain_information())