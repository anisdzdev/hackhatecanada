# Loads the JSON and returns one of the URLs to the spiders.
# Keeps track of which URLs have already been used.

import json 

with open('url-list-ca.json', 'r', encoding='utf8') as f:
    data = json.load(f)
    for url in data:
        setattr(url, 'isUsed', False)
    
    print(data)