import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-cursos',
  templateUrl: 'cursos.page.html',
  styleUrls: ['cursos.page.scss']
})
export class CursosPage {

  constructor(private authservice: AuthService, public router: Router) {}


  ngOnInit() {}
  
  navigateToAsignaturas(){
    this.router.navigate(["asignaturas"]);
  }

  
  logout(){
    console.log("logout clickado");
    this.authservice.logout();
  }

}
