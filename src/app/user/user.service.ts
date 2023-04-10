import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AppRoutingModule } from 'app/app-routing.module';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"

})
export class UserService {
  constructor(private http: HttpClient,
              private router: Router)  {}

  login(user: any){
    console.log(user);
    return this.http.post('http://nerks.net:7003/users/login', user, {responseType: 'text', observe: 'response'})
                    .subscribe(
                      (response) => {
                        console.log(response.status);
                          this.router.navigateByUrl('/pantalla');
                      },
                      (error) => {
                        console.log(error);
                      }
                    );
  }
  registro(user: any){
    console.log(user);
    return this.http.post('http://nerks.net:7003/users/register', user, {responseType: 'text', observe: 'response'})
                    .subscribe(
                      (response) => {
                        console.log(response.status);
                          this.router.navigateByUrl('/pantalla');
                      },
                      (error) => {
                        console.log(error);
                      }
                    );
  }

  guardar_new_username(user: any){
    console.log(user);
    return this.http.put( 'http://nerks.net:7003/users/updateUsername', user, {responseType: 'text', observe: 'response'})
                    .subscribe(
                      (response) => {
                        console.log(response.status);
                          this.router.navigateByUrl('/pantalla');
                      },
                      (error) => {
                        console.log(error);
                      }
                    );
  }

  guardar_nuevo_correo(user: any){
    console.log(user);
    return this.http.put('http://nerks.net:7003/users/updateCorreo', user, {responseType: 'text', observe: 'response'})
                    .subscribe(
                      (response) => {
                        console.log(response.status);
                          this.router.navigateByUrl('/pantalla');
                      },
                      (error) => {
                        console.log(error);
                      }
                    );
  }

  guardar_cambio_password(user: any){
    console.log(user);
    return this.http.put('http://nerks.net:7003/users/updatePassword', user, {responseType: 'text', observe: 'response'})
                    .subscribe(
                      (response) => {
                        console.log(response.status);
                          this.router.navigateByUrl('/pantalla');
                      },
                      (error) => {
                        console.log(error);
                      }
                    );
  }

  onDeleteUser(user: any){
    console.log(user);
    return this.http.delete('http://nerks.net:7003/users/delete', user)
                    .subscribe(
                      (response) => {
                        //console.log(response.status);
                          this.router.navigateByUrl('/pantalla');
                      },
                      (error) => {
                        console.log(error);
                      }
                    );
  }
 }
