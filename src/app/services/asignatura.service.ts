import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IAsignatura  } from '../models/curso';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  //**** Datos de la asignatura ********/
  asigCol: AngularFirestoreCollection<IAsignatura>;
  asigDoc: AngularFirestoreDocument<IAsignatura>;
  asigs: Observable<IAsignatura[]>;
  asig: Observable<IAsignatura>;
  asig$: any;


  constructor(
    private afs:AngularFirestore,
  ) {
    //validamos para que nos regrese solo los examenes de alumno con su uid
    this.asigCol= this.afs.collection('asignaturas');
    this.asigs = this.asigCol.snapshotChanges().pipe(
      map(action => { 
        return action.map(
          a =>
          {
            const data = a.payload.doc.data() as IAsignatura;// sacamos el id del documento
            data.idAsig = a.payload.doc.id;
            return data;
          }
        )
      
      })    
    );
    }


   //se obtiene un curso
  getUnCursos(idAsig: string){
    this.asigDoc = this.afs.doc<IAsignatura>(`asignaturas/${idAsig}`);
    return this.asig = this.asigDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as IAsignatura;
        data.idAsig = action.payload.id;
        return data;
      }
    }));
  }

  getTodos( ){
    return this.asigs;
  }

  getTodasAsig(idCurso){
    this.asigCol= this.afs.collection('asignaturas', ref=> ref.where('idCurso', '==',`${idCurso}`))
    this.asigs = this.asigCol.snapshotChanges().pipe(
      map(action => { 
        return action.map(
          a =>
          {
            var data = a.payload.doc.data() as IAsignatura;// sacamos el id del documento
            data.idAsig = a.payload.doc.id;
            return data;
          }
        )
      
      })    
    );
    return this.asigs;//Importante regresar la respuesta sino marcara error en la funcion que utilice esta funcion
  }

  getunCurso(idAsig){
    this.asigDoc = this.afs.doc<IAsignatura>(`asignaturas/${idAsig}`);
    return this.asig = this.asigDoc.valueChanges();
  }

}
