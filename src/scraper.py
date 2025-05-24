import requests
from bs4 import BeautifulSoup
import gzip
from io import BytesIO
import os
from urllib.parse import urlparse
import re
# import nltk
# from nltk.tokenize import word_tokenize
# from nltk.corpus import stopwords

main_url = ['https://repairpal.com/sitemap_symptoms.xml.gz']

def crawl(url):

    # Get the file
    response = requests.get(url)

    # Error checking
    if response.status_code != 200:
        print(f"Failed to fetch: {url}")
        return 

    soup = BeautifulSoup(response.content, features ='lxml-xml')
    
    #Get the urls of in the 
    urls = [loc.text for loc in soup.find_all('loc')]

    return urls

def scrape_one_file(url, filename):

    # Get the file
    response = requests.get(url)

    # Error checking
    if response.status_code != 200:
        print(f"Failed to fetch: {url}")
        return 

    soup = BeautifulSoup(response.content, 'html.parser')

    target_tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul']
    elements = soup.find_all(target_tags)

    with open(filename, 'w', encoding = 'utf-8') as f:
        for p in elements:
            # print(p)
            f.write(str(p.get_text()) + "\n")


    
current_directory = os.getcwd()

for big_url in main_url:
    print(big_url[8:])
    urls = crawl(big_url)
    dir_name = os.path.join(current_directory, str(big_url[8:-24]))

    if not os.path.exists(dir_name):
        os.makedirs(dir_name)

    for u in urls: 
        # print(u.replace("https://repairpal.com/", ""))
        path = u.replace("https://repairpal.com/", "")
        path = re.sub(r'[^A-Za-z0-9_\-\.]', '_', path)
        filename = os.path.join(dir_name, path + ".txt" )
        print(filename)
        scrape_one_file(u, filename)

    
    
    
# print(urls[1])
# scrape_one_file(urls[1])



# def scrape_and_get_info(url):
#     response = requests.get(url)
#     response.raise_for_status()

#     html_content = response.content

#     soup = BeautifulSoup(html_content, 'html.parser')

# def get_link(url):

