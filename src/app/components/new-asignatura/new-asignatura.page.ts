import { AsignaturaService } from './../../services/asignatura.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { IAsignatura } from '../../models/curso';
import { empty } from 'rxjs';

@Component({
  selector: 'app-new-asignatura',
  templateUrl: './new-asignatura.page.html',
  styleUrls: ['./new-asignatura.page.scss'],
})
export class NewAsignaturaPage implements OnInit {
  poo:IAsignatura = {
    nombre: '',
    descripcion:'',
  }
  idAsig= null;
  idCurso=null;

  constructor(    
    private authservice: AuthService, 
    public router: Router,
    private asignaturaService: AsignaturaService,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private afs: AngularFirestore,
    private route: ActivatedRoute, //toma el id del navegador
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.idCurso = this.route.snapshot.params['idCurso'];//de esta forma se obtienen los id o se mandan rutas
    if(this.idAsig){//validamos si vieve con id mostramos los parametros importante validar    
  //  this.loadUnAsig();//si no vieve con parametro es un nuevo registro
    }
    // console.log('Id del curso',this.idCurso);
  }

  
//************* Obtener un curso para editar ******************* */
async loadUnAsig(){
  const loading = await this.loadingCtrl.create({
    message:'Cargando..',
    spinner: 'crescent',
    showBackdrop:true
  });
  loading.present();
  this.asignaturaService.getunCurso(this.idAsig).subscribe(Asig =>{
    this.poo.nombre= Asig.nombre;
    this.poo.descripcion = Asig.descripcion;
    loading.dismiss();
  })
}


  //************* Funcion  guarda y/o actualiza los cursos ***************** */
  async saveCurso(){
    if(this.idAsig === ''){//si viene con id significa que se debe actualizar
      const loading = await this.loadingCtrl.create({//funcion  para Actualizar datos
        message:'Actualizando..',
        spinner: 'crescent',
        showBackdrop:true
      });
      loading.present();
      this.afs.collection('asignaturas').doc(this.idAsig).set({
          'nombre': this.poo.nombre,
          'descripcion':this.poo.descripcion,
      },{merge: true})
      .then(()=>{
        loading.dismiss();
        this.toast('Actualizado','success')
        this.router.navigate(['asignatura']);
      })
      .catch((error)=>{
        loading.dismiss();
        this.toast(error.message, 'danger')
  
      });
        }else{//funcion  para guardar datos
      if(this.poo.nombre){//validamos que no vengan vacios los datos del formulario
        const loading = await this.loadingCtrl.create({
          message:'Añadiendo...',
          spinner: 'crescent',
          showBackdrop:true
        });
        loading.present();
        const idAsig = this.afs.createId();
        // const idTema = this.afs.createId();
        this.afs.collection('asignaturas').doc(idAsig).set({//enviamos los datos para guardarlos en la bd
          'idAsig':idAsig,
          // 'idTema':idTema,
          'idCurso':this.idCurso,
          'nombre': this.poo.nombre,
          'descripcion':this.poo.descripcion,
        }).then(()=>{
          loading.dismiss();
          this.toast('Añadido','success');//enviamos los parametros a la funcion
          this.router.navigate([`asignatura/${this.idCurso}`])
        }).catch((error)=>{//identificamos el error y lo mandamos en el alert
          loading.dismiss();
          this.toast(error.message, 'danger')
        });
      }  
    }    
  }

   //************* funcion de alertas ***************** */

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
