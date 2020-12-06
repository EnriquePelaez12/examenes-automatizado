import { Component, OnInit } from '@angular/core';
import { Iexamen } from './../../models/curso';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { IDatosExamen } from '../../models/curso';
import { AuthService } from '../../services/auth.service';
import { CExamenService } from '../../services/c-examen.service';
import { ViewResultService } from './../../services/view-result.service';


@Component({
  selector: 'app-c-examen',
  templateUrl: './c-examen.page.html',
  styleUrls: ['./c-examen.page.scss'],
  providers:[CExamenService]//agregamos el service

})
export class CExamenPage implements OnInit {
  
  examenesLipios: Iexamen[];
  preguntasResueltas: Iexamen[];
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
    private calExamenService: CExamenService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private toastr: ToastController,
    private afs: AngularFirestore,
    private route: ActivatedRoute, //toma el id del navegador
    private viewResultService: ViewResultService,
  ) { }
  public dato: IDatosExamen= {    
    nombre:'',
    calificacion:'',
    nB:'',
    nM:'',
    nP:'',
    nombreTema:''
  };

  public datoRespuesta: IDatosExamen= {    
    nombre:'',
    calificacion:'',
    nB:'',
    nM:'',
    nP:'',
    nombreTema:''
  };

  ngOnInit() {      
    this.idDatosE = this.route.snapshot.params['idDatosE'];    
    this.saveCopiaExamen();
    this.getDatosExamenP(this.idDatosE);//se obtienen Datos Del Examen no preguntas
    //console.log('idDatosE', this.idDatosE);
  }

 /*************  Se obtienen los datos del examen para mostrarlos en el front ******************* */
  getDatosExamenP(idDatosE: string):void{  
  this.calExamenService.getDatosCopiaExamen(idDatosE).subscribe(dato => {
  this.dato = dato;
//console.log('Datos Examen: ',dato); 
  }); 
}
/***********    Final de funcion Se obtienen los datos del examen      *************** */

/***************************************************************************************************************
 *se ejecuta esta funcion para guardar el primer documento que eson los datos propios del examen  
 ***************************************************************************************************************/
  async saveCopiaExamen() {
  const loading = await this.loadingCtrl.create({
    message:'Cargando...',
    spinner: 'crescent',
    showBackdrop:true
  });
  loading.present();   
  const idRDatos  = this.afs.createId();//Obtener datos del examen
  this.calExamenService.getDatosCopiaExamen(this.idDatosE).subscribe(datos => {
    datos = datos;
      localStorage.setItem('idRDatos', idRDatos);  
      this.afs.collection('eResueltos').doc(idRDatos).set({//enviamos los datos para guardarlos en la bd en la coleccion Resultados
        'idDatosE': datos.idDatosE,
        'idResuelto':idRDatos,
        'uid': this.uid,
        'nombre':datos.nombre,
        'calificacion':datos.calificacion,
        'nB':datos.nB,
        'nM':datos.nM, 
        'nP':datos.nP, 
        'nombreTema':datos.nombreTema,
      }).then(()=>{
        loading.dismiss();
        this.router.navigate(['/examen'])   
        var idRDatos = localStorage.getItem("idRDatos"); 
        //console.log('idRDatos: ',idRDatos);    
        this.saveCopiaPreguntas(idRDatos);//se envia el id para guardar dentro del documento en usa subcoleccion las preguntas
      }).catch((error)=>{//identificamos el error y lo mandamos en el alert
        loading.dismiss();
        this.toast(error.message, 'danger')
      });
  });
}
/******************************* Termina funcion  ******************************************************* */

