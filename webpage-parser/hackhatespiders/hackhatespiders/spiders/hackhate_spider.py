from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

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

        return item