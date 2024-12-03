import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OrderItem } from '../entities/order-item.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty()
  customerName: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @ApiProperty({ type: () => [CreateOrderItemDto] })
  orderItems: OrderItem[];
}
