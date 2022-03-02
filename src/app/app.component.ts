import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

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
        this.forbiddenNames.bind(this),
      ]),
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        this.forbiddenEmails
      ),
      status: new FormControl(null, Validators.required),
    });
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    } else {
      return null;
    }
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value == 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          return resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
  onSubmit() {
    this.submitted = true;
    this.projectData.name = this.formData.controls.name.value;
    this.projectData.email = this.formData.controls.email.value;
    this.projectData.status = this.formData.controls.status.value;
    console.log(this.projectData);
  }
}
