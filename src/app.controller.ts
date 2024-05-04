import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateLinkDTO } from './dto/create-link.dto';
import { LinkStatsDTO } from './dto/link-stats.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/create')
  createLink(@Body() payload: CreateLinkDTO) {
    return this.appService.createLink(payload);
  }

  @Get('/l/:id/stats')
  findLinkStats(@Param('id') id: string): LinkStatsDTO {
    return this.appService.getStats(id);
  }

  @Get('/l/:id')
  @Redirect('', 301) //permenant
  redirectToTarget(@Param('id') id: string) {
    const redirectUrl = this.appService.redirect(id);
    return { url: redirectUrl };
  }

  @Put('/l/:id')
  modifyLink(@Param('id') id: string) {
    return this.appService.modifyLink(id);
  }

  @Get()
  findAllLinks() {
    return this.appService.getLinks();
  }
}
