import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import Swal from 'sweetalert2';

import { ValidatorsService } from '../../shared/services/validators.service';
import { AuthServiceService } from '../services/auth-service.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {


  FormReactive: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.patternEmail)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  hide: boolean = true;

  get emailMsg(){
    const errors = this.FormReactive.get('email').errors;

    if(errors['required']){
      return 'El correo es obligatorio';
    }else if(errors['pattern']){
      return 'El valor ingresado no corresponde a un correo.';
    }
    return '';
  }


    constructor(private router: Router,
                private route: ActivatedRoute,
                private fb: FormBuilder,
                private validatorsService: ValidatorsService,
                private authService: AuthServiceService) { }

      ngOnInit(): void {
      }

    // On Forgotpassword link click
    onForgotpassword() {
      this.router.navigateByUrl('forgot-password');
    }

    // On Signup link click
    onSignup() {
      this.router.navigateByUrl('auth/sign-up');
    }

    //Login
    login(){
      const {email, password} = this.FormReactive.value;

      this.authService.login(email, password)
        .subscribe( ok =>{
          if(ok === true){
            this.router.navigateByUrl('home');
          }else{
            Swal.fire('Error', ok, 'error');
          }
        })

    }

    campoValid(campo: string){
      return (this.FormReactive.get(campo).invalid
            && this.FormReactive.get(campo).touched);
    }

}
