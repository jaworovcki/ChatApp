import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    @Output() closeChatEmmiter = new EventEmitter();

    constructor(public chatService: ChatService) { }

    ngOnInit(): void {
        this.chatService.createChatConnection();
    }

    backToHome() {
        this.closeChatEmmiter.emit();
    }

}
