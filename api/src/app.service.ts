import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async testIMDBRequest(): Promise<any> {
    const response = await firstValueFrom(
      this.httpService
        .get('https://www.imdb.com/title/tt0111161/')
        .pipe(map((res) => res.data)),
    );

    const match = response.match(/"ratingValue":(\d.\d)/);

    return {
      imdbScore: match[1],
    };
  }
}
