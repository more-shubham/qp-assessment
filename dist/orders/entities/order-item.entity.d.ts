import { Order } from './order.entity';
export declare class OrderItem {
    id: number;
    itemId: string;
    quantity: number;
    price: number;
    itemName: string;
    order: Order;
}
