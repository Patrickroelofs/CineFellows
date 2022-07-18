import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { NetflixService } from './services/netflix.service';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [PrismaService, NetflixService],
})
export class AppModule {}
