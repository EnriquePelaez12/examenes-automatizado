import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  iniciarsesion(){
    console.log("iniciar sesion button clicado")
    alert("Nos vamos para la app")
  }
  olvide(){
    console.log("forgot button clicado")
    alert("Olvidé la contraseña loco")
  }

}
