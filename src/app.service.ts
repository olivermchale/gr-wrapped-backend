import { Injectable } from '@nestjs/common';
import { ScraperService } from './scraper/scraper.service';
import { load } from 'cheerio';

@Injectable()
export class AppService {
  baseUrl = 'https://www.goodreads.com/review/list/';
  params = '?per_page=30&shelf=read&view=table';
  //surely no one reads more than 210 books a year
  pages = [1, 2, 3, 4, 5, 6, 7];
  constructor(private scraperService: ScraperService) {}
  async scrapeGoodreadsProfile(url: string): Promise<string[]> {
    const profileIdStartIndex = url.indexOf('show/');
    const profileSlice = url.slice(profileIdStartIndex + 5, url.length);
    const titles = [];
    const promises = [];
    for (const pageNumber of this.pages) {
      const myTopBooksUrl = `${this.baseUrl}${profileSlice}${this.params}&page=${pageNumber}`;
      promises.push(this.scraperService.getBookData(myTopBooksUrl));
    }
    const bookDataArr = await Promise.all(promises);
    bookDataArr.forEach((bookData) => {
      const $ = load(bookData);
      const readBookTableBody = $('#booksBody');
      readBookTableBody.find('tr').each((i, trElement) => {
        if ($(trElement).find('.date_read_value').text().includes('2022')) {
          const rawText = $(trElement).find('td.title > div.value > a').text();
          const filtered = rawText.trim().replace(/\s\s+/g, ' ');
          titles.push(filtered);
        }
      });
    });
    return titles;
  }
}
