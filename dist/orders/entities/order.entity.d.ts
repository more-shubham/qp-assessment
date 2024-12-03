import { OrderItem } from './order-item.entity';
export declare class Order {
    id: number;
    customerName: string;
    orderItems: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
}
