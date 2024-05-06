import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Authentication } from 'src/auth/authentication.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Authentication) private authRepository: Repository<Authentication>
    ) {}

    async createUser(username: string) {
        const auth = new Authentication()
        auth.setHash("sui")
        this.authRepository.save(auth)
        
        const user = new User(username, "sui9", auth)

        const savedUser = await this.userRepository.save(user)
        console.log(await this.userRepository.findOne({where: {id: savedUser.id}, relations: ["authentication"]}))
    }

    async getUser(username: string) {
        return await this.userRepository.findOne({where: {username}})
    }

    async getUserProperty(userId: string, property: string | undefined | null) {
        const user = await this.userRepository.findOne({where: {id: userId}})

        if(property) return user[property]
        return user
    }
}