import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getUsers() {
    return this.appService.getUsers();
  }

  @Get('/:id')
  getOneUser(@Param('id') id: string) {
    console.log('id', id);

    return this.appService.getOneUser(id);
  }
}
