import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { generateToken, hashToken } from '../common/utils/token.js';
import { CreateGroupDto } from './dto/create-group.dto.js';

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
}
