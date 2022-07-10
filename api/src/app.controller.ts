import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('netflix')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('movie/:netflixName')
  testIMDBRequest(@Param() params): any {
    return this.appService.testIMDBRequest(params.netflixName);
  }
}
