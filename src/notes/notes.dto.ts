import { IsNotEmpty } from 'class-validator';

export class NotesDto {
  @IsNotEmpty()
  notes: string;

  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  linkId: string;
}
