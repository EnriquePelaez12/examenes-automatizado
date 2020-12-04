import { TemaService } from './../../services/tema.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';//no se necesita instalar nada para ToastController y LoadingController
import { ExamenService } from './../../services/examen.service';
import { IDatosExamen } from '../../models/curso';
@Component({
  selector: 'app-datos-examen',
  templateUrl: './datos-examen.page.html',
  styleUrls: ['./datos-examen.page.scss'],
  providers:[ExamenService]
})
export class DatosExamenPage implements OnInit {
  poo:IDatosExamen = {
    nombre:'',
    calificacion:'',
    nB:'',
    nM:'',
    uid:'',
    nP:'',
    nombreTema:'',
    
    
  };
  
  idDatosE = null;

  

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private route: ActivatedRoute,
    private examenService: ExamenService,
    private temaService: TemaService,
  ) { }

  ngOnInit() {
    this.idDatosE = this.route.snapshot.params['idDatosE'];
    if(this.idDatosE){//validamos si vieve con id mostramos los parametros importante validar    
    //this.loadTodo();//si no vieve con parametro es un nuevo registro    
    }
   // console.log('Datos Examen idDatosE:',this.idDatosE);
  }


  async addDatos(){
       //funcion  para guardar datos
      if(this.poo.nombre ){//validamos que no vengan vacios los datos del formulario
        const loading = await this.loadingCtrl.create({
          message:'Añadiendo...',
          spinner: 'crescent',
          showBackdrop:true
        });
        loading.present();
        //const idDatosE = this.afs.createId();
        //console.log('clic D Examen',this.idDatosE);
         // console.log('Datos Examen: ',dato);         
        this.temaService.getUnTema(this.idDatosE).subscribe(tema => {//obtenemos el id del tema para sacar el nombre del tema
          tema = tema;            
        this.afs.collection('examenes').doc(this.idDatosE).set({//enviamos los datos para guardarlos en la bd
          'idDatosE': this.idDatosE,
          'nombre':this.poo.nombre,
          'calificacion':this.poo.calificacion,
          'nB':this.poo.nB,
          'nM':this.poo.nM,
          'uid': this.poo.uid,
          'nP': this.poo.nP,
          'nombreTema': tema.nombre//Se guarda el nombre del tema en datos del examen

          
          
        }).then(()=>{
          loading.dismiss();
          this.toast('Añadido','success');//enviamos los parametros a la funcion
          this.router.navigate([`/new-examen/${this.idDatosE}`])
  
        }).catch((error)=>{//identificamos el error y lo mandamos en el alert
          loading.dismiss();
          this.toast(error.message, 'danger')
        });
      });
  
    }
    
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
