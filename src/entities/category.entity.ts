import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LinkEntity } from '.';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  categoryId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  color: string;

  @OneToMany(() => LinkEntity, (linkEntity) => linkEntity.categoryEntity, {
    cascade: true,
  })
  linkEntity: LinkEntity[];
}
