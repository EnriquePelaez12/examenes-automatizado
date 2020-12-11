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
      // console.log('Datos Examen: ',dato);       
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
    // console.log('JSON Preguntas: ',this.examenesResueltos);
    loading.dismiss();  
  });
}


async delete(idResuelto) {
  const loading = await this.loadingCtrl.create({
    message: 'Eliminando',
    spinner: 'bubbles',
    showBackdrop: true
  });
  await loading.present();
  // this.afs.collection('eResueltos').doc(idDatosE).collection('preguntas').doc(idExamen).update({
    //ref=> ref.where('uid', '==',`${this.uid}`)
    // this.afs.collection('eResueltos').doc(idResuelto);
    this.viewResultService.getPreguntasExamen(this.idDatosE).subscribe(item => {//obtener lista de preguntas que respondio el alumno
      this.examenesResueltos = item;
      for (let index = 0; index <= this.examenesResueltos.length; index++) {
        const element = this.examenesResueltos[index];
        // console.log('Prueba delete',element.idExamen)
        

  this.afs.collection('eResueltos').doc(idResuelto).collection('preguntas').doc(element.idExamen).delete()
  .then(()=>{
    loading.dismiss();
    // this.toast('examen eliminado correctamente','success')
    this.router.navigate(['tabs/inicio'])
  })
  .catch((error)=>{
    loading.dismiss();
    this.toast(error.message, 'danger')

  })
}
});
}

async deleteCol(idResuelto) {
  const loading = await this.loadingCtrl.create({
    message: 'Eliminando',
    spinner: 'bubbles',
    showBackdrop: true
  });
  await loading.present();
this.afs.collection('eResueltos').doc(idResuelto).delete()
.then(()=>{
  loading.dismiss();
  this.toast('examen eliminado correctamente','success')
  // this.delete(idResuelto)
  this.router.navigate(['tabs/inicio'])
})
.catch((error)=>{
  loading.dismiss();
  this.toast(error.message, 'danger')

})
}


async cambiarEstatus(idResuelto){
  console.log(idResuelto);
    this.afs.collection('eResueltos').doc(idResuelto).update({
      estatus:'E'
    })
    .then(()=>{
      this.toast('Actualizado','success')
      this.router.navigate(['tabs/inicio'])
    })
    .catch((error)=>{
      this.toast(error.message, 'danger')
      console.log(error.message)
    })
    }

async toast(msg, status) {//funcion para mostrar los mensajes de alertas
  const toast = await this.toastr.create({
    message: msg,
    color: status,
    duration: 2000,      
    position: 'top',
  });
  toast.present();
}


}
