from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
import requests

api_url = 'http://localhost:5000/ai/analyse'

class MySpider(CrawlSpider):
    name = 'hackhate'
    start_urls = ['https://barenakedislam.com/']

    rules = (
        Rule(LinkExtractor(), callback='parse_item', follow=True),
    )

    def parse_item(self, response):
        # For every page, grab its url.
        item = dict()
        item['url'] = response.url

        # Send request to API.
        requests.post(api_url, json=item)

        return item