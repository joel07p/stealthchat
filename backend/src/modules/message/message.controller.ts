import { Body, Controller, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { AddMessage } from './types';

@Controller('message')
export class MessageController {
    constructor(
        private readonly messageService: MessageService
    ) {}

    @Post()
    addMessage(@Body() message: AddMessage) {
        return this.messageService.addMessage(message)        
    }
}
