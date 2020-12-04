import { AlumnosInterface } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';//no se necesita instalar nada para ToastController y LoadingController
import { Icurso } from '../../models/curso';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.page.html',
  styleUrls: ['./edit-perfil.page.scss'],
})
export class EditPerfilPage implements OnInit {
 
  idTema: string;
  nombre: string;
  descripcion: string;
  uid= null;
  poo:AlumnosInterface = {
    name: '',
    surnames: '',
    email:'',
    uid:'',
  };

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private route: ActivatedRoute,
    private perfilService: PerfilService,
  ) { }

  ngOnInit() {
    this.uid =  localStorage.getItem("uid");// obtenemos el id del alumno
    console.log(this.uid);
    
    if(this.uid){//validamos si vieve con id mostramos los parametros importante validar      
      this.loadTodo();//si no vieve con parametro es un nuevo registro
      }
  }

  async loadTodo(){
    const loading = await this.loadingCtrl.create({
      message:'add task..',
      spinner: 'crescent',
      showBackdrop:true
    });
    loading.present();

    this.perfilService.getAlumno(this.uid).subscribe(examen =>{
      this.poo.uid = examen.uid; 
      this.poo.name = examen.name;
      this.poo.surnames = examen.surnames;
      this.poo.email = examen.email; 
      this.poo.password = examen.password;
      console.log(examen);
      loading.dismiss();
    });
}

  async guardar(){
      const loading = await this.loadingCtrl.create({
        message:'Actualizando..',
        spinner: 'crescent',
        showBackdrop:true
      });
      loading.present();
      this.afs.collection('alumnos').doc(this.uid).set({
          'name':this.poo.name,
          'surnames': this.poo.surnames  
      },{merge: true})
      .then(()=>{
        loading.dismiss();
        this.toast('Actualizado','success')
        this.router.navigate(['/tabs/perfil']);
      })
      .catch((error)=>{
        loading.dismiss();
        this.toast(error.message, 'danger')
  
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
