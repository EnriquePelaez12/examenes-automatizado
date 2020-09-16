import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss']
})
export class InicioPage {

  constructor(private authservice: AuthService) {}

  logout(){
    console.log("logout clickado");
    this.authservice.logout();
  }

}
