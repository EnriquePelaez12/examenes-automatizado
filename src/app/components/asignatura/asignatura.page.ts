import { AsignaturaService } from './../../services/asignatura.service';
import { IAsignatura } from './../../models/curso';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.page.html',
  styleUrls: ['./asignatura.page.scss'],
})
export class AsignaturaPage implements OnInit {

  asignaturas:IAsignatura[];
  
  // cursosew:IAsignatura={
  //   nombre: '',
  //   descripcion: '',

  // };
  
  idAsig=null;
  idCurso= null;
  constructor(
    private authservice: AuthService, 
    public router: Router,
    private asignaturaService: AsignaturaService,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private afs: AngularFirestore,
    private route: ActivatedRoute, //toma el id del navegador
  ) { }

  ngOnInit() {
    this.idCurso = this.route.snapshot.params['idCurso'];//de esta forma se obtienen los id o se mandan rutas
    if(this.idCurso){//validamos si vieve con id mostramos los parametros importante validar    
   this.todosCursos(this.idCurso);//si no vieve con parametro es un nuevo registro
    }
    // console.log(this.idCurso);
   // this.todosCursos();
  }

  addAsignatura(){
    // console.log('prueba',this.idCurso);
    this.router.navigate([`new-asignatura/${this.idCurso}`])

  };

  async todosCursos(idCurso){
    const loading = await this.loadingCtrl.create({
      message:'Cargando...',
      spinner: 'crescent',
      showBackdrop:true
    });
    loading.present();   
    this.asignaturaService.getTodasAsig(idCurso).subscribe(item => {      
      this.asignaturas = item;//this.asignaturas la variable que almacena el Json de respuesta para despues mostrarlo en la pantalla
      // console.log(this.asignaturas);
      loading.dismiss()
    });
  }

}
