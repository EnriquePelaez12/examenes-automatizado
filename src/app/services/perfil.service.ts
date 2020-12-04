import { AlumnosInterface } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  AlumnoCol: AngularFirestoreCollection<AlumnosInterface>;
  AlumnoDoc: AngularFirestoreDocument<AlumnosInterface>;
  Alumnos: Observable<AlumnosInterface[]>;
  Alumno: Observable<AlumnosInterface>;
  Alumno$: any;
  idAlumno= null;

  constructor(
    private afs:AngularFirestore
  ) {
    this.AlumnoCol= this.afs.collection('alumnos');
    this.Alumnos = this.AlumnoCol.snapshotChanges().pipe(
      map(action => { 
        return action.map(
          a =>
          {
            const data = a.payload.doc.data() as AlumnosInterface;// sacamos el id del documento
            data.uid = a.payload.doc.id;
            return data;
          }
        )
      
      })    
    );
    }

       //Obtener datos del un tema no borrar
  //   getUnAlumno(idAlumno: string){
  //   this.AlumnoDoc = this.afs.doc<AlumnosInterface>(`alumnos/${idAlumno}`);
  //   return this.Alumno = this.AlumnoDoc.snapshotChanges().pipe(map(action => {
  //     if (action.payload.exists === false) {
  //       return null;
  //     } else {
  //       const data = action.payload.data() as AlumnosInterface;
  //       data.uid = action.payload.id;
  //       return data;
  //     }
  //   }));
  // }

  
  getTodos(){
    return this.Alumno;
  }

  getAlumno(idAlumno){
    this.AlumnoDoc = this.afs.doc<AlumnosInterface>(`alumnos/${idAlumno}`);
    return this.Alumno = this.AlumnoDoc.valueChanges();
  }



}