/***************************************************************************************************************
 * Esta funcion recibe el id del documento donde anteriormente se guardo el documento de los datos de un examen
 *posteriormente se obtien las preguntas de la coleccion examen y se guardan en rexamen y es alli donde el alumno
 *contesta tu esamen, se genera una copia del examen original en la coleccion rExamen de firebase asociada a su id
 *de alumno 
 ***************************************************************************************************************/
  async saveCopiaPreguntas(idRDatos){
   //funcion  para guardar las preguntas ya contestadas
        this.calExamenService.getCopiaTodos().subscribe(item => {//obtenemos las preguntas contestadas en formato Json
          this.examenesLipios = item; 
          console.log('Copia del examen: ', this.examenesLipios );        
          for (let examen of this.examenesLipios) {//iteramos el Json y se guarda                
          this.afs.collection('eResueltos').doc(idRDatos).collection('preguntas').doc(examen.idExamen).set({//enviamos los datos para guardarlos en la bd
          //'idDatosE': examen.idDatosE,
          'idExamen': examen.idExamen,
          'idDatosE':idRDatos,
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
          this.getDatosUno(idRDatos);//pasamos el id nuevo que se genero para abrir desde la coleccion resultados
          this.todasPreguntas(idRDatos);
        }).catch((error)=>{//identificamos el error y lo mandamos en el alert
          this.toast(error.message, 'danger')
        });          
          }
    });    
  }  
/*******************************************************************************************************
* Termina funciones que copian el examen 
********************************************************************************************************/


/*******************************************************************************************************
* Se obtienen los datos del examen ya en la coleccion eResueltos 
********************************************************************************************************/

getDatosUno(idRDatos: string):void{ 
  // console.log('Datos eee  : ',idDatosE); 
  this.viewResultService.getDatosExamen(idRDatos).subscribe(datoRespuesta => {
    this.datoRespuesta = datoRespuesta;
      // console.log('Datos Examen: ',this.datoRespuesta);       
  }); 
}

async todasPreguntas(idRDatos){
  // loading.present();//idDatosE: es el id del documento del examen que respondio el alumno
  this.viewResultService.getPreguntasExamen(idRDatos).subscribe(item => {//obtener lista de preguntas que respondio el alumno
    this.preguntasResueltas = item;
    // console.log('JSON Preguntas: ',this.examenesResueltos);
    // loading.dismiss();  
  });
}
/*******************************************************************************************************
* Finaliza proceso
********************************************************************************************************/


/*******************************************************************************************************
* Se obtienen las preguntas del examen, se califican y se actualiza la calificacion el la coleccion
eResueltos
********************************************************************************************************/
async calificar() {
  const loading = await this.loadingCtrl.create({
    message:'Cargando',
    spinner: 'crescent',
    showBackdrop:true
  });
  loading.present();   
  var idRDatos = localStorage.getItem("idRDatos");
  console.log('parar',idRDatos);
  this.viewResultService.getPreguntasExamen(idRDatos).subscribe(preguntasResueltas => {
    preguntasResueltas = preguntasResueltas;
    console.log(preguntasResueltas);
    var nPregunta = this.preguntasResueltas.length;
          console.log('Preguntas a Calificar: ', this.preguntasResueltas);
          console.log('Tamaño: ', nPregunta);
          var acierto = 0; 
          //Se califica el examen
          for (let examen of this.preguntasResueltas) {//iteramos el Json y se guarda
            if (examen.o1 === true && examen.rcorrecta === 'o1' ) {              
              acierto += 1;
            } else if (examen.o2 === true && examen.rcorrecta === 'o2') {
              acierto += 1;
            } else if(examen.o3 === true && examen.rcorrecta === 'o3') {              
              acierto += 1;
            } else {       
            }  
          }   
          /**** se califica el examen ****/
          var nMalas = nPregunta-acierto;
          var calificacion = (10/nPregunta)*acierto;
          // console.log('N Malas',nMalas); 
          // console.log('N aciertos',acierto);  
          // console.log('calificacion:',calificacion);    
          // console.log('idRDatos:',idRDatos); 
          //se guardan las preguntas del examen      
          this.guardarCalificacion(idRDatos, nPregunta, nMalas, acierto, calificacion);
  });
  loading.dismiss();
}

