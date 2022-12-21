import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async ScrapeUrl(@Body() body): Promise<string[]> {
    const profileUrl = body.profileUrl;
    return await this.appService.scrapeGoodreadsProfile(profileUrl);
  }
}
