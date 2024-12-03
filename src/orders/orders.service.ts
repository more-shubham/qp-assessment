import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ItemsService } from 'src/items/items.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private itemsService: ItemsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepository.create(createOrderDto);
    order.orderItems = await Promise.all(
      createOrderDto.orderItems.map(async (item) => {
        const itemData = await this.itemsService.findOne(item.itemId);
        return {
          ...item,
          itemName: itemData.name,
          price: itemData.price,
        };
      }),
    );
    order.totalPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    return await this.orderRepository.save(order);
  }

  async findAll() {
    return await this.orderRepository.find({
      relations: ['orderItems'],
    });
  }

  async findOne(id: number) {
    return await this.orderRepository.findOneBy({ id });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return await this.orderRepository.update(id, updateOrderDto);
  }

  async remove(id: number) {
    return await this.orderRepository.delete(id);
  }
}
