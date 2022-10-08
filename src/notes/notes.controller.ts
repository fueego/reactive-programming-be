import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NotesEntity } from 'src/entities';
import { DeleteResult } from 'typeorm';
import { NotesDto } from './notes.dto';
import { NotesData, NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private noteSrvc: NotesService) {}

  @Get(':id')
  async getNote(@Param('id') linkId: string): Promise<NotesData> {
    return this.noteSrvc.findNote(linkId);
  }

  @Post()
  async addNote(@Body() payload: NotesDto): Promise<NotesData> {
    return this.noteSrvc.addNote(payload);
  }

  @Delete(':id')
  async removeNote(@Param('id') id: string): Promise<DeleteResult> {
    return this.noteSrvc.removeNote(id);
  }
}
