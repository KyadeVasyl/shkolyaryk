import { IsString, Length } from 'class-validator';

export class UpdateGroupDto {
  @IsString()
  @Length(1, 100)
  name!: string;
}
