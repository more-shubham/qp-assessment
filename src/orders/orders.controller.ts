import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Create a new order' })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Get all orders' })
  @Get()
  async findAll() {
    return await this.ordersService.findAll();
  }

  @ApiOperation({ summary: 'Get an order by id' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ordersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an order' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.ordersService.update(+id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Delete an order' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.ordersService.remove(+id);
  }
}
