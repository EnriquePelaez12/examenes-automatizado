import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Iexamen, IDatosExamen  } from '../models/curso';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  //**** Resultado Examenes calificasion  ********/
  resultCol: AngularFirestoreCollection<IDatosExamen>;
  resultDoc: AngularFirestoreDocument<IDatosExamen>;
  results: Observable<IDatosExamen[]>;
  result: Observable<IDatosExamen>;
  result$: any; 

  constructor(
    private afs:AngularFirestore,
  ) { }

  // ,ref => ref.orderBy('createdAt', 'desc');

  getExamenesContestados(uid){//ref=> ref.orderBy("pregunta")
    this.resultCol= this.afs.collection('eResueltos', ref=> ref.where('uid', '==',`${uid}`));
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
}
