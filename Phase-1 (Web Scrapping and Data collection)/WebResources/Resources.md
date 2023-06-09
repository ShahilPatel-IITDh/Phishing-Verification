The web resources of websites can be extracted manually using a browser extension named: _*Save all Resources*_ (https://chrome.google.com/webstore/detail/save-all-resources/abpdnfjocnmdomablahdcfnoggeeiedb?hl=en)

Later the HTML code will be used to extract the number of internal and external links in the website. The links will be test against the Virus Total using it's API.

The following resources are extracted from the website:
- HTML
- CSS
- JS
- Images
- Fonts
- Media
- Documents
- Other

The files _*FullSource-extracted.py*__ saves HTML file, the links for CSS, and a .txt file containing the anchor tags. The file doesn't use any inbuilt libraries for these web-resources extraction. It simply uses Selenium and Beautiful-Soup for these purpose.

The *pywebpage.py*, *pywebsite.py* uses __*pywebcopy*__ library which downloads the web-resources for the landing page and complete website respectively. The library is very easy to use and can be used to download the complete website with just one line of code.

The _*recursiveExtraction*_ uses recursion to download the complete website. The code goes till 1 depth level into the landing page. It basically scraps the URLs present on the landing page and then downloads the web-resources for each of the URL. The code is not very efficient and can be improved. The template for recursion code is available in the file _*recursiveExtraction.py*_.