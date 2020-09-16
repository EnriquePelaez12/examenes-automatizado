import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage {

  constructor(private authservice: AuthService) { }

  logout(){
    console.log("logout clickado");
    this.authservice.logout();
  }


}