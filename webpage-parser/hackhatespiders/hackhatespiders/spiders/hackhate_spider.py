import scrapy

class HackHateSpider(scrapy.Spider):
    name = "hackhate"
    start_urls = []

    def parse(self, response):
        print(response)