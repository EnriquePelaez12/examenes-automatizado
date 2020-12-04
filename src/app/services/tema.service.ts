import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Itema } from '../models/curso';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  temaCol: AngularFirestoreCollection<Itema>;
  temaDoc: AngularFirestoreDocument<Itema>;
  temas: Observable<Itema[]>;
  tema: Observable<Itema>;
  tema$: any;
  idTema= null;

  constructor(
    private afs:AngularFirestore
  ) {
    this.temaCol= this.afs.collection('temas');
    this.temas = this.temaCol.snapshotChanges().pipe(
      map(action => { 
        return action.map(
          a =>
          {
            const data = a.payload.doc.data() as Itema;// sacamos el id del documento
            data.idTema = a.payload.doc.id;
            return data;
          }
        )
      
      })    
    );
  }

   //Obtener datos del un tema
   getUnTema(idTema: string){
    this.temaDoc = this.afs.doc<Itema>(`temas/${idTema}`);
    return this.tema = this.temaDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Itema;
        data.idTema = action.payload.id;
        return data;
      }
    }));
  }


  getTodosTemas(idAsig){
    this.temaCol= this.afs.collection('temas', ref=> ref.where('idAsig', '==',`${idAsig}`))
    this.temas = this.temaCol.snapshotChanges().pipe(
      map(action => { 
        return action.map(
          a =>
          {
            var data = a.payload.doc.data() as Itema;// sacamos el id del documento
            data.idTema = a.payload.doc.id;
            return data;
          }
        )
      
      })    
    );
    return this.temas;//Importante regresar la respuesta sino marcara error en la funcion que utilice esta funcion
  }
  
  getTodos(){
    return this.temas;
  }

  getTodo(idTema){
    this.temaDoc = this.afs.doc<Itema>(`temas/${idTema}`);
    return this.tema = this.temaDoc.valueChanges();
  }


}
