import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity, LinkEntity } from 'src/entities';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';

@Module({
  imports: [TypeOrmModule.forFeature([LinkEntity, CategoryEntity])],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
