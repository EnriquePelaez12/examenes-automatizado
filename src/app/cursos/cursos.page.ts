import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cursos',
  templateUrl: 'cursos.page.html',
  styleUrls: ['cursos.page.scss']
})
export class CursosPage {

  constructor(public router: Router) {}


  ngOnInit() {}
  
  navigateToAsignaturas(){
    this.router.navigate(["asignaturas"]);

  }

}
