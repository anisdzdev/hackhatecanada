# Loads the JSON and returns one of the URLs to the spiders.
# Keeps track of which URLs have already been used.

import json 

filename = 'url-list-ca.json'

def get_new_url(trackChanges=True):
    '''
    Fetches a new url from the list to be consumed by the spiders.

    Parameters:
    trackChanges (boolean): Determines whether we want to set the 'isUsed' parameter of the URL to true when we use it, True by default.
    '''
    with open(filename, 'r+', encoding='utf8') as f:
        data = json.load(f)
        
        for index, row in enumerate(data):
            if row['isUsed'] == False:
                returnedUrl = row['url']
                data[index]['isUsed'] = True
                print(data[index]['isUsed'])
                break

        if trackChanges:
            f.seek(0)
            json.dump(data, f, indent=4)
            f.truncate()
        
    return returnedUrl

get_new_url(True)