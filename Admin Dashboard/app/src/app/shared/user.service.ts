import { EventEmitter } from '@angular/core';
import * as firebase from 'firebase';

export class UserService{

   statusChange : any = new EventEmitter<any>();


   /// Function TO SET USER DATA FROM DATA BASE
set(userFromDatabase){
    
localStorage.setItem('user',JSON.stringify(userFromDatabase));
this.statusChange.emit(userFromDatabase);
}


/// Function TO GET USER DATA FROM DATA BASE
getProfile(){
    const user = localStorage.getItem('user');
    return JSON.parse(user);
} 

/// Function TO DESTROY  USER DATA FROM DATA BASE

destroy(){
    localStorage.removeItem('user');
    this.statusChange.emit(null);
}



}