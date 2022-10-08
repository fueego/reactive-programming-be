import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkEntity, NotesEntity } from 'src/entities';
import { DeleteResult, Repository } from 'typeorm';
import { NotesDto } from './notes.dto';

export interface NotesData extends Pick<NotesEntity, 'notesId' | 'notes'> {
  linkId: string;
}

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NotesEntity) private repoNotes: Repository<NotesEntity>,
    @InjectRepository(LinkEntity) private repoLink: Repository<LinkEntity>,
  ) {}

  async addNote(note: NotesDto): Promise<NotesData> {
    const link = await this.repoLink.findOneBy({ linkId: note.linkId });
    if (!link) {
      throw new HttpException('Link not found', HttpStatus.NOT_FOUND);
    }

    const createNote = this.repoNotes.create({ notes: note.notes, link: link });
    const notes = await this.repoNotes.save(createNote);

    return {
      notesId: notes.notesId,
      notes: notes.notes,
      linkId: link.linkId,
    };
  }

  async findNote(linkId: string): Promise<NotesData> {
    const note = await this.repoNotes.findOne({
      relations: ['link'],
      where: {
        link: { linkId },
      },
    });

    if (!note) {
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
    }

    return {
      notesId: note.notesId,
      notes: note.notes,
      linkId: note.link.linkId,
    };
  }

  async removeNote(notesId: string): Promise<DeleteResult> {
    const result = await this.repoNotes.delete({ notesId });

    if (result.affected < 1) {
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
