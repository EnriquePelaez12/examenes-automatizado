import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sui',
  templateUrl: './sui.page.html',
  styleUrls: ['./sui.page.scss'],
})
export class SuiPage implements OnInit {

  constructor(private router: Router) { }

  
  navigateToFeed() {
    console.log("Crear cuenta cliclado")
    alert("Vamos a la app")
    this.router.navigate(["tabs/inicio"]);
  }

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

}
