import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Icurso } from '../models/curso';
import { CursoService } from '../services/curso.service';


@Component({
  selector: 'app-cursos',
  templateUrl: 'cursos.page.html',
  styleUrls: ['cursos.page.scss']
})
export class CursosPage {

  cursos:Icurso[];
  // cursosew:Icurso={
  //   nombre: '',
  //   descripcion: '',
  //   nivel: '',

  // };

  constructor(
    private authservice: AuthService, 
    public router: Router,
    private cursoService: CursoService,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private afs: AngularFirestore,
    private route: ActivatedRoute, //toma el id del navegador
    private authService: AuthService,) {}

  ngOnInit() {
    this.todosCursos();
  }
  
  navigateToAsignaturas(){
    this.router.navigate(["asignaturas"]);
  }

  logout(){
   // console.log("logout clickado");
    this.authservice.logout();
  }

    //carga las preguntas de los examenes
  async todosCursos(){
    const loading = await this.loadingCtrl.create({
      message:'Cargando...',
      spinner: 'crescent',
      showBackdrop:true
    });
    loading.present();   
    this.cursoService.getTodos().subscribe(cursos => {      
      this.cursos = cursos;
      //console.log(this.cursos);
      loading.dismiss()
    });
  }
}
