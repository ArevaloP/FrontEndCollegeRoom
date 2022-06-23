import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private baseUrl = environment.baseUrl;
  private _user: any;

  get user() {
    return { ...this._user };
  }

  constructor(private http: HttpClient) {}

  loadFile(body, uid) {
    console.log(body);

    const url = `${this.baseUrl}/api/users/image/${uid}`;

    // let headers = new HttpHeaders();
    // headers = headers.set( "Content-Type", "image/png");

    return this.http.put<any>(url, body).pipe(
      tap((resp) => {
        console.log('p');
        console.log(resp);
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  register(
    name: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    city: string
  ) {
    const url = `${this.baseUrl}/api/users`;

    const body = {
      name,
      lastName,
      email,
      password,
      phone,
      city,
    };

    return this.http.post<any>(url, body).pipe(
      tap((resp) => {
        console.log(resp.user.uid);

        if (resp.ok) {


          localStorage.setItem('x-token', resp.token);
        }
      }),
      map((resp) => resp),
      catchError((err) => of(err.error.msg))
    );
  }

  updateUser(body, id) {
    const url = `${this.baseUrl}/api/users/${id}`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );
    return this.http.put<any>(url, body, { headers }).pipe(
      tap(({ ok }) => {
        console.log(ok);
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/api/users/login`;

    const body = { email, password };

    return this.http.post<any>(url, body).pipe(
      tap((resp) => {
        if (resp.ok) {
          localStorage.setItem('x-token', resp.token);
        }
      }),
      map((valid) => valid.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/api/users/rejsw`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );
    return this.http.get<any>(url, { headers }).pipe(
      map((resp) => {
        console.log(localStorage.getItem('x-token'));
        localStorage.setItem('x-token', resp.token!);

        this._user = {
          name: resp.usuarioAuth.name,
          lastName: resp.usuarioAuth.lastName,
          email: resp.usuarioAuth.email,
          phone: resp.usuarioAuth.phone,
          city: resp.usuarioAuth.city,
          img: resp.usuarioAuth.img,
          uid: resp.usuarioAuth.uid,
          estado: resp.usuarioAuth.stade,
        };

        return resp.ok;
      }),
      catchError((err) => of(false))
    );
  }

  logOut(){
    localStorage.clear();
  }
}
