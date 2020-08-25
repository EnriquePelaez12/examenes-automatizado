import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  navigateToHome(){
    console.log("iniciar sesion button clicado")
    alert("Nos vamos para la app")
    this.router.navigate(["tabs/inicio"]);
  }
  
  navigateToResetPass(){
    console.log("forgot button clicado")
    alert("Olvidé la contraseña loco")
    this.router.navigate(["forgotpwd"]);

  }

}
