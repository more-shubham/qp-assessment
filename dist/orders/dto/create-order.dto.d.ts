import { OrderItem } from '../entities/order-item.entity';
export declare class CreateOrderDto {
    customerName: string;
    orderItems: OrderItem[];
}
