import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { auth } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth : AngularFireAuth, private router : Router, private db : AngularFirestore, private google: GooglePlus) { }

  login(email:string, password:string){

    return new Promise((resolve, rejected) =>{
      //AngularFire ha eliminado la propiedad auth
      //this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => { 
        this.AFauth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
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

  register(email : string, password : string, name : string){
    
    return new Promise ((resolve, reject) => {
      //AngularFire ha eliminado la propiedad auth
      //this.AFauth.auth.createUserWithEmailAndPassword(email, password).then( res =>{
      this.AFauth.createUserWithEmailAndPassword(email, password).then( res =>{
          // console.log(res.user.uid);
        const uid = res.user.uid;
          this.db.collection('users').doc(uid).set({
            name : name,
            uid : uid
          })
        
        resolve(res)
      }).catch( err => reject(err))
    })
    

  }

  loginWithGoogle(){
    return this.google.login({}).then(result =>{
      const user_data_google = result;

    return this.AFauth.signInWithCredential(auth.GoogleAuthProvider.credential(null, user_data_google.accessToken));
    })


  }


}