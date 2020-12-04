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
  ngOnInit() {
  }
  doRegister(){
    if(this.password == this.confirmPassword){
      this.authService.register(this.name, this.surnames, this.email, this.password, this.confirmPassword).then(auth => {
        //this.authService.regitroDatos(this.name, this.surnames, this.email, this.password, this.confirmPassword)
        this.authService.isAuth().subscribe(user => {
          if (user) {
            user.updateProfile({
              displayName: ''
            }).then(() => {
             // console.log('Prueba',this.password)
              this.router.navigate(["tabs/inicio"]);
            }).catch((error) => console.log('error', error));
          }
    
    });
      }).catch(err => console.log(err));
    }
    else{
      alert("Las contraseñas no coinciden");
    }
  }

}
