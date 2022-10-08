import { IsNotEmpty } from 'class-validator';

export class NotesDto {
  @IsNotEmpty()
  notes: string;

  @IsNotEmpty()
  linkId: string;
}
