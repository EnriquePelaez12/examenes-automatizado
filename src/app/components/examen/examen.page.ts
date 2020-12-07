import { Component, OnInit } from '@angular/core';
import { Iexamen } from './../../models/curso';
import { ExamenService } from './../../services/examen.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { IDatosExamen } from '../../models/curso';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-examen',
  templateUrl: './examen.page.html',
  styleUrls: ['./examen.page.scss'],
  providers:[ExamenService]//agregamos el service
})
export class ExamenPage implements OnInit {
  datos1:IDatosExamen[];
  examenes: Iexamen[];
  poo:Iexamen = {
    pregunta: '',
    rcorrecta: '',
    r1:'',
    r2:'',
    r3:'',
    o1:false,
    o2:false,
    o3:false,
    idExamen:null,
    idDatosE:null,
    uid: null
  };
    
  idExamen = null;
  idDatosE = null;
  uid = localStorage.getItem("uid");  

  constructor(
    private examenService: ExamenService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private toastr: ToastController,
    private afs: AngularFirestore,
    private route: ActivatedRoute, //toma el id del navegador
    private authService: AuthService,
  ) { }
  public dato: IDatosExamen= {    
    nombre:'',
    calificacion:'',
    nB:'',
    nM:'',
    nP:'',
    nombreTema:''
  };

  ngOnInit() {      
    this.idDatosE = this.route.snapshot.params['idDatosE'];    
  // console.log('idDatoE 2', this.idDatosE);
  this.todosPreguntas();
 // this.saveExamen();
  }
  //funcion que se ejecuta al principio mostrar lista de examenes
  ionViewWillEnter() {   
    this.getDatosExamenP(this.idDatosE);
  }

  /*
  obtenerDatosU(){
    this.authService.isAuth().subscribe(auth =>{
      if(auth){
        this.uid = auth.uid;//obtenemos el id del usuario
          //this.isAdmin = true;
          //localStorage.getItem("uid");// obtenemos el id del alumno
          //localStorage.removeItem('uid');// removemos el id del alumno
          //console.log('uId',this.uid);
       
      }
    })
  }
*/
      //obtiene datos de un examen RREVISAR
    getDatosExamenP(idDatosE: string):void{  
      this.examenService.getDatosExamenUno(idDatosE).subscribe(dato => {
        this.dato = dato;
         // console.log('Datos Examen: ',dato); 
      
  }); 
}
//carga las preguntas de los examenes
async todosPreguntas(){
    const loading = await this.loadingCtrl.create({
      message:'Cargando...',
      spinner: 'crescent',
      showBackdrop:true
    });
    loading.present();
    this.examenService.getTodos().subscribe(item => {
      this.examenes = item;
     // console.log('JSON Preguntas: ',this.examenes);   
      loading.dismiss();  
    });
  }

  
  addDatos(){
    //obtenemos la variable del storangue para saber a que tema corresponde y obtener el nombre del tema
    //var idDatosE = localStorage.getItem("idTema");// obtenemos el id del alumno
    this.router.navigate([`/datos-examen/${this.idDatosE}`])

  }


  newPregunta(){
   // this.router.navigate([`/new-examen`])
    this.router.navigate([`/new-examen/${this.idDatosE}`])
    console.log(this.idDatosE);
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
