import { IsString } from 'class-validator';

export class FilterProductDto {
  @IsString()
  searchQuery: string;
  @IsString()
  category: string;
}
