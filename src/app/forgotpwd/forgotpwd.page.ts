import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
//import { resolve } from 'dns';


@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.page.html',
  styleUrls: ['./forgotpwd.page.scss'],
})
export class ForgotpwdPage implements OnInit {

  private email: string = "";

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  sendLinktoEmail(){
    if(this.email != ""){
      this.authService.resetPassword(this.email).then(()=>{
        console.log("Email enviado");
        alert("Comprueba tu correo electrónico y sigue las instrucciones para resetear tu contraseña.");
      }).catch(()=>{
        console.log("Error al enviar correo");
      })
    }
    else{
      alert("Inserta tu correo electrónico");
    } 
  }
}
