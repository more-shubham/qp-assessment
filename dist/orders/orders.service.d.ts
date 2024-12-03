import { CreateOrderDto } from './dto/create-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { ItemsService } from 'src/items/items.service';
export declare class OrdersService {
    private orderRepository;
    private itemsService;
    constructor(orderRepository: Repository<Order>, itemsService: ItemsService);
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
}
