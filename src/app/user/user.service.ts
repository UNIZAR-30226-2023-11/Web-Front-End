import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'enviroment/enviroment';

interface EmailInt {
  email: string;
}
interface RespuestaNumJugadores {
  numJugadores: number;
}
@Injectable({
  providedIn: "root"

})
export class UserService {

  private username: string;
  private newusername: string;
  private email: string;
  private password: string;
  private confirm_password: string;

  constructor(private http: HttpClient,
    private router: Router)  {}


  setUsername(username: string): void {
    localStorage.setItem('username', username);
    this.username = username;
  }
  setEmail(email: string): void {
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }

  getUsername(): string {
    // Get username from browser
    let username_browser = localStorage.getItem('username');
    let username_client = this.username;
    if (username_browser) {
      return username_browser;
    }
    else {
      return username_client;
    }
  }

  hacerPeticion() {
    return this.http.get(environment.login).pipe(
      map((response: any) => response.username)
    );
  }

  login(user: any){
    console.log(user);
    this.setUsername(user.username);

    return this.http.post(environment.login, user, {responseType: 'text', observe: 'response'})
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
    this.setUsername(user.username);
    this.setEmail(user.email);
    return this.http.post(environment.registration, user, {responseType: 'text', observe: 'response'})
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
    return this.http.put(environment.get_ner_username, user, {responseType: 'text', observe: 'response'})
  }

  leer_email(user: any){
    console.log("SI LO HACE");
    console.log(user);
    //this.setUsername(user.username);
    // return this.http.get('/http://localhost:8080/users/devolverCorreo').pipe(
    //   map((response: any) => response.email)
    // );
    return this.http.post<EmailInt>(environment.devolver_correo, user, {observe: 'response'})
  }

  guardar_nuevo_correo(user: any){
    console.log(user);
    return this.http.put(environment.update_correo, user, {responseType: 'text', observe: 'response'})
                    .subscribe(
                      (response) => {
                        console.log(response.status);
                          this.router.navigateByUrl('/ajustes_usuario');
                      },
                      (error) => {
                        console.log(error);
                      }
                    );
  }

  guardar_cambio_password(user: any){
    console.log(user);
    return this.http.put(environment.update_password, user, {responseType: 'text', observe: 'response'})
                    .subscribe(
                      (response) => {
                        console.log(response.status);
                          this.router.navigateByUrl('/ajustes_usuario');
                      },
                      (error) => {
                        console.log(error);
                      }
                    );
  }

  onDeleteUser(user: any){
    const options = { body: user };
    this.http.delete(environment.delete, options)
                    .subscribe(
                      (response) => { this.router.navigateByUrl('/'); },
                      (error) => { console.log(error); }
                    );
  }

  crearPartida(user: any){
    console.log("CREAR PARTIDA", user);
    return this.http.post(environment.crearPartida, user, {responseType: 'text', observe: 'response'})
      .subscribe(
        (response) => {
          console.log(response.status);
          let idPartida = '';
          if (response.body !== null && response.body !== undefined) {
            idPartida = JSON.parse(response.body).idPartida;
          }
          user.idPartida = idPartida;
          const ruta = '/esperar_sala/' + idPartida;
          this.router.navigateByUrl(ruta);
          //const navigationExtras = {state: {idPartida: idPartida}};
          //this.router.navigateByUrl('/esperar_sala', navigationExtras);
        },
        (error) => {
          console.log(error);

        }
      );
  }

  esperarSala(user: any) {
    const navigationExtras = { state: { user } };
    this.router.navigate(['/esperar_sala'], navigationExtras);
  }

  unirseSala(user: any){
    console.log(user);
    return this.http.put(environment.unirJugador, user, {responseType: 'text', observe: 'response'})
                    .subscribe(
                      (response) => {
                        console.log(response.status);
                        const ruta = '/game/' + user.idPartida;
                        this.router.navigateByUrl(ruta);
                      },
                      (error) => {
                        console.log(error);
                      }
                    );
  }

  unirseSalaEsperar(user: any){
    console.log(user);
    return this.http.put(environment.unirJugador, user, {responseType: 'text', observe: 'response'})
      .subscribe(
        (response) => {
          console.log(response.status);
          const ruta = '/esperar_sala/' + user.idPartida;
          this.router.navigateByUrl(ruta);
          
        },
        (error) => {
          console.log(error);
        }
      );
                
  }

  unirseSalaInvitado(user: any){
    console.log(user);
    return this.http.put(environment.unirJugador, user, {responseType: 'text', observe: 'response'})
                    .subscribe(
                      (response) => {
                        console.log(response.status);
                        const ruta = '/game/' + user.idPartida;
                        this.router.navigateByUrl(ruta);
                      },
                      (error) => {
                        console.log(error);
                      }
                    );
  }

  // Función que realiza una consulta para saber el numero de jugadores unidos a un id de partida
  getNumJugadores(datos: any) {
    console.log("getnumJugadoresID PARTIDA: ", datos.idPartida);
    return this.http.post(environment.numJugadores, datos, {responseType: 'text', observe: 'response'})
        .subscribe(
          (response) => {
            console.log(response.status);
            let max = 0;
            if (response.body !== null && response.body !== undefined) {
              max = JSON.parse(response.body).jugadores;
            }
            datos.numJugadores = max;
            console.log("NUMERO DE JUGADORES: ", max);

          },
          (error) => {
            console.log(error);
          }
        );
  }


/**crearPartida(user: any){
    console.log("CREAR PARTIDA", user);
    return this.http.post(environment.crearPartida, user, {responseType: 'text', observe: 'response'})
      .subscribe(
        (response) => {
          console.log(response.status);
          let idPartida = '';
          if (response.body !== null && response.body !== undefined) {
            idPartida = JSON.parse(response.body).idPartida;
          }
          user.idPartida = idPartida;
          const ruta = '/esperar_sala/' + idPartida;
          this.router.navigateByUrl(ruta);
          //const navigationExtras = {state: {idPartida: idPartida}};
          //this.router.navigateByUrl('/esperar_sala', navigationExtras);
        },
        (error) => {
          console.log(error);

        }
      );
  } */

  /**get_list_players(idPartida : Number): Observable<PlayerListResponse>{
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    let body = JSON.stringify({"idPartida": idPartida});

    return this.http.put<PlayerListResponse>(environment.listaJugadores, body, httpOptions).pipe(
      tap(
        (response) => {
          console.log(response);
        }
    ));
  } */
}
