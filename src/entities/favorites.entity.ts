import { OneToOne, Entity, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { LinkEntity } from './link.entity';

@Entity()
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  favoriteId: string;

  @OneToOne(() => LinkEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  link: LinkEntity;
}
