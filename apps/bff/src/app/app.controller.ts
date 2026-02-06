import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ReponseDTO } from '@common/interfaces/gateway/response.interface';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    const result = this.appService.getData();
    return new ReponseDTO({ data: result });
  }
}
