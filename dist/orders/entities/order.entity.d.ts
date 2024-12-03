import { OrderItem } from './order-item.entity';
export declare class Order {
    id: number;
    customerName: string;
    orderItems: OrderItem[];
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
}
