import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { timingSafeEqual } from 'node:crypto';
import { PrismaService } from '../../prisma/prisma.service.js';
import { hashToken } from '../utils/token.js';

export interface GroupRequest {
  params: Record<string, string>;
  headers: Record<string, string | string[] | undefined>;
  group: { id: string };
}

@Injectable()
export class EditTokenGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<GroupRequest>();

    const group = await this.prisma.group.findUnique({
      where: { viewToken: req.params.viewToken },
    });
    if (!group) throw new NotFoundException('Group not found');

    const editToken = req.headers['x-edit-token'];
    if (typeof editToken !== 'string') {
      throw new ForbiddenException('Edit token required');
    }

    const actual = Buffer.from(hashToken(editToken));
    const expected = Buffer.from(group.editTokenHash);
    if (
      actual.length !== expected.length ||
      !timingSafeEqual(actual, expected)
    ) {
      throw new ForbiddenException('Invalid edit token');
    }

    req.group = { id: group.id };
    return true;
  }
}
