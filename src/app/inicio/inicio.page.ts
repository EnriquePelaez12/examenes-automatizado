import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { IDatosExamen } from '../models/curso';
import { ViewResultService } from '../services/view-result.service';//no se necesita instalar nada para ToastController y LoadingController
import { AlumnosInterface } from '../models/user';


@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss']
})
export class InicioPage {
    
  vExamenes: IDatosExamen[];
  poo:AlumnosInterface = {
    name: '',
    surnames: '',
    email:'',
  };
  uid = null;
  idTema= null;
  idDatosE= null;

  constructor(
    private viewResultService: ViewResultService,
    private loadingController: LoadingController,
    private router: Router,
    private toastr: ToastController,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private authservice: AuthService,
  ) { }

  ngOnInit() {
    this.obtenerDatosU();
    this.viewResultService.getTodos().subscribe(vExamenes => {      
      this.vExamenes = vExamenes;
      //console.log(this.vExamenes);
    });
    this.idTema = this.route.snapshot.params['idDatosE'];
    //console.log('idDatosE: ', this.idTema);    
  }

  logout(){
    //console.log("logout clickado");
    this.authservice.logout();
  }

  goExamen(idDatosE){
        this.router.navigate([`view-result/${idDatosE}`])
        //console.log(idDatosE);
  }

  obtenerDatosU(){
    this.authservice.isAuth().subscribe(auth =>{
      if(auth){
        this.uid = auth.uid;//obtenemos el id del usuario         
         //console.log(this.uid);
          this.loadTodo(this.uid);   
      }
    })
  }

  async loadTodo(uid){
    const loading = await this.loadingController.create({
      message:'Cargando...',
      spinner: 'crescent',
      showBackdrop:true
    });
    loading.present();   
    this.authservice.getTodo(uid).subscribe(examen =>{
      //console.log(examen)
      this.poo.name = examen.name;
      this.poo.surnames = examen.surnames;
      this.poo.email = examen.email; 
      //Guardar parametros en el local storange
      localStorage.setItem('uid', this.uid); 
      localStorage.setItem('name', examen.name); 
      localStorage.setItem('surnames', examen.surnames); 
      localStorage.setItem('email', examen.email); 
      loading.dismiss();
    });
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
