import { IsNotEmpty, IsUrl } from 'class-validator';

export class LinkDto {
  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  shortDescription: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;
}
