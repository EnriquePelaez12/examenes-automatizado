import { Component, OnInit } from '@angular/core';
import { Itema, Iexamen } from './../../models/curso';
import { TemaService } from './../../services/tema.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ViewResultService } from '../../services/view-result.service';
import { IDatosExamen } from '../../models/curso';
import { ExamenService } from '../../services/examen.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home-examen',
  templateUrl: './home-examen.page.html',
  styleUrls: ['./home-examen.page.scss'],
  providers:[ViewResultService, ExamenService]//agregamos el service sino marcara error
})
export class HomeExamenPage implements OnInit {
 // Cantidad:number;

  preguntasResueltas: Iexamen[];
  datosExam: IDatosExamen[];
  datos: IDatosExamen= {    
    nombre:'',
    calificacion:'',
    nB:'',
    nM:'',
    nP:'',
    nombreTema:''
  };

  idDatosE=null;
  uid = localStorage.getItem("uid"); 
  idTema = localStorage.getItem("idTema");// obtenemos el id del alumno
  constructor(
    private temaService: TemaService,
    private loadingController: LoadingController,
    private router: Router,
    private toastr: ToastController,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private viewResultService: ViewResultService,
    private examenService: ExamenService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.idDatosE = this.route.snapshot.params['idDatosE'];
    // console.log('idDatosE: ', this.idDatosE);
    // console.log('Id Alumno: ', this.uid);
    this.getDatosExamenP(this.idTema);
    // this.getDatosUno(this.idDatosE);
    // this.generarExamen(this.idDatosE)
  }


 /***********  se valida si ya se contesto el examen *********************** */ 
async getAlumnosExamen(idDatosE, uid){
  // console.log('JSOgetAlumnosExamen:',idDatosE, uid);
  this.viewResultService.getAlumnosExamen(idDatosE, uid).subscribe(examenesResueltos => {//obtener lista de preguntas que respondio el alumno
    this.preguntasResueltas = examenesResueltos;
    var Cantidad = this.preguntasResueltas.length;
     //localStorage.getItem("uid");// obtenemos el id del alumno
    // console.log('JSON  Respuesta: ',examenesResueltos);
    // console.log('longitud  JSON: ', Cantidad);     
    if (Cantidad === 0 ) {
      localStorage.setItem('cantidad', '0'); //guardar en el local
      this.router.navigate([`c-examen/${idDatosE}`])
    }else{
      localStorage.setItem('cantidad', '1')
      console.log('SI  existe un registro')
      // this.presentAlert()
      

    }
  });
}

async presentAlert() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'ATENCION',
    message: 'Este examen ya lo has contestado',
    buttons: ['Aceptar']
  });

  await alert.present();
}

/***********  se valida si ya se contesto o no el examen*********************** */
examencontestado(){
  var cant = localStorage.getItem("cantidad");
  if (cant == '0') {
    return true
  }else{
    return false

  }
}
     //obtiene datos de un examen
      getDatosExamenP(idTema: string):void{  
      this.examenService.getDatosExamen(idTema).subscribe(datosExam => {
        this.datosExam = datosExam;
        //  console.log('Lista de examenes ',datosExam); 
  }); 
}

  generarExamen(idDatosE){
    this.router.navigate([`generar-examen/${idDatosE}`])
  }

  nuevoExamen(){
    const idDatosE  = this.afs.createId();//Obtener datos del examen
    this.router.navigate([`examen/${idDatosE}`])
    }

  irExamen(idDatosE){
    if (idDatosE != '') {
      this.getAlumnosExamen(idDatosE, this.uid);
    } else {
      console.log('idDatosE vacio')
      
    }
   
  }

  

}
