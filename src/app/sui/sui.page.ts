import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-sui',
  templateUrl: './sui.page.html',
  styleUrls: ['./sui.page.scss'],
})
export class SuiPage implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService, public router: Router) { }

  navigateToSignup() {
    console.log("Crear cuenta cliclado")
    alert("Vamos a signup")
    this.router.navigate(["signup"]);
  }

  navigateToLogin() {
    console.log("Login cliclado")
    alert("Vamos a login")
    this.router.navigate(["login"]);
  }

  ngOnInit() {
  }

  doLogin(){
    this.authService.login(this.email, this.password).then(() =>{
      console.log("Crear cuenta cliclado")
      alert("Vamos a la app")
      this.router.navigate(["tabs/inicio"]);
    }).catch(err => {
      alert("Los datos son incorrectos o no existe el usuario");
    })

  }

  loginGoogle() {
    this.authService.loginWithGoogle().then(() =>{
      console.log("Crear cuenta cliclado")
      alert("Vamos a la app")
      this.router.navigate(["tabs/inicio"]);
    }).catch(err => {
      alert("Algo salió mal, contacta con soporte");
    })
  }
}
