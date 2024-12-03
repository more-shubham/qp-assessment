"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("@nestjs/typeorm");
const users = [
    {
        email: 'admin@example.com',
        password: 'teamwork',
        role: user_entity_1.UserRole.ADMIN,
    },
    {
        email: 'user@example.com',
        password: 'teamwork',
        role: user_entity_1.UserRole.ADMIN,
    },
];
let UsersService = class UsersService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        users.forEach((user) => {
            const existingUser = this.userRepository.findOne({
                where: { email: user.email },
            });
            if (!existingUser) {
                this.userRepository.insert(user);
            }
        });
    }
    async login(body) {
        const user = await this.userRepository.findOne({
            where: { email: body.email },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.password !== body.password) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        return this.jwtService.signAsync({
            id: user.id,
            email: user.email,
            role: user.role,
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map