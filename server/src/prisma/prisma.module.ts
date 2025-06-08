import {
  Module,
  OnModuleInit,
  BeforeApplicationShutdown,
  Global,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule implements OnModuleInit, BeforeApplicationShutdown {
  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    await this.prismaService.$connect();
  }

  async beforeApplicationShutdown() {
    await this.prismaService.$disconnect();
  }
}
