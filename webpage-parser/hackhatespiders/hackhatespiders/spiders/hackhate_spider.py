import scrapy
from hackhatespiders.url_picker import get_new_url

class HackHateSpider(scrapy.Spider):
    name = "hackhate"
    start_urls = get_new_url(False)

    def parse(self, response):
        print(response)