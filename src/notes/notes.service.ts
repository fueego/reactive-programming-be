import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { NotesDto } from './notes.dto';

export interface Notes extends Pick<NotesDto, 'notes'> {
  noteId?: string;
  categoryId: string;
  linkId: string;
}

@Injectable()
export class NotesService {
  private notes: Notes[] = [];

  addNote(note: Notes): Notes {
    const noteId = uuid();
    const newNote = {
      ...note,
      noteId,
    };
    this.notes.push(newNote);

    return newNote;
  }

  findNote(linkId: string): Notes | undefined {
    return this.notes.find((note) => note.linkId === linkId);
  }

  removeNote(noteId: string): void {
    this.notes = this.notes.filter((note) => note.noteId !== noteId);
  }

  removeNoteByLinkId(linkId: string): void {
    this.notes = this.notes.filter((note) => note.linkId !== linkId);
  }

  removeNoteByCategoryId(catId: string): void {
    this.notes = this.notes.filter((note) => note.categoryId !== catId);
  }
}
