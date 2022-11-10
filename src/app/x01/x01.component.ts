import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-x01',
  templateUrl: './x01.component.html',
  styleUrls: ['./x01.component.scss'],
  providers: [WebsocketService]
})
export class X01Component implements OnInit {
  content = '';
  received: any[] = [];
  sent: any[] = [];
  constructor(private webSocketService: WebsocketService) {
    webSocketService.messages.subscribe(msg => {
      this.received.push(msg);
      console.log("Response from websocket");
      console.log(JSON.stringify(msg));
    })
   }

  ngOnInit(): void {
  }
  sendMsg() {
    let message = {
      message: '',
      content: ''
    }

    message.message = 'sendmessage'
    message.content = this.content;

    this.sent.push(message)
    this.webSocketService.messages.next(message)
  }
}
