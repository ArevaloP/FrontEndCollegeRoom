import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  FormReactive: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.patternEmail)]],
  });

  get emailMsg(){
    const errors = this.FormReactive.get('email').errors;

    if(errors['required']){
      return 'El correo es obligatorio';
    }else if(errors['pattern']){
      return 'El valor ingresado no corresponde a un correo.';
    }
    return '';
  }

  constructor(private router: Router, private route: ActivatedRoute,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService) { }

    ngOnInit(): void {
    }
	// On SignIn link click
	onSignIn() {
	  this.router.navigateByUrl('');
	}



  campoValid(campo: string){
    return (this.FormReactive.get(campo).invalid
          && this.FormReactive.get(campo).touched);
  }

  enviar(){
    
  }

}
