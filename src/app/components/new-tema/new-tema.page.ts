import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';//no se necesita instalar nada para ToastController y LoadingController
import { TemaService } from './../../services/tema.service';
import { Itema } from '../../models/curso';

@Component({
  selector: 'app-new-tema',
  templateUrl: './new-tema.page.html',
  styleUrls: ['./new-tema.page.scss'],
  providers:[TemaService]
})
export class NewTemaPage implements OnInit {
  poo:Itema = {
    nombre: '',
    descripcion:'',
  }

    idTema= null;
    idAsig= null;
    // nombre: string;
    // descripcion: string;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private route: ActivatedRoute,
    private temaService: TemaService,
  ) { }

  ngOnInit() {
    this.idAsig = this.route.snapshot.params['idAsig'];
    if(this.idAsig){//validamos si vieve con id mostramos los parametros importante validar      
     // this.loadUnCurso();//si no vieve con parametro es un nuevo registro
      }
      console.log(this.idAsig);
  }

//   async loadUnCurso(){
//     const loading = await this.loadingCtrl.create({
//       message:'add task..',
//       spinner: 'crescent',
//       showBackdrop:true
//     });
//     loading.present();
//     this.temaService.getTodo(this.idTema).subscribe(tema =>{
//       this.nombre= tema.nombre;
//       this.descripcion = tema.descripcion;
//       loading.dismiss();
//     });
// }

  async addTema(){
    if(this.idTema===''){
      const loading = await this.loadingCtrl.create({
        message:'Actualizando..',
        spinner: 'crescent',
        showBackdrop:true
      });
      loading.present();
      this.afs.collection('temas').doc(this.idTema).set({
          // 'nombre':this.nombre,
          // 'descripcion': this.descripcion  
      },{merge: true})
      .then(()=>{
        loading.dismiss();
        this.toast('Actualizado','success')
        this.router.navigate(['/tema']);
      })
      .catch((error)=>{
        loading.dismiss();
        this.toast(error.message, 'danger')
  
      });
        }else{
      if(this.poo.nombre && this.poo.descripcion ){
        const loading = await this.loadingCtrl.create({
          message:'Añadiendo...',
          spinner: 'crescent',
          showBackdrop:true
        });
        loading.present();
        const idTema = this.afs.createId();  
        this.afs.collection('temas').doc(idTema).set({
          'idTema': idTema,
          'idAsig':this.idAsig,
          'nombre': this.poo.nombre,
          'descripcion':this.poo.descripcion,
          'idDatosE':idTema,
  
        }).then(()=>{
          loading.dismiss();
          this.toast('Añadido','success');//enviamos los parametros a la funcion
          this.router.navigate([`tema/${this.idAsig}`])
  
        }).catch((error)=>{//identificamos el error y lo mandamos en el alert
          loading.dismiss();
          this.toast(error.message, 'danger')
        });
      }

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
