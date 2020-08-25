import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.page.html',
  styleUrls: ['./forgotpwd.page.scss'],
})
export class ForgotpwdPage implements OnInit {

  constructor(private router: Router) { }

  navigateToHome(){
    console.log("reset pass button clicado")
    alert("Nos vamos para la app")
    this.router.navigate(["tabs/inicio"]);
  }

  ngOnInit() {
  }

}
