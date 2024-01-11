import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    userForm: FormGroup = new FormGroup({});
    submitted: boolean = false;
    apiErrorMessages: string[] = [];

  constructor(private formBuilder: FormBuilder, private chatService: ChatService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.userForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    });
  }

  submitForm() {
    this.submitted = true;
    this.apiErrorMessages = [];

    if (this.userForm.valid) {
        this.chatService.registerUser(this.userForm.value).subscribe({
            next: () => {
                console.log('Open chat');
            },
            error: (error) => {
                if (typeof(error.error) == 'object') {
                    this.apiErrorMessages.push(...error.error);
                }

            }
        })
    }
  }

}
