import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { Register } from 'src/app/models/account/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService) { }

  registerForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  userName: FormControl;
  email: FormControl;
  phoneNumber: FormControl;
  address: FormControl;
  password: FormControl;
  cpassword: FormControl;

  errorList: string[];
  modalRef: BsModalRef;
  modalMessage: string;

  @ViewChild('template') modal: TemplateRef<any>;


  ngOnInit() {
    this.firstName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.userName = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.cpassword = new FormControl('', [Validators.required, this.mustMatch(this.password)]);
    this.phoneNumber = new FormControl('', [Validators.required]);
    this.address = new FormControl('', [Validators.required]);

    this.registerForm = this.fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      userName: this.userName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      address: this.address,
      password: this.password,
      cpassword: this.cpassword
    });

    this.errorList = [];
  }

  onSubmit() {
    let user: Register = this.registerForm.value;
    this.authService.register(user).subscribe(
      result => this.router.navigate(['/login']),
      error => {
        console.log(error);
        this.errorList = [];
        for (var i = 0; i < error.error.value.length; i++) {
          this.errorList.push(error.error.value[i]);
        };
        this.modalMessage = "Your Registration Was Unsuccessful";
        this.modalRef = this.modalService.show(this.modal);
      }

    );
  }

  mustMatch(passwordControl: AbstractControl): ValidatorFn {
    return (cpasswordControl: AbstractControl): { [key: string]: boolean } | null => {
      // return null if controls have not been initialized yet
      if (!passwordControl && !cpasswordControl) {
        return null;
      }
      // return null if another validator has already found an error on the matchingControl
      if (cpasswordControl.hasError && !passwordControl.hasError) {
        return null;
      }
      // set error on matchingControl if validation fails
      if (passwordControl.value !== cpasswordControl.value) {
        return { 'mustMatch': true };
      } else {
        return null;
      }

    }
  }

}
