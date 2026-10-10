import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateLessonDto } from './dto/create-lesson.dto.js';
import { UpdateLessonDto } from './dto/update-lesson.dto.js';

const MAX_LESSONS_PER_GROUP = 50;

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) {}

  private assertTimes(start: string, end: string) {
    if (start >= end) {
      throw new BadRequestException('endTime must be later than startTime');
    }
  }

  private touchGroup(groupId: string) {
    return this.prisma.group.update({
      where: { id: groupId },
      data: { scheduleUpdatedAt: new Date() },
    });
  }

  async create(groupId: string, dto: CreateLessonDto) {
    this.assertTimes(dto.startTime, dto.endTime);

    const count = await this.prisma.lesson.count({ where: { groupId } });
    if (count >= MAX_LESSONS_PER_GROUP) {
      throw new BadRequestException(
        `A group can have at most ${MAX_LESSONS_PER_GROUP} lessons`,
      );
    }

    const [lesson] = await this.prisma.$transaction([
      this.prisma.lesson.create({ data: { groupId, ...dto } }),
      this.touchGroup(groupId),
    ]);
    return lesson;
  }

  async update(groupId: string, id: string, dto: UpdateLessonDto) {
    const existing = await this.prisma.lesson.findFirst({
      where: { id, groupId },
    });
    if (!existing) throw new NotFoundException('Lesson not found');

    this.assertTimes(
      dto.startTime ?? existing.startTime,
      dto.endTime ?? existing.endTime,
    );

    const [lesson] = await this.prisma.$transaction([
      this.prisma.lesson.update({ where: { id }, data: dto }),
      this.touchGroup(groupId),
    ]);
    return lesson;
  }

  async remove(groupId: string, id: string) {
    const existing = await this.prisma.lesson.findFirst({
      where: { id, groupId },
    });
    if (!existing) throw new NotFoundException('Lesson not found');

    await this.prisma.$transaction([
      this.prisma.lesson.delete({ where: { id } }),
      this.touchGroup(groupId),
    ]);
    return { deleted: true };
  }
}
