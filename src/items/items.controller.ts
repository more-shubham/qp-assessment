import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from 'src/users/entities/user.entity';
import { Roles } from 'src/roles.decorator';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiOperation({ summary: 'Create a new item' })
  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    return await this.itemsService.create(createItemDto);
  }

  @ApiOperation({ summary: 'Get all items' })
  @Roles(UserRole.ADMIN, UserRole.USER)
  @Get()
  async findAll() {
    return await this.itemsService.findAll();
  }

  @ApiOperation({ summary: 'Get an item by id' })
  @Roles(UserRole.ADMIN, UserRole.USER)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const item = await this.itemsService.findOne(id);
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  @ApiOperation({ summary: 'Update an item' })
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return await this.itemsService.update(id, updateItemDto);
  }

  @ApiOperation({ summary: 'Delete an item' })
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.itemsService.remove(id);
  }
}
