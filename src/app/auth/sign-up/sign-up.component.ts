import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { ValidatorsService } from '../../shared/services/validators.service';
import { AuthServiceService } from '../services/auth-service.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  FormReactive: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorsService.patternName), this.validatorsService.nameVacio]],
    lastName: ['', [Validators.required, Validators.pattern(this.validatorsService.patternName), this.validatorsService.nameVacio]],
    city: ['', [Validators.required, this.validatorsService.nameVacio]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern(this.validatorsService.phonePattern), Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.patternEmail)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  hide: boolean = true;

  private fileTemp: any = null;

  get emailMsg(){
    const errors = this.FormReactive.get('email').errors;

    if(errors['required']){
      return 'El correo es obligatorio';
    }else if(errors['pattern']){
      return 'El valor ingresado no corresponde a un correo.';
    }
    return '';
  }


  get nameMsg(): string {
    const errors = this.FormReactive.get('name').errors;

    if (errors['required'] || errors['vacio']){
      return 'El nombre es obligatorio.';
    }else if (errors['pattern']){
      return 'El nombre no peude contener caracteres numericos o especiales.';
    }

    return '';
  }

  get lastNameMsg(): string {
    const errors = this.FormReactive.get('lastName').errors;

    if (errors['required'] || errors['vacio']){
      return 'El apellido es obligatorio.';
    }else if (errors['pattern']){
      return 'El apellido no peude contener caracteres numericos o especiales.';
    }

    return '';
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private validatorsService: ValidatorsService,
              private authService: AuthServiceService) { }

  // On Signup link click
  onSignIn() {
    this.router.navigateByUrl('auth');
  }

  ngOnInit(): void {
    $.getScript('./assets/plugins/fancy-file-uploader/jquery.ui.widget.js');
    $.getScript('./assets/plugins/fancy-file-uploader/jquery.fileupload.js');
    $.getScript('./assets/plugins/fancy-file-uploader/jquery.iframe-transport.js');
    $.getScript('./assets/plugins/fancy-file-uploader/jquery.fancy-fileupload.js');
    $.getScript('./assets/plugins/Drag-And-Drop/imageuploadify.min.js');
    $.getScript('./assets/js/custom-file-upload.js');
  }

  campoValid(campo:string){
    return this.FormReactive.get(campo).invalid
            && this.FormReactive.get(campo).touched;
  }

  signUp(){
      const {name, lastName, email, password, phone, city} = this.FormReactive.value;


      let body = null;

      if(this.fileTemp !== null){
        body = new FormData();

        body.append('image', this.fileTemp.fileRaw, this.fileTemp.fileName);
      }


      // this.authService.loadFile(body)
      //       .subscribe ( ok=> {
      //         console.log(ok);
      //       });

      this.authService.register(name, lastName, email, password, phone, city)
          .subscribe( resp =>{
              if(resp.ok === true){
                if(body !== null){
                  this.authService.loadFile(body, resp.user.uid)
                      .subscribe(resp=>{
                        console.log(resp);
                        this.router.navigateByUrl('home');
                      })
                }else{
                  this.router.navigateByUrl('home');
                }

                  console.log(resp.ok);
              }else{
                Swal.fire('Error', resp, 'error');
              }
          });
  }

  capturarFile(event){
    const [file] = event.target.files;
    this.fileTemp = {
      fileRaw:file,
      fileName:file.name
    }
    console.log(this.fileTemp);
  }

}
