import scrapy
import json

class HackHateSpider(scrapy.Spider):
    name = "hackhate"
    num_urls = 10
    
    def __init__(self, num_urls=10):
        self.num_urls = num_urls

    def start_requests(self):
        with open('test.json', 'r+', encoding='utf8') as f:
            data = json.load(f)
            counter = 0
            for index, row in enumerate(data):
                if row['isUsed'] == False:
                    returnedUrl = row['url']
                    data[index]['isUsed'] = True
                    ++counter
                    
                    if counter == self.num_urls:
                        f.seek(0)
                        json.dump(data, f, indent=4)
                        f.truncate()
                        break
                    yield scrapy.Request(returnedUrl, callback=self.parse)

    def parse(self, response):
        print(response)