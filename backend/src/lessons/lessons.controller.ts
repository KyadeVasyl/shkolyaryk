import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EditTokenGuard } from '../common/guards/edit-token.guard.js';
import type { GroupRequest } from '../common/guards/edit-token.guard.js';
import { CreateLessonDto } from './dto/create-lesson.dto.js';
import { UpdateLessonDto } from './dto/update-lesson.dto.js';
import { LessonsService } from './lessons.service.js';

@Controller('groups/:viewToken/lessons')
@UseGuards(EditTokenGuard)
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  create(@Req() req: GroupRequest, @Body() dto: CreateLessonDto) {
    return this.lessonsService.create(req.group.id, dto);
  }

  @Patch(':id')
  update(
    @Req() req: GroupRequest,
    @Param('id') id: string,
    @Body() dto: UpdateLessonDto,
  ) {
    return this.lessonsService.update(req.group.id, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: GroupRequest, @Param('id') id: string) {
    return this.lessonsService.remove(req.group.id, id);
  }
}
