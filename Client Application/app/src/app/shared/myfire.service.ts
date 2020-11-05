import * as firebase from 'firebase';
import { promise } from 'protractor';
import { reject } from 'q';
import { resolve } from 'path';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireList} from 'angularfire2/database';
import { NotificationService } from './notification.service';
@Injectable()
export class MyFireService{
  
constructor(private user: UserService , private notifier : NotificationService){}

GetUserFromDatabase(uid){

    const ref = firebase.database().ref('users/'+uid);
    return ref.once('value').then(snapshat =>snapshat.val());
}

handleImageload(data){
const user = this.user.getProfile();

const newpersonalpostkey = firebase.database().ref().child('myposts').push().key;

let personalpostdetail = {
    fileUrl:data.fileUrl,
    name:data.fileName,
    creationDate:new Date().toString()
};


const allpostkey = firebase.database().ref('Uploads/').push().key;
const allpostdeatils={
    fileUrl:data.fileUrl,
    name:data.fileName,
    creationDate:new Date().toString(),
    uploadedby:user
};

const imagesdetails={
    fileUrl:data.fileUrl,
    name:data.fileName,
    creationDate:new Date().toString(),
    uploadedby:user,
    favoritecount:0
};


const updates = [];
updates['/myposts/'+ user.uid +"/" + newpersonalpostkey]=  personalpostdetail;
updates['/allposts/'+ allpostkey]=  allpostdeatils;
updates['/images/'+ data.fileName]=  imagesdetails;

return firebase.database().ref().update(updates);

}

generaterandomname(){
let text = "";
const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefjhijklmnopqrstuvwxyz0123456789";
for(let i = 0 ; i<5 ; i++){
    text+=possible.charAt(Math.floor(Math.random()*possible.length));
}
return text;
}
uploadFile(file){
   
const fileName = this.generaterandomname();

const fileRef = firebase.storage().ref().child('Uploads/' + fileName);
const uploadTask =fileRef.put(file);

return new Promise((resolve,reject)=>{
    uploadTask.on('state_changed', snapshot => {
}, error => {
reject(error); 
}, () => {
const fileUrl = uploadTask.snapshot.downloadURL;
resolve({fileName,fileUrl});

});
})

};

getuserpostref(uid){

return firebase.database().ref('user-posts').child(uid);
}

getuserref(){

    return firebase.database().ref('users').child(name);
}

handlefavoriteclicked( fileData){

const uid=firebase.auth().currentUser.uid;

var updates = {};    
  updates['/allposts/' + fileData.name + '/oldfavoritecount' ] = fileData.favoritecount;
  updates['/allposts/' + fileData.name + '/favoritescount'] = fileData.favoritecount + 1 ;
  updates['/favorites/' + uid + "/" + fileData.name] = fileData;

    
  return firebase.database().ref().update(updates);

}
    
}

