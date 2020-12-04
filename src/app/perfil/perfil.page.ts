import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';//no se necesita instalar nada para ToastController y LoadingController
import { AlumnosInterface } from '../models/user';
@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage {
  poo:AlumnosInterface = {
    name: '',
    surnames: '',
    email:'',
    uid:'',
  };
  uid = null;

  constructor(
    private authservice: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastController,
    private loadingCtrl: LoadingController,
    //toma el id del navegador
    ) { }
    ngOnInit(){
    }

    ionViewWillEnter() {
    
      this.obtenerDatosU();
    }

  logout(){
    console.log("logout clickado");
    this.authservice.logout();
    this.uid = this.route.snapshot.params['uid'];   
  }
/*******   Funciones para obtener los datos del alumno y guardar en local storange  ************/
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
    const loading = await this.loadingCtrl.create({
      message:'Cargando...',
      spinner: 'crescent',
      showBackdrop:true
    });
    loading.present();   
    this.authservice.getTodo(uid).subscribe(examen =>{
         console.log(uid)
      this.poo.uid = examen.uid; 
      this.poo.name = examen.name;
      this.poo.surnames = examen.surnames;
      this.poo.email = examen.email; 
      this.poo.password = examen.password;
      //Guardar parametros en el local storange
      localStorage.setItem('uid', this.uid); 
      localStorage.setItem('name', examen.name); 
      localStorage.setItem('surnames', examen.surnames); 
      localStorage.setItem('email', examen.email); 
      localStorage.setItem('password', examen.password); 
      loading.dismiss();
    });
}


/***************  Termina funciones  **********************************/
async toast(msg, status) {//funcion para mostrar los mensajes de alertas
  const toast = await this.toastr.create({
    message: msg,
    color: status,
    duration: 2000,      
    position: 'top',
  });
  toast.present();
}

//localStorage.setItem('uid', uid); //guardar en el local
//localStorage.getItem("uid");// obtenemos el id del alumno
//localStorage.removeItem('uid');// removemos el id del alumno



}