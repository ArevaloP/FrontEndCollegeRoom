import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth/services/auth-service.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthServiceService,
              private router: Router){}


  canActivate(): Observable<boolean> | boolean {

    return this.authService.validarToken()
            .pipe(
              tap(valid=>{
                if(!valid){
                  console.log(valid)
                  this.router.navigateByUrl('');
                }
              })
            );

  }

  canLoad():  Observable<boolean> | boolean{

    return this.authService.validarToken()
            .pipe(
              tap(valid=>{
                if(!valid){
                  console.log(valid)
                  this.router.navigateByUrl('');
                }
              })
            );

  }

}
