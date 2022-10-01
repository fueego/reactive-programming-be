import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { LinkDto } from './link.dto';
import { LinkService } from './link.service';
import { NotesService } from 'src/notes/notes.service';

export interface LinkData
  extends Pick<LinkDto, 'categoryId' | 'shortDescription' | 'url'> {
  linkId?: string;
}

@Controller('link')
export class LinkController {
  constructor(private linkSrvc: LinkService, private noteSrvc: NotesService) {}

  @Get()
  getAll(): LinkData[] {
    return this.linkSrvc.getAllLinks();
  }

  @Get(':id')
  getSingle(@Param('id') id: string): LinkData {
    if (!id) {
      throw new NotFoundException('Link "id" not found');
    }

    const link = this.linkSrvc.getSingleLink(id);

    if (!link) {
      throw new NotFoundException('Link not found');
    }

    return link;
  }

  @Post()
  create(@Body() body: LinkDto): LinkData {
    const linkData = this.linkSrvc.createLink(body);
    return linkData;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string): void {
    const linkToRemoveBoolean = this.linkSrvc.deleteLink(id);
    this.noteSrvc.removeNoteByLinkId(id);

    if (!linkToRemoveBoolean) {
      throw new NotFoundException('Link not found');
    }
  }
}
