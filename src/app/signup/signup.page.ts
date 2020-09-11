import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  name: string
  surnames: string
  email: string;
  password: string;
  confirmPassword: string;

  constructor(private authService: AuthService, private router: Router) { }


  doRegister(){

    this.authService.register(this.name, this.surnames, this.email, this.password, this.confirmPassword).then(auth => {
    console.log(auth)
    this.router.navigate(["tabs/inicio"]);
    }).catch(err => console.log(err));
    

    }



  ngOnInit() {
  }


}
