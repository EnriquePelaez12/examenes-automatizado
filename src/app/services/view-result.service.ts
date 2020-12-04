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
  uid = localStorage.getItem("uid");// obtenemos el id del alumno
 
  /********** Regresa las preguntas  contestadas *************** */
  examenCol: AngularFirestoreCollection<Iexamen>;
  examenDoc: AngularFirestoreDocument<Iexamen>;
  examenes: Observable<Iexamen[]>;
  examen: Observable<Iexamen>;
  examen$: any;
 
 
  /*
  var citiesRef = db.collection("cities");

// Create a query against the collection.
var query = citiesRef.where("state", "==", "CA");*/

  constructor(
    private afs:AngularFirestore,
    private route: ActivatedRoute
  ) {
   //validamos para que nos regrese solo los examenes de alumno con su uid
    this.resultCol= this.afs.collection('eResueltos', ref=> ref.where('uid', '==',`${this.uid}`))
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
    this.examenCol= this.afs.collection('eResueltos').doc(idDatosE).collection('preguntas')
    this.examenes = this.examenCol.snapshotChanges().pipe(
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
   
    return this.examenes; //Regresamos los las preguntas del examen

    

  }
  
  getTodos(){
    return this.results;
  }

  getTodo(idDatosE){
    this.resultDoc = this.afs.doc<IDatosExamen>(`eResueltos/${idDatosE}`);
    return this.result = this.resultDoc.valueChanges();
  }
  

}
