import {Component, OnInit} from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cambiar_nombre_usuario',
  templateUrl: './cambiar_nombre_usuario.component.html',
  styleUrls: ['./cambiar_nombre_usuario.component.css']
})

export class CambiarUsernameComponent {
  new_username: string;
  username_anterior: string;
  constructor( public userService: UserService     
  ) {}
  ngOnInit(): void {}
  guardar_new_username(){
    //this.username_anterior = this.miFormulario.get('nombreCampo').value;
    // Aquí se actualiza el campo con el nuevo valor
    //this.username_anterior = this.form.controls['username'].value;

    const user = {username_anterior: this.username_anterior, new_username: this.new_username};
    this.userService.guardar_new_username(user);
  }
}
