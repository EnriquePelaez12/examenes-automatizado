import { Component, OnInit } from '@angular/core';
import { Itema, Iexamen } from './../../models/curso';
import { TemaService } from './../../services/tema.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ViewResultService } from '../../services/view-result.service';
import { IDatosExamen } from '../../models/curso';
import { ExamenService } from '../../services/examen.service';
@Component({
  selector: 'app-home-examen',
  templateUrl: './home-examen.page.html',
  styleUrls: ['./home-examen.page.scss'],
  providers:[ViewResultService, ExamenService]//agregamos el service sino marcara error
})
export class HomeExamenPage implements OnInit {
 // Cantidad:number;

  preguntasResueltas: Iexamen[];
  public dato: IDatosExamen= {    
    nombre:'',
    calificacion:'',
    nB:'',
    nM:'',
    nP:'',
    nombreTema:''
  };

  idDatosE=null;
  uid = localStorage.getItem("uid"); 
  constructor(
    private temaService: TemaService,
    private loadingController: LoadingController,
    private router: Router,
    private toastr: ToastController,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private viewResultService: ViewResultService,
    private examenService: ExamenService,
  ) { }

  ngOnInit() {
    this.idDatosE = this.route.snapshot.params['idDatosE'];
    console.log('idDatosE: ', this.idDatosE);
    console.log('Id Alumno: ', this.uid);
    
    this.getAlumnosExamen(this.idDatosE, this.uid);
    this.getDatosExamenP(this.idDatosE);
    // this.getDatosUno(this.idDatosE);
    // this.generarExamen(this.idDatosE)
  }


 /***********  se valida si ya se contesto o no el examen*********************** */ 
async getAlumnosExamen(idDatosE, uid){
  this.viewResultService.getAlumnosExamen(idDatosE, uid).subscribe(examenesResueltos => {//obtener lista de preguntas que respondio el alumno
    this.preguntasResueltas = examenesResueltos;
    var Cantidad = this.preguntasResueltas.length;
     //localStorage.getItem("uid");// obtenemos el id del alumno
    // console.log('JSON  Respuesta: ',examenesResueltos);
    // console.log('longitud  JSON: ',this.Cantidad);     
    if (Cantidad === 0 ) {
      localStorage.removeItem('cantidad');// removemos el id del alumno
      localStorage.setItem('cantidad', '0'); //guardar en el local
      
    }else{
      localStorage.removeItem('cantidad');// removemos el id del alumno
      localStorage.setItem('cantidad', '1')

    }
  });
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


// getDatosUno(idDatosE: string):void{  
//   console.log('Datos Examen 11: ',idDatosE);    
//   this.viewResultService.getDatosExamen(idDatosE).subscribe(dato => {
//     this.dato = dato;
//      console.log('Datos Examen 2: ',dato);       
//   }); 
// }

     //obtiene datos de un examen
     getDatosExamenP(idDatosE: string):void{  
      this.examenService.getDatosExamen(idDatosE).subscribe(dato => {
        this.dato = dato;
         // console.log('Datos Examen: ',dato); 
      
  }); 
}

  generarExamen(idDatosE){
    this.router.navigate([`generar-examen/${idDatosE}`])
  }

  nuevoExamen(){
    this.router.navigate([`examen/${this.idDatosE}`])
    }
  irExamen(){
    this.router.navigate([`c-examen/${this.idDatosE}`])
  }

  

}
