import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';//no se necesita instalar nada para ToastController y LoadingController
import { ExamenService } from './../../services/examen.service';
import { Iexamen } from '../../models/curso';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-examen',
  templateUrl: './new-examen.page.html',
  styleUrls: ['./new-examen.page.scss'],
  providers:[ExamenService]
})
export class NewExamenPage implements OnInit {

  poo:Iexamen = {
    pregunta: '',
    rcorrecta: '',
    r1:'',
    r2:'',
    r3:'',
    o1:false,
    o2:false,
    o3:false,
    idExamen:null,
    idDatosE:null,
    uid: null
  };
  
  idExamen = null;
  idDatosE = null;

  constructor(//añadimos al cntructor los componentes que importamos
    private afs: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private route: ActivatedRoute,
    private examenService: ExamenService,
  ) { }

  ngOnInit() {//aqui se inicializan esta funcion es la primera que se ejecuta
    this.idExamen = this.route.snapshot.params['idExamen'];//de esta forma se obtienen los id o se mandan rutas
    if(this.idExamen){//validamos si vieve con id mostramos los parametros importante validar    
    this.loadTodo();//si no vieve con parametro es un nuevo registro
    }
    this.idDatosE = this.route.snapshot.params['idDatosE'];
    //console.log(this.idDatosE);
    //console.log(this.router);
  }

  async loadTodo(){
    const loading = await this.loadingCtrl.create({
      message:'add task..',
      spinner: 'crescent',
      showBackdrop:true
    });
    loading.present();   //obtenemos todos los datos encaso de que sea actualizacion si es nuevo no.
    this.examenService.getTodo(this.idExamen, this.idDatosE).subscribe(examen =>{
      console.log(this.idDatosE); 
      this.poo.pregunta = examen.pregunta;
      this.poo.r1 = examen.r1;
      this.poo.r2 = examen.r2;
      this.poo.r3 = examen.r3;
      this.poo.o1 = examen.o1;
      this.poo.o2 = examen.o2;
      this.poo.o3 = examen.o3;
      this.poo.rcorrecta = examen.rcorrecta;
     // this.poo = examen;   
      loading.dismiss();
    });
}

async addPregunta(){
  if(this.idExamen){//si viene con id significa que se debe actualizar
    const loading = await this.loadingCtrl.create({//funcion  para Actualizar datos
      message:'Actualizando..',
      spinner: 'crescent',
      showBackdrop:true
    });
    loading.present();
    this.afs.collection('examenes').doc(this.idDatosE).collection('lista').doc(this.idExamen).set({
       'pregunta':this.poo.pregunta,
        'r1':this.poo.r1, 
        'r2':this.poo.r2,
        'r3':this.poo.r3,
        'o1':this.poo.o1,
        'o2':this.poo.o2,
        'o3':this.poo.o3,
        'rcorrecta':this.poo.rcorrecta, 
    },{merge: true})
    .then(()=>{
      loading.dismiss();
      this.toast('Actualizado','success')
      this.router.navigate(['/examen']);
    })
    .catch((error)=>{
      loading.dismiss();
      this.toast(error.message, 'danger')

    });
      }else{//funcion  para guardar datos
    if(this.poo.pregunta && this.poo.r1 && this.poo.r2 && this.poo.r3 && this.poo.rcorrecta ){//validamos que no vengan vacios los datos del formulario
      const loading = await this.loadingCtrl.create({
        message:'Añadiendo...',
        spinner: 'crescent',
        showBackdrop:true
      });
      loading.present();
      const idExamen = this.afs.createId();
      this.afs.collection('examenes').doc(this.idDatosE).collection('lista').doc(idExamen).set({//enviamos los datos para guardarlos en la bd
        'idDatosE': this.idDatosE,
        'idExamen': idExamen,
        'pregunta': this.poo.pregunta,
        'r1':this.poo.r1, 
        'r2':this.poo.r2,
        'r3':this.poo.r3,
        'o1':this.poo.o1,
        'o2':this.poo.o2,
        'o3':this.poo.o3,
        'rcorrecta':this.poo.rcorrecta,
      }).then(()=>{
        loading.dismiss();
        this.toast('Añadido','success');//enviamos los parametros a la funcion
        this.router.navigate([`examen/${this.idDatosE}`])
        //this.router.navigate([`/new-examen/${idDatosE}`])

      }).catch((error)=>{//identificamos el error y lo mandamos en el alert
        loading.dismiss();
        this.toast(error.message, 'danger')
      });
    }

  }
  
}

async delete(idExamen) {
  const loading = await this.loadingCtrl.create({
    message: 'Eliminando',
    spinner: 'bubbles',
    showBackdrop: true
  });
  await loading.present();  
  this.afs.collection('examenes').doc('examen').collection('lista').doc(idExamen).delete()
  .then(()=>{
    loading.dismiss();
    this.toast('Pregunta Eliminada','success')
    this.router.navigate(['/examen']);
  })
  .catch((error)=>{
    loading.dismiss();
    this.toast(error.message, 'danger')

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
