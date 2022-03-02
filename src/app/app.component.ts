import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'reactive-form-app';
  formData: FormGroup;
  forbiddenProjectNames = ['Test'];
  allStatus = ['stable', 'critical', 'finished'];
  submitted = false;
  projectData = {
    name: '',
    email: '',
    status: '',
  };
  ngOnInit(): void {
    this.formData = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        CustomValidators.invalidProjectName,
      ]),
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        CustomValidators.forbiddenEmails
      ),
      status: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    this.submitted = true;
    this.projectData.name = this.formData.controls.name.value;
    this.projectData.email = this.formData.controls.email.value;
    this.projectData.status = this.formData.controls.status.value;
    console.log(this.projectData);
  }
}
