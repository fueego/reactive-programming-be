import { IsNotEmpty } from 'class-validator';

export class FavoritesDto {
  @IsNotEmpty()
  linkId: string;
}
