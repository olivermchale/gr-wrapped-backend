import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class ScraperService {
  httpClient: AxiosInstance = axios.create();
  async getBookData(profileUrl: string) {
    const response = await this.httpClient.get(profileUrl);
    if (response.status !== 200) {
      throw new Error(
        `Unable to scrape goodreads for profile URL: ${profileUrl}`,
      );
    }

    if (response.data === undefined || response.data === null) {
      throw new Error(`No data available for profile URL: ${profileUrl}`);
    }

    return response.data;
  }
}
