import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Icurso } from '../../models/curso';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-new-curso',
  templateUrl: './new-curso.page.html',
  styleUrls: ['./new-curso.page.scss'],
})
export class NewCursoPage implements OnInit {
  poo:Icurso = {   
    nombre: '',
    descripcion:'',
    nivel:'',
  };
  idCurso= null;

  constructor(
    private authservice: AuthService, 
    public router: Router,
    private cursoService: CursoService,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private afs: AngularFirestore,
    private route: ActivatedRoute, //toma el id del navegador
    private authService: AuthService,
  ) { }

  ngOnInit() {    
    this.idCurso = this.route.snapshot.params['idCurso'];//de esta forma se obtienen los id o se mandan rutas
    if(this.idCurso){//validamos si vieve con id mostramos los parametros importante validar    
   this.loadUnCurso();//si no vieve con parametro es un nuevo registro
    }
    //console.log(this.idCurso);
  }
//************* Obtener un curso para editar ******************* */
  async loadUnCurso(){
    const loading = await this.loadingCtrl.create({
      message:'Cargando..',
      spinner: 'crescent',
      showBackdrop:true
    });
    loading.present();
    this.cursoService.getunCurso(this.idCurso).subscribe(curso =>{
      this.poo.nombre= curso.nombre;
      this.poo.descripcion = curso.descripcion;
      loading.dismiss();
    })
}



  //************* Funcion  guarda y/o actualiza los cursos ***************** */
  async saveCurso(){
    if(this.idCurso){//si viene con id significa que se debe actualizar
      const loading = await this.loadingCtrl.create({//funcion  para Actualizar datos
        message:'Actualizando..',
        spinner: 'crescent',
        showBackdrop:true
      });
      loading.present();
      this.afs.collection('cursos').doc(this.idCurso).set({
          'nombre': this.poo.nombre,
          'descripcion':this.poo.descripcion,
          'nivel':this.poo.nivel,
      },{merge: true})
      .then(()=>{
        loading.dismiss();
        this.toast('Actualizado','success')
        this.router.navigate(['tabs/cursos']);
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
        const idCursoNuevo = this.afs.createId();
        const idAsig = this.afs.createId();
        this.afs.collection('cursos').doc(idCursoNuevo).set({//enviamos los datos para guardarlos en la bd
          'idCurso':idCursoNuevo,
          'idAsig': idAsig,
          'nombre': this.poo.nombre,
          'descripcion':this.poo.descripcion,
          'nivel':this.poo.nivel,
        }).then(()=>{
          loading.dismiss();
          this.toast('Añadido','success');//enviamos los parametros a la funcion
          this.router.navigate(['tabs/cursos'])
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
