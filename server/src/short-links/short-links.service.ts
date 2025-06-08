import { Injectable } from '@nestjs/common';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShortLinksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createShortLinkDto: CreateShortLinkDto) {
    let alias = createShortLinkDto.alias;

    if (!alias) {
      alias = await this.generateUniqueAlias();
    }

    return this.prismaService.shortLink.create({
      data: {
        originalUrl: createShortLinkDto.originalUrl,
        alias,
        expiresAt: createShortLinkDto.expiresAt,
      },
    });
  }

  async createClick(shortLinkId: number, ipAddress: string) {
    return this.prismaService.click.create({
      data: {
        shortLinkId,
        ipAddress,
      },
    });
  }

  findAll() {
    return this.prismaService.shortLink.findMany({
      select: {
        originalUrl: true,
        expiresAt: true,
        alias: true,
      },
    });
  }

  findByAliasForRedirect(alias: string) {
    const today = new Date();

    return this.prismaService.shortLink.findFirst({
      where: {
        alias,
        OR: [{ expiresAt: { gte: today } }, { expiresAt: null }],
      },
    });
  }

  getInfoByAlias(alias: string) {
    return this.prismaService.shortLink.findUnique({
      where: {
        alias,
      },
      select: {
        originalUrl: true,
        createdAt: true,
        _count: {
          select: { clicks: true },
        },
      },
    });
  }

  getAnalyticsByAlias(alias: string) {
    return this.prismaService.shortLink.findUnique({
      where: {
        alias,
      },
      select: {
        originalUrl: true,
        _count: {
          select: { clicks: true },
        },
        clicks: {
          orderBy: { clickedAt: 'desc' },
          take: 5,
          select: {
            ipAddress: true,
          },
        },
      },
    });
  }

  remove(alias: string) {
    return this.prismaService.shortLink.delete({
      where: {
        alias,
      },
    });
  }

  async generateUniqueAlias(length = 4) {
    let alias: string;
    let exists = true;

    while (exists) {
      alias = this.generateAlias(length);
      const found = await this.prismaService.shortLink.findUnique({
        where: { alias },
      });

      exists = !!found;
    }

    return alias;
  }

  generateAlias(length = 4): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let alias = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      alias += chars[randomIndex];
    }
    return alias;
  }
}
