import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { generateToken, hashToken } from '../common/utils/token.js';
import { CreateGroupDto } from './dto/create-group.dto.js';
import { UpdateGroupDto } from './dto/change-group.dto.js';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGroupDto) {
    const viewToken = generateToken();
    const editToken = generateToken();

    const group = await this.prisma.group.create({
      data: {
        name: dto.name,
        viewToken,
        editTokenHash: hashToken(editToken),
      },
    });

    return { id: group.id, name: group.name, viewToken, editToken };
  }
  async findByViewToken(viewToken: string) {
    const group = await this.prisma.group.findUnique({
      where: { viewToken },
      select: {
        id: true,
        name: true,
        scheduleUpdatedAt: true,
        oddWeekAnchor: true,
        lessons: { orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }] },
      },
    });
    if (!group) throw new NotFoundException('Group not found');
    return group;
  }

  update(groupId: string, dto: UpdateGroupDto) {
    return this.prisma.group.update({
      where: { id: groupId },
      data: { name: dto.name },
      select: { id: true, name: true },
    });
  }
}
