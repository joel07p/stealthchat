import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { TAddMessage } from './types';
import { UserService } from '../user/user.service';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
        //private readonly userService: UserService
    ) {}
/*
    async addMessage(data: TAddMessage) {
        const user = this.userService.
    }

    private async checkUserPermission() {
        
    }*/
}
