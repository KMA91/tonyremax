import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../_animations/index';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class ContactComponent implements OnInit {

  private message: string;
  private errors: string;

  constructor(
    private _messageService: MessageService
  ) { }

  ngOnInit() {
  }

  sendEmail(form){
    if(form.value.name.length == 0 || form.value.phone.length == 0 || form.value.email.length == 0 || form.value.message.length == 0){
      this.errors = "Please ensure all fields are filled out."
    }else{

      this._messageService.sendEmail(form.value)
      .then( () => {
        form.resetForm();
        this.message = 'Thanks for your message. Tony will get back to you ASAP!';
      })
      .catch()

    }
  }

}
