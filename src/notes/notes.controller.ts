import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { NotesDto } from './notes.dto';
import { Notes, NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private noteSrvc: NotesService) {}

  @Get(':id')
  getNote(@Param('id') id: string): Notes {
    return this.noteSrvc.findNote(id);
  }

  @Post()
  addNote(@Body() payload: NotesDto): Notes {
    const newNote = this.noteSrvc.addNote(payload);
    return newNote;
  }

  @Delete(':id')
  @HttpCode(204)
  removeNote(@Param('id') id: string): void {
    this.noteSrvc.removeNote(id);
  }
}
