import {
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';
import { LinkEntity } from './link.entity';

@Entity()
export class NotesEntity {
  @PrimaryGeneratedColumn('uuid')
  notesId: string;

  @Column()
  notes: string;

  @OneToOne(() => LinkEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  link: LinkEntity;
}
