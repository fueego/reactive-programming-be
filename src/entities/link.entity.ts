import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from '.';

@Entity()
export class LinkEntity {
  @PrimaryGeneratedColumn('uuid')
  linkId: string;

  @Column()
  shortDescription: string;

  @Column()
  url: string;

  @ManyToOne(
    () => CategoryEntity,
    (categoryEntity) => categoryEntity.linkEntity,
    {
      onDelete: 'CASCADE',
    },
  )
  categoryEntity: CategoryEntity;
}
