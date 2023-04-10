import {Component, OnInit} from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cambiar_contraseña_usuario',
  templateUrl: './cambiar_contraseña_usuario.component.html',
  styleUrls: ['./cambiar_contraseña_usuario.component.css']
})

export class CambiarContraseñaComponent {

  password: string;
  confirm_password: string;
  constructor( public userService: UserService
  ){}
  ngOnInit(): void {}
  guardar_cambio_password(){
    const user = {password: this.password, confirm_password: this.confirm_password};
    this.userService.guardar_cambio_password(user);
  }
}
