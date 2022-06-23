import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarService } from '../shared/sidebar/sidebar.service'
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidatorsService } from '../shared/services/validators.service';
import { AuthServiceService } from '../auth/services/auth-service.service';

import Swal from 'sweetalert2';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  FormReactive: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorsService.patternName), this.validatorsService.nameVacio]],
    lastName: ['', [Validators.required, Validators.pattern(this.validatorsService.patternName), this.validatorsService.nameVacio]],
    city: ['', [Validators.required, this.validatorsService.nameVacio]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern(this.validatorsService.phonePattern), Validators.maxLength(10)]]
  });

  FormReactiveAgregar: FormGroup = this.fb.group({
    type: ['', [Validators.required,  this.validatorsService.nameVacio]],
    city: ['', [Validators.required, this.validatorsService.nameVacio]],
    address: ['', [Validators.required, this.validatorsService.nameVacio]],
    price: ['', [Validators.required, ]],
    desc: ['', [Validators.required, this.validatorsService.nameVacio]],
    images: [[], [Validators.required]]
  });

  user:any;

  FormReactivePassword: FormGroup = this.fb.group({
    uid: [''],
    passwordA: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordv: ['', [Validators.required]]
  },
  {
    validators: [this.validatorsService.passwordActual('passwordA', 'uid'), this.validatorsService.passwordIguales('password', 'passwordv')]
  });

  hide = true;
  public imagenes: any;

  products: any;


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


  constructor(public sidebarservice: SidebarService,
    private router: Router,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private authService: AuthServiceService,
    private profileService: ProfileService) { }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
}

getSideBarState() {
    return this.sidebarservice.getSidebarState();
}

hideSidebar() {
    this.sidebarservice.setSidebarState(true);
}

ngOnInit() {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
    this.user = this.authService.user;
        console.log(this.user);

    this.FormReactive.get('name').setValue(this.user.name);
    this.FormReactive.get('phone').setValue(this.user.phone);
    this.FormReactive.get('city').setValue(this.user.city);
    this.FormReactive.get('lastName').setValue(this.user.lastName);

    this.FormReactivePassword.get('uid').setValue(this.user.uid);


    this.profileService.obtenerProductosDeUsuario(this.user.uid)
        .subscribe((resp)=>{
          this.products = resp.produts;
        });


    $.getScript('./assets/plugins/fancy-file-uploader/jquery.ui.widget.js');
    $.getScript('./assets/plugins/fancy-file-uploader/jquery.fileupload.js');
    $.getScript('./assets/plugins/fancy-file-uploader/jquery.iframe-transport.js');
    $.getScript('./assets/plugins/fancy-file-uploader/jquery.fancy-fileupload.js');
    $.getScript('./assets/plugins/Drag-And-Drop/imageuploadify.min.js');
    $.getScript('./assets/js/custom-file-upload.js');
}

onProductos(){
  this.router.navigateByUrl('profile/productos');
}


campoValid(campo:string){
  return (this.FormReactive.get(campo).invalid
          && this.FormReactive.get(campo).touched);
}

campoValidP(campo:string){
  return (this.FormReactivePassword.get(campo).invalid
          && this.FormReactivePassword.get(campo).touched);
}

campoValidA(campo:string){
  return (this.FormReactiveAgregar.get(campo).invalid
          && this.FormReactiveAgregar.get(campo).touched);
}

updateInfo(){
  const {name, lastName, city, phone} = this.FormReactive.value;

  const body ={
    name, lastName, city, phone
  }

  this.authService.updateUser(body, this.user.uid)
  .subscribe( ok =>{
    if(ok === true){
        console.log(ok);
        this.router.navigateByUrl('profile');
        window.location.reload();
    }else{
      Swal.fire('Error', ok, 'error');
    }
});
}

onUpdatePassword(){

  const {password} = this.FormReactivePassword.value;
  const body = {
    password
  }

  this.authService.updateUser(body, this.user.uid)
    .subscribe( ok=>{
      if(ok === true){
        window.location.reload();
      }else{
        Swal.fire('Error', ok, 'error');
      }
    });

}
agregarHab(){
  const {type, city, address, price, desc} = this.FormReactiveAgregar.value;



    const body = new FormData();



      body.append('image', this.imagenes.file, this.imagenes.name);


    body.append('type', type);
    body.append('city', city);
    body.append('address', address);
    body.append('price', price);
    body.append('desc', desc);

    this.profileService.insertProduct(body)
          .subscribe(resp =>{
            if(resp.ok === true){
              window.location.reload();
            }else{
              Swal.fire('Error', resp, 'error');
            }
          })

}

capturarFile(event){
  const [file] = event.target.files;
  this.imagenes = {
    file: file,
    name: file.name
  }

}


deleteProduct(uid){

  this.profileService.deleteProduct(uid)
    .subscribe((resp)=>{
      if(resp.ok === true){
        console.log(resp);
        window.location.reload();
      }else{
        Swal.fire('Error', resp, 'error');
      }
    });

}

}
