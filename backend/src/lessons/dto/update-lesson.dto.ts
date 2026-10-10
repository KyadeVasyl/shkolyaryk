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
import { TIME_PATTERN } from './create-lesson.dto.js';

export class UpdateLessonDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(7)
  dayOfWeek?: number;

  @IsOptional()
  @Matches(TIME_PATTERN)
  startTime?: string;

  @IsOptional()
  @Matches(TIME_PATTERN)
  endTime?: string;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  subject?: string;

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
