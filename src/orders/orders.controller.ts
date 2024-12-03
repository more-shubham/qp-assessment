import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from 'src/users/entities/user.entity';
import { Roles } from 'src/roles.decorator';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Create a new order' })
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all orders' })
  @Get()
  async findAll() {
    return await this.ordersService.findAll();
  }

  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get an order by id' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ordersService.findOne(+id);
  }
}
