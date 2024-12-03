import { Order } from './order.entity';
export declare class OrderItem {
    id: number;
    itemId: string;
    quantity: number;
    order: Order;
}
