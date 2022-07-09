import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  testIMDBRequest(): string {
    return 'Hello World!';
  }
}
