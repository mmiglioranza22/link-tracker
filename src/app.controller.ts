import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateLinkDTO } from './dto/create-link.dto';
import { LinkStatsDTO } from './dto/link-stats.dto';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Post('/create')
  createLink(@Body() payload: CreateLinkDTO) {
    return this.appService.createLink(payload);
  }

  @Get('/l/:id/stats')
  findLinkStats(@Param('id') id: string): LinkStatsDTO {
    return this.appService.getStats(id);
  }

  @Get('/l/:id')
  @Redirect('', 301)
  async redirectToTarget(@Param('id') id: string) {
    try {
      const isExpired = this.appService._checkExpireDate(id);
      if (isExpired) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Expired link',
          },
          HttpStatus.NOT_FOUND,
          {
            cause: 'Expired',
          },
        );
      }
      const redirectUrl = this.appService.redirect(id);
      const response = await this.httpService.axiosRef.get(redirectUrl);
      if (response.status >= 200 && response.status < 400) {
        this.appService.modifyLinkStats(id);
        return { url: redirectUrl };
      }
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Invalid target link',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: 'Invalid target link',
        },
      );
    }
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
