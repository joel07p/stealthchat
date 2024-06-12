import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/common/decorators';
import { MessageService } from './message.service';
import { AddMessage } from './types';

@Controller('message')
export class MessageController {
    constructor(
        private readonly messageService: MessageService
    ) {}

    @Get(':roomId')
    getMessages(@User('sub') userId: string, @Param('roomId') roomId: string) {
        return this.messageService.getMessages(userId, roomId)
    }

    @Get()
    getMessage(@Body() messageId: any) {
        return this.messageService.getMessageById(messageId.messageId)
    }

    @Post()
    addMessage(@User("sub") userId: string, @Body() message: AddMessage) {
        return this.messageService.addMessage(message, userId)        
    }
}