async guardarCalificacion(idRDatos, nPregunta, nMalas, acierto, calificacion){  
  const loading = await this.loadingCtrl.create({
    message:'cargando...',
    spinner: 'crescent',
    showBackdrop:true
  });
  loading.present();   
  this.viewResultService.getDatosExamen(idRDatos).subscribe(datoRespuesta => {
    datoRespuesta = datoRespuesta;
    console.log('datos: ',datoRespuesta);
      //localStorage.setItem('idRDatos', idRDatos);  
      this.afs.collection('eResueltos').doc(idRDatos).set({//enviamos los datos para guardarlos en la bd
        'idDatosE': this.idDatosE,
        'idResuelto':idRDatos,
        'uid': this.uid,
        'nombre':datoRespuesta.nombre,
        'calificacion':calificacion,
        'nB':acierto,
        'nM':nMalas,  
        'nP':nPregunta,
        'nombreTema':datoRespuesta.nombreTema,              
      }).then(()=>{
        loading.dismiss();
        this.toast('Guardado','success');//enviamos los parametros a la funcion
        // this.examenResuelto(idRDatos, datoRespuesta.idDatosE, this.uid);
        this.router.navigate(['/tabs/inicio'])   
      }).catch((error)=>{//identificamos el error y lo mandamos en el alert
        loading.dismiss();
        this.toast(error.message, 'danger')
      });
      
  });
  
}

/*******************************************************************************************************
*                                          Termina funcion
********************************************************************************************************/

// async examenResuelto(idRDatos,idExamen, uid){  
//   const loading = await this.loadingCtrl.create({
//     message:'cargando...',
//     spinner: 'crescent',
//     showBackdrop:true
//   });
//   loading.present();   
//       this.afs.collection('eResueltos').doc(idRDatos).collection('eContestados').doc(idRDatos).set({//enviamos los datos para guardarlos en la bd
//         'idDatosE': datoRespuesta.idDatosE,
//         'uid': this.uid,
//         'nombre':datoRespuesta.nombre,
//         'calificacion':calificacion,
//         'nB':acierto,
//         'nM':nMalas,  
//         'nP':nPregunta,
//         'nombreTema':datoRespuesta.nombreTema,              
//       }).then(()=>{
//         loading.dismiss();
//         this.toast('Guardado','success');//enviamos los parametros a la funcion
//         this.examenResuelto();
//         this.router.navigate(['/tabs/inicio'])   
//       }).catch((error)=>{//identificamos el error y lo mandamos en el alert
//         loading.dismiss();
//         this.toast(error.message, 'danger')
//       });
      
  
// }


/*******************************************************************************************************
* Las siguientes 3 funciones son las encargadas de cambiar el resultado de la pregunta, estos datos 
vienen de los ckeck box del fron end
********************************************************************************************************/
  async opcion1(idExamen, o1, idDatosE){
   // console.log(idExamen,o1);//this.afs.doc < Company > (`companies/${companyID}`).collection('employees').valueChanges();
    if (o1 === false) {//this.afs.collection('examenes').doc('examen').collection('lista').doc(this.idExamen).set({
      this.afs.collection('eResueltos').doc(idDatosE).collection('preguntas').doc(idExamen).update({
        o1:true,//marcamos en la bd la opcion verdadera y las demas se marcan como false
        o2:false,
        o3:false
      })
      .then(()=>{

        this.toast('Seleccionado','success')
      })
      .catch((error)=>{
        this.toast(error.message, 'danger')
        console.log(error.message)
  
      })
      
    } else {
      this.afs.collection('eResueltos').doc(idDatosE).collection('preguntas').doc(idExamen).update({
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
      this.afs.collection('eResueltos').doc(idDatosE).collection('preguntas').doc(idExamen).update({
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
      this.afs.collection('eResueltos').doc(idDatosE).collection('preguntas').doc(idExamen).update({
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
      this.afs.collection('eResueltos').doc(idDatosE).collection('preguntas').doc(idExamen).update({
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
      this.afs.collection('eResueltos').doc(idDatosE).collection('preguntas').doc(idExamen).update({
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
/*******************************************************************************************************
   * Termina funciones 
********************************************************************************************************/

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
