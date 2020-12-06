import { Component, OnInit } from '@angular/core';
import { Itema } from './../../models/curso';
import { TemaService } from './../../services/tema.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.page.html',
  styleUrls: ['./tema.page.scss'],
  providers:[TemaService]//agregamos el service
})
export class TemaPage implements OnInit {
  temas: Itema[];

  //idTema?: string;
  nombre: string;
  descripcion: string;
  idAsig=null;
  idTema= null;
  idDatosE= null;
  

  constructor(
    private temaService: TemaService,
    private loadingController: LoadingController,
    private router: Router,
    private toastr: ToastController,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.idAsig = this.route.snapshot.params['idAsig'];
    // console.log('idTema: ', this.idTema);
    this.loadTemas(this.idAsig)
  }

//carga la lista de los temas
  async loadTemas(idAsig){
    const loading = await this.loadingController.create({
      message:'Cargando...',
      spinner: 'crescent',
      showBackdrop:true
    });
    loading.present(); 
    this.temaService.getTodosTemas(idAsig).subscribe(item => {
      //console.log(todos);
      this.temas = item;
      loading.dismiss();
    });
}

    addTema(){
      console.log('idAsig: ', this.idAsig);
      this.router.navigate([`new-tema/${this.idAsig}`])
    }

  goExamen(idDatosE){
        this.router.navigate([`examen/${idDatosE}`])

  }
  goHomeExamen(idDatosE){
    this.router.navigate([`home-examen/${idDatosE}`])

  }


  async done(todoId){
    const loading = await this.loadingController.create({
      message: 'Updating status',
      spinner: 'crescent',
      showBackdrop: true
    });
    await loading.present();
    this.afs.collection('todo').doc(todoId).update({
      'status':'Done'
    })
    .then(()=>{
      loading.dismiss();
      this.toast('Task Updated','success')
    })
    .catch((error)=>{
      loading.dismiss();
      this.toast(error.message, 'danger')

    })
    
  }

  async delete(todoId) {
    const loading = await this.loadingController.create({
      message: 'Deleting',
      spinner: 'bubbles',
      showBackdrop: true
    });
    await loading.present();
    this.afs.collection('todo').doc(todoId).delete()
    .then(()=>{
      loading.dismiss();
      this.toast('Task Deleted','success')
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
