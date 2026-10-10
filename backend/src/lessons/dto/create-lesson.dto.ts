import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

export class CreateLessonDto {
  @IsInt()
  @Min(1)
  @Max(7)
  dayOfWeek!: number;

  @Matches(TIME_PATTERN)
  startTime!: string;

  @Matches(TIME_PATTERN)
  endTime!: string;

  @IsString()
  @Length(1, 200)
  subject!: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  teacher?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  location?: string | null;

  @IsOptional()
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  @MaxLength(500)
  link?: string | null;

  @IsOptional()
  @IsIn(['ALL', 'ODD', 'EVEN'])
  weekType?: 'ALL' | 'ODD' | 'EVEN';

  @IsOptional()
  @IsIn(['ALL', 'ONE', 'TWO'])
  subgroup?: 'ALL' | 'ONE' | 'TWO';

  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string | null;
}
