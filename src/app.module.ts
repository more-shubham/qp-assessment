import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { Item } from './items/entities/item.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [Item, Order, OrderItem],
      synchronize: true,
      autoLoadEntities: true,
      logger: 'simple-console',
      logging: true,
    }),
    ItemsModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
