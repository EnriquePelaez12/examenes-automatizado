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
  //dato:IDatosExamen[];
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
  console.log('idDatoE', this.idDatosE);
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
      //obtiene datos de un examen
    getDatosExamenP(idDatosE: string):void{  
      this.examenService.getDatosExamen(idDatosE).subscribe(dato => {
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
  //se obtienen los datos del examen( documento)
  async saveExamen() {
  const loading = await this.loadingCtrl.create({
    message:'Añadiendo details...',
    spinner: 'crescent',
    showBackdrop:true
  });
  loading.present();   
  const idRDatos  = this.afs.createId();//Obtener datos del examen
  this.examenService.getDatosExamen(this.idDatosE).subscribe(datos => {
    datos = datos;
    //console.log('datos: ',datos);
      localStorage.setItem('idRDatos', idRDatos);  
      this.afs.collection('eResueltos').doc(idRDatos).set({//enviamos los datos para guardarlos en la bd en la coleccion Resultados
        'idDatosE': datos.idDatosE,
        'uid': this.uid,
        'nombre':datos.nombre,
        'calificacion':datos.calificacion,
        'nB':datos.nB,
        'nM':datos.nM, 
        'nP':datos.nP, 
        'nombreTema':datos.nombreTema,
              
      }).then(()=>{
        loading.dismiss();
        this.toast('Guardado','success');//enviamos los parametros a la funcion
        this.router.navigate(['/examen'])   
        var idRDatos = localStorage.getItem("idRDatos"); 
        //console.log('idRDatos: ',idRDatos);    
        this.savePreguntas(idRDatos);

      }).catch((error)=>{//identificamos el error y lo mandamos en el alert
        loading.dismiss();
        this.toast(error.message, 'danger')
      });
      
  });
}

  async savePreguntas(idRDatos){
   //funcion  para guardar las preguntas ya contestadas
        const loading = await this.loadingCtrl.create({
          message:'Añadiendo p...',
          spinner: 'crescent',
          showBackdrop:true
        });
        loading.present();   
        this.examenService.getTodos().subscribe(item => {//obtenemos las preguntas contestadas en formato Json
          this.examenes = item;
          var nPregunta = this.examenes.length;
          console.log('Preguntas a Calificar: ', this.examenes);
          console.log('Tamaño: ', nPregunta);
          var acierto = 0; 
          //Se califica el examen
          for (let examen of this.examenes) {//iteramos el Json y se guarda
            if (examen.o1 === true && examen.rcorrecta === 'o1' ) {              
              acierto += 1;
              // console.log('correcta 1', value);              
            } else if (examen.o2 === true && examen.rcorrecta === 'o2') {
              acierto += 1;
              // console.log('correcta 2', value);              
            } else if(examen.o3 === true && examen.rcorrecta === 'o3') {              
              acierto += 1;
            //  console.log('correcta 3', value);
            } else {       
            }  
          }   
          /**** se califica el examen ****/
          var nMalas = nPregunta-acierto;
          var calificacion = (10/nPregunta)*acierto;
          //console.log('N Malas',nMalas); 
          //console.log('N aciertos',acierto);  
          //console.log('calificacion:',calificacion);     
          //se guardan las preguntas del examen      
          this.calificar(idRDatos, nPregunta, nMalas, acierto, calificacion);
          // this.afs.collection('examenes').doc(idDatosE).collection('lista').doc(idExamen).update({
          
          for (let examen of this.examenes) {//iteramos el Json y se guarda                
          this.afs.collection('eResueltos').doc(idRDatos).collection('preguntas').doc(examen.idExamen).set({//enviamos los datos para guardarlos en la bd
          //'idDatosE': examen.idDatosE,
          'idExamen': examen.idExamen,
          'uid':this.uid,
          'pregunta': examen.pregunta,
          'r1':examen.r1, 
          'r2':examen.r2,
          'r3':examen.r3,
          'o1':examen.o1,
          'o2':examen.o2,
          'o3':examen.o3,
          'rcorrecta':examen.rcorrecta,
        }).then(()=>{
          loading.dismiss();
          this.toast('Guardado','success');//enviamos los parametros a la funcion
          this.router.navigate(['/examen'])
  
        }).catch((error)=>{//identificamos el error y lo mandamos en el alert
          loading.dismiss();
          this.toast(error.message, 'danger')
        });          
          }
    });    
  }  
  
  async calificar(idRDatos, nPregunta, nMalas, acierto, calificacion){  
    const loading = await this.loadingCtrl.create({
      message:'Añadiendo details...',
      spinner: 'crescent',
      showBackdrop:true
    });
    loading.present();   
    this.examenService.getDatosExamen(this.idDatosE).subscribe(datos => {
      datos = datos;
      //console.log('datos: ',datos);
        //localStorage.setItem('idRDatos', idRDatos);  
        this.afs.collection('eResueltos').doc(idRDatos).set({//enviamos los datos para guardarlos en la bd
          'idDatosE': datos.idDatosE,
          'uid': this.uid,
          'nombre':datos.nombre,
          'calificacion':calificacion,
          'nB':acierto,
          'nM':nMalas,  
          'nP':nPregunta,
          'nombreTema':datos.nombreTema,              
        }).then(()=>{
          loading.dismiss();
          this.toast('Guardado','success');//enviamos los parametros a la funcion
          this.router.navigate(['/tabs/inicio'])   
          //var idRDatos = localStorage.getItem("idRDatos"); 
          //console.log('idRDatos: ',idRDatos);    
          //this.savePreguntas(idRDatos);
  
        }).catch((error)=>{//identificamos el error y lo mandamos en el alert
          loading.dismiss();
          this.toast(error.message, 'danger')
        });
        
    });
    
  }
  
  
  addDatos(){
    this.router.navigate([`/datos-examen/${this.idDatosE}`])

  }

// opciones de chekbox
  async opcion1(idExamen, o1, idDatosE){
   // console.log(idExamen,o1);//this.afs.doc < Company > (`companies/${companyID}`).collection('employees').valueChanges();
    if (o1 === false) {//this.afs.collection('examenes').doc('examen').collection('lista').doc(this.idExamen).set({
      this.afs.collection('examenes').doc(idDatosE).collection('lista').doc(idExamen).update({
        o1:true,//marcamos en la bd la opcion verdadera y las demas se marcan como false
        o2:false,
        o3:false
      })
      .then(()=>{

        this.toast('Seleccionado','success')
      })
      .catch((error)=>{
        this.toast(error.message, 'danger')
  
      })
      
    } else {
      this.afs.collection('examenes').doc(idDatosE).collection('lista').doc(idExamen).update({
        o1:false,//marcamos en la bd la opcion verdadera y las demas se marcan como false
        o2:false,
        o3:false
      })
      .then(()=>{
        this.toast('Seleccionado','success')
      })
      .catch((error)=>{
        this.toast(error.message, 'danger')
  
      })
      
    }
    
    
  }

  async opcion2(idExamen, o2, idDatosE){
    console.log(o2);
    if (o2 === false) {
      this.afs.collection('examenes').doc(idDatosE).collection('lista').doc(idExamen).update({
        o1:false,//marcamos en la bd la opcion verdadera y las demas se marcan como false
        o2:true,
        o3:false
      })
      .then(()=>{
        this.toast('Seleccionado','success')
      })
      .catch((error)=>{
        this.toast(error.message, 'danger')
  
      })
      
    } else {
      this.afs.collection('examenes').doc(idDatosE).collection('lista').doc(idExamen).update({
        o1:false,
        o2:false,
        o3:false
      })
      .then(()=>{
        this.toast('Seleccionado','success')
      })
      .catch((error)=>{
        this.toast(error.message, 'danger')
  
      })
      
    }
    
    
  }

  async opcion3(idExamen, o3, idDatosE){
    console.log(o3);
    if (o3 === false) {
      this.afs.collection('examenes').doc(idDatosE).collection('lista').doc(idExamen).update({
        o1:false,
        o2:false,
        o3:true
      })
      .then(()=>{
        this.toast('Seleccionado','success')
      })
      .catch((error)=>{
        this.toast(error.message, 'danger')
  
      })
      
    } else {
      this.afs.collection('examenes').doc(idDatosE).collection('lista').doc(idExamen).update({
        o1:false,
        o2:false,
        o3:false
      })
      .then(()=>{
        this.toast('Seleccionado','success')
      })
      .catch((error)=>{
        this.toast(error.message, 'danger')
  
      })
      
    }
    
    
  }

  new(){
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
