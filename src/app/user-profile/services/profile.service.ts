import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  insertProduct(body){

    const url = `${this._baseUrl}/api/products`;

    const headers = new HttpHeaders().set('x-token',
          localStorage.getItem('x-token') || '');

    return this.http.post<any>(url, body, {headers})
          .pipe(
            tap( (resp)=>{
              console.log(resp);
            }),
            map(resp => resp), catchError((err) => of(err.error.msg))
          );

  }

  obtenerProductos(){

    const url = `${this._baseUrl}/api/products`;

    const headers = new HttpHeaders().set('x-token',
          localStorage.getItem('x-token') ||'');

          return this.http.get<any>(url, {headers})
            .pipe(
              tap((resp)=>{
                console.log(resp);
              }), map(resp => resp), catchError((err) => of(err.error.msg))
            );

  }

  obtenerProductosDeUsuario(id){
    const url = `${this._baseUrl}/api/products/getProductsOfUser/${id}`;

    return this.http.get<any>(url)
     .pipe(
      tap((resp)=>{
        console.log(resp);
      }), map(resp => resp), catchError((err)=>of(err.error.msg))
     );
  }

  getUserById(id){
    const url = `${this._baseUrl}/api/users/${id}`;

    return this.http.get<any>(url)
          .pipe(
            tap((resp)=>{
              console.log(resp);
            }), map(resp => resp), catchError((err)=>of(err.error.msg))
          );
  }

  deleteProduct(id){
    const url = `${this._baseUrl}/api/products/${id}`;

    const headers = new HttpHeaders().set('x-token', localStorage.getItem('x-token')||'');

    return this.http.delete<any>(url, {headers})
      .pipe(
        tap((resp)=>{
          console.log(resp);
        }), map(resp=> resp), catchError((err)=> of(err.error.msg))
      ); 
  }



}
