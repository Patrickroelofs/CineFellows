import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { Controller, Get, Param } from '@nestjs/common';
import { NetflixService } from './services/netflix.service';
import { ApiProperty } from '@nestjs/swagger';

class Params {
  @ApiProperty()
  netflixName: string;
}

@Controller('netflix')
export class AppController {
  constructor(
    private readonly httpService: HttpService,
    private readonly netflixService: NetflixService,
  ) {}

  @Get(':netflixName')
  async getDataOnNetflixName(@Param() params: Params): Promise<any> {
    // Check if name exists in database
    const doesNameExist = await this.netflixService.uniqueNetflix({
      netflixName: params.netflixName,
    });

    // if it does not exist, get data from OMDB and save it to database
    if (!doesNameExist) {
      console.log("Name doesn't exist in database, adding it");

      const { Metascore, imdbRating, imdbVotes, imdbID, Type, Response } =
        await firstValueFrom(
          this.httpService
            .get(
              `http://www.omdbapi.com/?t=${params.netflixName}&i=tt3896198&apikey=${process.env.OMDB_API}`,
            )
            .pipe(map((res) => res.data)),
        );

      if (Response === 'False') {
        return 'Unable to find data in OMDB dataset.';
      }

      await this.netflixService.createNetflix({
        netflixName: params.netflixName,
        imdbId: imdbID,
        metaScore: Metascore,
        imdbRating: imdbRating,
        imdbVotes: imdbVotes,
        type: Type,
      });
    }

    return await this.netflixService.allNetflix({});
  }
}
