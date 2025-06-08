import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Res,
  Req,
  UsePipes,
} from '@nestjs/common';
import { ShortLinksService } from './short-links.service';
import {
  CreateShortLinkDto,
  CreateShortLinkSchema,
} from './dto/create-short-link.dto';
import { ApiBody } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller()
export class ShortLinksController {
  constructor(private readonly shortLinksService: ShortLinksService) {}

  @Post('/shorten')
  @UsePipes(new ZodValidationPipe(CreateShortLinkSchema))
  @ApiBody({ type: CreateShortLinkDto })
  create(@Body() createShortLinkDto: CreateShortLinkDto) {
    return this.shortLinksService.create(createShortLinkDto);
  }

  @Get()
  findAll() {
    return this.shortLinksService.findAll();
  }

  @Get('/:alias')
  async redirect(
    @Param('alias') alias: string,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    const link = await this.shortLinksService.findByAliasForRedirect(alias);

    if (!link) {
      throw new NotFoundException('Short link not found');
    }

    const ipAddress =
      request.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
      request.socket.remoteAddress;

    this.shortLinksService.createClick(link.id, ipAddress);

    return res.redirect(link.originalUrl);
  }

  @Get('/info/:alias')
  async getInfo(@Param('alias') alias: string) {
    const { originalUrl, createdAt, ...info } =
      await this.shortLinksService.getInfoByAlias(alias);

    const formattedInfo = {
      originalUrl,
      createdAt,
      clickCount: info._count.clicks,
    };

    return formattedInfo;
  }

  @Get('/analytics/:alias')
  async getAnalytics(@Param('alias') alias: string, @Res() res: Response) {
    const info = await this.shortLinksService.getAnalyticsByAlias(alias);

    const formattedAnalytics = {
      originalUrl: info.originalUrl,
      clickCount: info._count.clicks,
      lastIps: info.clicks.map((item) => item.ipAddress),
    };

    return formattedAnalytics;
  }

  @Delete('/delete/:alias')
  remove(@Param('alias') alias: string) {
    return this.shortLinksService.remove(alias);
  }
}
