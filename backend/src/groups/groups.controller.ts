import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto.js';
import { GroupsService } from './groups.service.js';
import { hours, Throttle } from '@nestjs/throttler';

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
}
