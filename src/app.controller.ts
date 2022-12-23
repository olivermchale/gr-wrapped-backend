import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async ScrapeUrl(@Body() body): Promise<string[]> {
    const profileUrl = body.profileUrl;
    const books = await this.appService.scrapeGoodreadsProfile(profileUrl);
    if (books.length === 0) {
      throw new Error('Failed to load goodreads data');
    }
    return books;
  }
}
