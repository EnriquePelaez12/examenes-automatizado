import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sui',
  templateUrl: './sui.page.html',
  styleUrls: ['./sui.page.scss'],
})
export class SuiPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  btnClicked() {
    console.log("Google button clicado")
    alert("Vamos a inicio papa")
  }

}
