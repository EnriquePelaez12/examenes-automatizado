import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Icurso  } from '../models/curso';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

//**** Datos del curso  ********/
    cursoCol: AngularFirestoreCollection<Icurso>;
    cursoDoc: AngularFirestoreDocument<Icurso>;
    cursos: Observable<Icurso[]>;
    curso: Observable<Icurso>;
    curso$: any;

  constructor(
    private afs:AngularFirestore,
  ) {
      //validamos para que nos regrese solo los examenes de alumno con su uid
      this.cursoCol= this.afs.collection('cursos');
      this.cursos = this.cursoCol.snapshotChanges().pipe(
        map(action => { 
          return action.map(
            a =>
            {
              const data = a.payload.doc.data() as Icurso;// sacamos el id del documento
              data.idCurso = a.payload.doc.id;
              return data;
            }
          )
        
        })    
      );
    }

//se obtiene un curso
  getUnCursos(idCurso: string){
    this.cursoDoc = this.afs.doc<Icurso>(`cursos/${idCurso}`);
    return this.curso = this.cursoDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Icurso;
        data.idCurso = action.payload.id;
        return data;
      }
    }));
  }

  getTodos(){
    return this.cursos;
  }

  getunCurso(idCurso){
    this.cursoDoc = this.afs.doc<Icurso>(`cursos/${idCurso}`);
    return this.curso = this.cursoDoc.valueChanges();
  }



}
