import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
export declare class ItemsService {
    private itemRepository;
    constructor(itemRepository: Repository<Item>);
    create(createItemDto: CreateItemDto): Promise<CreateItemDto & Item>;
    findAll(): Promise<Item[]>;
    findOne(id: string): Promise<Item>;
    update(id: string, updateItemDto: UpdateItemDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
