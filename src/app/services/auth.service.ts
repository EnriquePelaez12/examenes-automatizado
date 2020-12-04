import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from "@angular/fire/firestore";
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { auth } from 'firebase';
import { AlumnosInterface } from './../models/user';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  examenCol: AngularFirestoreCollection<AlumnosInterface>;
  examenDoc: AngularFirestoreDocument<AlumnosInterface>;
  examenes: Observable<AlumnosInterface[]>;
  examen: Observable<AlumnosInterface>;
  examen$: any;

  constructor(private AFauth : AngularFireAuth, 
    private router : Router,
    private afs : AngularFirestore, 
    private google: GooglePlus) 
    { 
      this.examenCol= this.afs.collection('alumnos')
      this.examenes = this.examenCol.snapshotChanges().pipe(
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

    getTodos(){
      return this.examenes;
    }
  //obtenemos los datos del un alumno
    getTodo(uid){
    this.examenDoc = this.afs.doc<AlumnosInterface>(`alumnos/${uid}`);
    return this.examen = this.examenDoc.valueChanges();
  }

  login(email:string, password:string){

    return new Promise((resolve, rejected) =>{
      //AngularFire ha eliminado la propiedad auth
      //this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => { 
        this.AFauth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
       // this.AFauth.getRedirectResult(user)
        console.log(user);
      }).catch(err => rejected(err));
    });

    
  }

  logout(){
    //AngularFire ha eliminado la propiedad auth
    //this.AFauth.auth.signOut().then(() => {
      this.AFauth.signOut().then(() => {
        this.google.disconnect();
      this.router.navigate([""]);
    })
  }

  register(name:string, surnames:string, email:string, password:string, confirmPassowrd:string){
    return new Promise((resolve, rejected) =>{
      this.AFauth.createUserWithEmailAndPassword(email, password).then(user => {
        resolve(user);
        this.updateUserData(user.user, name, surnames, password )//se asigna rol a usuario
      }).catch(err => rejected(err));
    });
    }

    //metodo para asignar el rol que le corresponde a cada usuario
  private updateUserData(user, name, surnames, password) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`alumnos/${user.uid}`);
    const data: AlumnosInterface = {
      uid: user.uid,
      email: user.email,
      name : name,
      surnames: surnames,
      password: password,
    }
    return userRef.set(data, { merge: true })//se guarda en la coleccion
  }

  isUSerAdmin(uid){//este metodo nos devuelve el id del usuarios
    return this.afs.doc<AlumnosInterface>(`user/${uid}`).valueChanges();
  }
    
  loginWithGoogle(){
    return this.google.login({}).then(result =>{
      const user_data_google = result;

    return this.AFauth.signInWithCredential(auth.GoogleAuthProvider.credential(null, user_data_google.accessToken));
    })
  }
  isAuth(){
    return this.AFauth.authState.pipe(map(auth => auth));
  }


  resetPassword(email: string){
  return this.AFauth.sendPasswordResetEmail(email)
  }


}