import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Iexamen, IDatosExamen } from '../models/curso';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CExamenService {
  /**** Datos preguntas nuevas *****/
    examenCol: AngularFirestoreCollection<Iexamen>;
    examenDoc: AngularFirestoreDocument<Iexamen>;
    examenes: Observable<Iexamen[]>;
    examen: Observable<Iexamen>;
    examen$: any;
    idDatosE = null;
  /**** Datos Examen *****/
    examenDatoCol: AngularFirestoreCollection<IDatosExamen>;
    examenDatoDoc: AngularFirestoreDocument<IDatosExamen>;
    examenesDato: Observable<IDatosExamen[]>;
    examenDato: Observable<IDatosExamen>;
    examenDato$: any;
    //idDatosE = null;

  //**** Resultado Examenes calificasion  ********/
  resultCol: AngularFirestoreCollection<IDatosExamen>;
  resultDoc: AngularFirestoreDocument<IDatosExamen>;
  results: Observable<IDatosExamen[]>;
  result: Observable<IDatosExamen>;
  result$: any;
  uid = localStorage.getItem("uid");// obtenemos el id del alumno
  
  
    constructor(
      private afs:AngularFirestore,
      private route: ActivatedRoute
    ) {/*db.collection("Messages").doc("someItemId").collection("itemMessages")*/
    this.idDatosE = this.route.snapshot.params['idDatosE'];
      this.examenCol= this.afs.collection('examenes').doc(this.idDatosE).collection('lista')
      this.examenes = this.examenCol.snapshotChanges().pipe(
        map(action => { 
          return action.map(
            a =>
            {
              const data = a.payload.doc.data() as Iexamen;// sacamos el id del documento
              data.idExamen = a.payload.doc.id;
              return data;
            }
          )
        
        })    
      );
    } 
    //Obtener datos del examen
    getDatosCopiaExamen(idDatosE: string){
      this.examenDatoDoc = this.afs.doc<IDatosExamen>(`examenes/${idDatosE}`);
      return this.examenDato = this.examenDatoDoc.snapshotChanges().pipe(map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as IDatosExamen;
          data.idDatosE = action.payload.id;
          return data;
        }
      }));
    }
      
    getCopiaTodos(){
      return this.examenes;
    }

    





  
    // getCopiaTodo(idExamen, idDatosE){//    this.afs.collection('examenes').doc(this.idDatosE).collection('lista').doc(this.idExamen).set({
    //   this.examenDoc = this.afs.doc<Iexamen>(`examenes/${idDatosE}/lista/${idExamen}`);
    //   return this.examen = this.examenDoc.valueChanges();
    // }
  
  }
  