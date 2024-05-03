import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateLinkDTO } from './dto/create-link.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/create')
  createLink(@Body() payload: CreateLinkDTO) {
    return this.appService.createLink(payload);
  }

  @Get()
  findAllLinks() {
    return this.appService.getLinks();
  }
  @Get('/l/:id')
  redirectToTarget(@Param('id') id: string) {
    return this.appService.redirect(id);
  }

  @Put('/l/:id')
  modifyLink(@Param('id') id: string) {
    return this.appService.modifyLink(id);
  }
}
