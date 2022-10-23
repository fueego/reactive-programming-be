import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { LinkDto } from './link.dto';
import { LinkData, LinkService } from './link.service';
import { DeleteResult } from 'typeorm';
import { LinkEntity } from 'src/entities/link.entity';

@Controller('link')
export class LinkController {
  constructor(private linkSrvc: LinkService) {}

  @Get()
  getAll(): Promise<LinkData[]> {
    return this.linkSrvc.getAllLinks();
  }

  @Get(':id')
  async getSingle(@Param('id') id: string): Promise<LinkEntity> {
    if (!id) {
      throw new NotFoundException('Link "id" not found');
    }

    const link = await this.linkSrvc.getSingleLink(id);

    if (!link) {
      throw new NotFoundException('Link not found');
    }

    return link;
  }

  @Post()
  async create(@Body() body: LinkDto): Promise<LinkEntity> {
    return await this.linkSrvc.createLink(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return await this.linkSrvc.deleteLink(id);
  }
}
