import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ChatMessage } from 'src/app/interfaces/chat-message.intf';
import { LoginUser } from 'src/app/interfaces/login-user.intf';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() loginUser: LoginUser;
  chatMessages: ChatMessage[];
  chatMessage: ChatMessage = {
    name: null,
    message: null
  };
  element: any;

  constructor(private firestoreService: FirestoreService) {
   }

  ngOnInit() {
    this.element = document.getElementById('app-messages');
    this.getMessages();
  }


  sendMessage() {
    if (this.chatMessage.message.length === 0) {
      return;
    }
    this.chatMessage.name = this.loginUser.name;
    this.chatMessage.uid = this.loginUser.uid;
    this.chatMessage.date = new Date().getTime();

    this.firestoreService.sendMessage(this.chatMessage)
      .then( () => {
        this.chatMessage.date = 0;
        this.chatMessage.message = '';
        this.chatMessage.name = '';
        this.chatMessage.uid = '';
      })
      .catch( (err) => {
        console.error(err);
      });
  }

  getMessages() {
    this.firestoreService.getMessages()
    .subscribe(resp => {
      this.chatMessages = [];
      for (const chat of resp) {
        this.chatMessages.unshift(chat);
      }
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
        }, 50);
    });
  }

}

