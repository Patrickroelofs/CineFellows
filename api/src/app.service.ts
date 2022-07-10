import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async testIMDBRequest(netflixName): Promise<any> {
    const TMDBSearchResponse = await firstValueFrom(
      this.httpService
        .get(
          `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API}&query=${netflixName}&page=1`,
        )
        .pipe(map((res) => res.data)),
    );

    //return TMDBSearchResponse;

    const TMDBResultResponse = await firstValueFrom(
      this.httpService
        .get(
          `https://api.themoviedb.org/3/movie/${TMDBSearchResponse.results[0].id}?api_key=${process.env.TMDB_API}`,
        )
        .pipe(map((res) => res.data)),
    );

    //return TMDBResultResponse;

    const response = await firstValueFrom(
      this.httpService
        .get(`https://www.imdb.com/title/${TMDBResultResponse.imdb_id}/`)
        .pipe(map((res) => res.data)),
    );

    const match = response.match(/"ratingValue":(\d.\d)/);

    return {
      imdbScore: match[1],
    };
  }
}
