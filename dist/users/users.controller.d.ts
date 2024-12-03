import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    login(body: {
        email: string;
        password: string;
    }): Promise<string>;
    getProfile(req: any): any;
}
