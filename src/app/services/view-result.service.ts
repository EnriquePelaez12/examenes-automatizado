import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Iexamen, IDatosExamen  } from '../models/curso';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ViewResultService {

//**** Resultado Examenes calificasion  ********/
  resultCol: AngularFirestoreCollection<IDatosExamen>;
  resultDoc: AngularFirestoreDocument<IDatosExamen>;
  results: Observable<IDatosExamen[]>;
  result: Observable<IDatosExamen>;
  result$: any; 
  /********** Regresa las preguntas  contestadas *************** */
  examenDatoCol: AngularFirestoreCollection<Iexamen>;
  examenDatoDoc: AngularFirestoreDocument<Iexamen>;
  examenDatos: Observable<Iexamen[]>;
  examenDato: Observable<Iexamen>;
  examenDato$: any;
 
 
  /*
  var citiesRef = db.collection("cities");

// Create a query against the collection.
var query = citiesRef.where("state", "==", "CA");*/

  constructor(
    private afs:AngularFirestore,
    private route: ActivatedRoute
  ) {
    var uid = localStorage.getItem("uid");// obtenemos el id del alumno
   //validamos para que nos regrese solo los examenes de alumno con su uid 'nP', '=>', '0'
    this.resultCol= this.afs.collection('eResueltos', ref=> ref.where('uid', '==',`${uid}`).where("nP", ">", 0))
    this.results = this.resultCol.snapshotChanges().pipe(
      map(action => { 
        return action.map(
          a =>
          {
            const data = a.payload.doc.data() as IDatosExamen;// sacamos el id del documento
            data.idDatosE = a.payload.doc.id;
            return data;
          }
        )
      
      })    
    );
  }

   //Obtener datos del examen
   getDatosExamen(idDatosE: string){
    this.resultDoc = this.afs.doc<IDatosExamen>(`eResueltos/${idDatosE}`);
    return this.result = this.resultDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as IDatosExamen;
        data.idDatosE = action.payload.id;
        return data;
      }
    }));
  }

  getPreguntasExamen(idDatosE){
    this.examenDatoCol= this.afs.collection('eResueltos').doc(idDatosE).collection('preguntas', ref=> ref.orderBy("pregunta"))
    this.examenDatos = this.examenDatoCol.snapshotChanges().pipe(
      map(action => { 
        return action.map(
          a =>
          {
            var data = a.payload.doc.data() as Iexamen;// sacamos el id del documento
            data.idExamen = a.payload.doc.id;
            return data;
          }
        )
      
      })    
    );
   
    return this.examenDatos; //Regresamos los las preguntas del examen
  }

//para validar si ya contesto el examen
  getAlumnosExamen(idDatosE, uid){
    this.examenDatoCol= this.afs.collection('eResueltos', ref=> ref.where('idDatosE', '==',`${idDatosE}`).where("uid", "==", `${uid}`))
    this.examenDatos = this.examenDatoCol.snapshotChanges().pipe(
      map(action => { 
        return action.map(
          a =>
          {
            var data = a.payload.doc.data() as Iexamen;// sacamos el id del documento
            data.idExamen = a.payload.doc.id;
            return data;
          }
        )
      
      })    
    );
   
    return this.examenDatos; //Regresamos los las preguntas del examen
  }
  
  getTodos(){
    return this.results;
  }

  //funcion que actualiza los datos en la pantalla de inicio nos trae los examenes que han sido contestados
  getExamenesContestados(uid){
    this.resultCol= this.afs.collection('eResueltos', ref=> ref.where('uid', '==',`${uid}`).where("estatus", "==", "contestado"))
    this.results = this.resultCol.snapshotChanges().pipe(
      map(action => { 
        return action.map(
          a =>
          {
            var data = a.payload.doc.data() as IDatosExamen;// sacamos el id del documento
            data.idDatosE = a.payload.doc.id;
            return data;
          }
        )
      
      })    
    );
   
    return this.results; //Regresamos los las preguntas del examen
  }

  getTodo(idDatosE){
    this.resultDoc = this.afs.doc<IDatosExamen>(`eResueltos/${idDatosE}`);
    return this.result = this.resultDoc.valueChanges();
  }
  

}
