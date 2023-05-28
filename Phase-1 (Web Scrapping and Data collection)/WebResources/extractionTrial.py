from selenium import webdriver

# Create a new instance of the Chrome web driver
driver = webdriver.Chrome()

# Navigate to the URL
driver.get("https://wonderful-licorice-edcaea.netlify.app/")

# Get the HTML source code
html_source = driver.page_source

# Save the HTML source code to a local file
with open("wonderful-licorice-edcaea.netlify.app.html", "w") as f:
    f.write(html_source)

# Close the web driver
driver.close()