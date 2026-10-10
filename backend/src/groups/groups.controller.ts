import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto.js';
import { GroupsService } from './groups.service.js';
import { hours, Throttle } from '@nestjs/throttler';
import { UpdateGroupDto } from './dto/change-group.dto.js';
import { EditTokenGuard } from '../common/guards/edit-token.guard.js';
import type { GroupRequest } from '../common/guards/edit-token.guard.js';
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @Throttle({ default: { limit: 5, ttl: hours(1) } })
  create(@Body() dto: CreateGroupDto) {
    return this.groupsService.create(dto);
  }

  @Get(':viewToken')
  findOne(@Param('viewToken') viewToken: string) {
    return this.groupsService.findByViewToken(viewToken);
  }

  @Patch(':viewToken')
  @UseGuards(EditTokenGuard)
  updateOne(@Req() req: GroupRequest, @Body() dto: UpdateGroupDto) {
    return this.groupsService.update(req.group.id, dto);
  }
}
