import { Controller, Get, Param } from '@nestjs/common';
import { NetflixService } from './services/netflix.service';
import { Netflix as NetflixModel } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

class Params {
  @ApiProperty()
  netflixName: string;
}

@Controller('netflix')
export class AppController {
  constructor(private readonly netflixService: NetflixService) {}

  @Get(':netflixName')
  getDataOnNetflixName(@Param() params: Params): any {
    // TODO: see if name exists in database
    // TODO: if exists return full list
    // TODO: if not, save data to database
    // TODO: return full list
    return 'Hello World...' + params.netflixName;
  }
}
