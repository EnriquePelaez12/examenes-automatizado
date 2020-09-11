import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  doLogin(){
    this.authService.login(this.email, this.password).then(() =>{
      //console.log("Crear cuenta cliclado")
      //alert("Vamos a la app")
      this.router.navigate(["tabs/inicio"]);
    }).catch(err => {
      alert("Datos incorrectos o no existe el usuario");
    })

  }
  
  navigateToResetPass(){
    console.log("forgot button clicado")
    alert("Olvidé la contraseña loco")
    this.router.navigate(["forgotpwd"]);

  }

}
