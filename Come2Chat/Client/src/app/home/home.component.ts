import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    userForm: FormGroup = new FormGroup({});
    submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

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

    if (this.userForm.valid) {
        console.log(this.userForm.value);
    }
  }

}
