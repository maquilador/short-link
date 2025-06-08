import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShortLinksModule } from './short-links/short-links.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ShortLinksModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
