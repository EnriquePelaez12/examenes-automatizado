import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-consejos',
  templateUrl: 'consejos.page.html',
  styleUrls: ['consejos.page.scss']
})
export class ConsejosPage {

  constructor(private authservice: AuthService) {}

  logout(){
    console.log("logout clickado");
    this.authservice.logout();
  }



}
