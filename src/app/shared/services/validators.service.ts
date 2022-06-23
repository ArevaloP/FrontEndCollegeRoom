import { Injectable } from '@angular/core';
import { FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthResp } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public patternEmail: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public patternName: string = '[a-zA-Z ]+';
  public phonePattern: string = '[0-9 ]+';

  private _baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  nameVacio(control: FormControl){
    const name: string = control.value?.trim();

    if (name === ''){
      return {
        vacio: true
      }
    }

    return null;
  }


  passwordIguales(campo1: string, campo2: string){


    return (control: AbstractControl): ValidationErrors | null =>{


      const pass1 = control.get(campo1)?.value;
      const pass2 = control.get(campo2)?.value;

      if (pass1 !== pass2){

        control.get(campo2)?.setErrors({noIguales: true});
        return  {noIguales: true}
      }

      control.get(campo2)?.setErrors(null);

      return null;

    }
  }

  consultarPass(pass, uid){
    const url = `${this._baseUrl}/api/users/validarPassword/${uid}`
    const body = {
      password: pass
    }
      return this.http.post<any>(url, body)
          .pipe(
            tap((resp)=>{
                console.log(resp);
            }
            ),
            map(resp =>resp.ok), catchError((err) => of(err.error.msg))
          );
  }

  passwordActual(campo: string, uid){
    //TODO Extraer de la base de datos
    return (control: AbstractControl): ValidationErrors | null =>{
      const pass = control.get(campo).value;

      const _uid = control.get(uid)?.value;
      let res = false;
      this.consultarPass(pass, _uid)
            .subscribe(ok =>{
              if(!ok){
                console.log(ok);
                control.get(campo)?.setErrors({noIguales: true});
                return  {noIguales: true}
              }
              return null;
            });
      console.log(res);


      return null;

    }
  }



}
