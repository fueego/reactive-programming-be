import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkEntity, NotesEntity } from 'src/entities';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
  imports: [TypeOrmModule.forFeature([NotesEntity, LinkEntity])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
