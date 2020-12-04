import { Component, OnInit } from '@angular/core';
import { Iexamen } from '../models/curso';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { IDatosExamen } from '../models/curso';
import { AuthService } from '../services/auth.service';
import { ViewResultService } from '../services/view-result.service';


@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.page.html',
  styleUrls: ['./view-result.page.scss'],
  providers:[ViewResultService]//agregamos el service
})
export class ViewResultPage implements OnInit {
  examenesResueltos: Iexamen[];

  idExamen = null;
  idDatosE = null;
  uid = localStorage.getItem("uid");  
  public dato: IDatosExamen= {    
    nombre:'',
    calificacion:'',
    nB:'',
    nM:'',
    nP:'',
    nombreTema:''
  };

  constructor(
    private viewResultService: ViewResultService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private toastr: ToastController,
    private afs: AngularFirestore,
    private route: ActivatedRoute, //toma el id del navegador
    private authService: AuthService,
  ) { }
  
  ngOnInit() {  
    this.idDatosE = this.route.snapshot.params['idDatosE'];    
    //console.log('idDatosE', this.idDatosE);
    this.getDatosUno(this.idDatosE);
    this.todasPreguntas(this.idDatosE);
  }

  getDatosUno(idDatosE: string):void{  
    this.viewResultService.getDatosExamen(idDatosE).subscribe(dato => {
      this.dato = dato;
        //console.log('Datos Examen: ',dato);       
    }); 
}

async todasPreguntas(idDatosE){
  const loading = await this.loadingCtrl.create({
    message:'Cargando...',
    spinner: 'crescent',
    showBackdrop:true
  });
  loading.present();//idDatosE: es el id del documento del examen que respondio el alumno
  this.viewResultService.getPreguntasExamen(idDatosE).subscribe(item => {//obtener lista de preguntas que respondio el alumno
    this.examenesResueltos = item;
    console.log('JSON Preguntas: ',this.examenesResueltos);
    loading.dismiss();  
  });
}


}
