import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireList} from 'angularfire2/database';
import { Upload } from './upload';
import { UserService} from '../../shared/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { MyFireService } from '../../shared/myfire.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class UploadService {

  constructor(
    public af: AngularFireModule , public db: AngularFireDatabase,public usr:UserService , 
    public myfire:MyFireService , public notifier : NotificationService,
    private http: HttpClient 
    ) { }


  private fiiilnam : string ;
  private fiilid : string ;
  private reference : string ; 
  private basePath:string = '/uploads';
  private uploadTask: firebase.storage.UploadTask;
  uploads: AngularFireList<Upload[]>;


 pushUpload(upload: Upload,array : any[],valustatu:any) {
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    
   this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = this.uploadTask.snapshot.downloadURL || null
        upload.name = upload.file.name
        this.fiiilnam = upload.name;
    
      //  this.openfileordown(this.fiiilnam);
        this.saveFileData(upload,array,valustatu);
      }
    );
  }


  // FUNCTION TO SEE THE FILE 
viewfile(fiiilname:string){
    let storageRef = firebase.storage().ref();
       storageRef.child(`uploads/${fiiilname}`).getDownloadURL().then(function(uri){
        var url = encodeURI(uri);
        var  extra = "https://docs.google.com/gview?url=" ;
        extra+=url;
        extra+="&embedded=true";
        window.open(extra);
    });
}

//funtion to open the file or download it 

openfileordown(fiiilname:string){
  let storageRef = firebase.storage().ref();

     storageRef.child(`uploads/${fiiilname}`).getDownloadURL().then(function(url){
    
      window.open(url);
  });
}
open(url){
  window.open(url);
}


ladate : any =new Date(Date.now());
yesterday : any = new Date(Date.now() - 864e5);
// FUNCTION TO MAKE REFERENCE IN THE REAL TIME DATA BASE 
makeref(uid,array:any[],valustatu:any){
const ussss = this.usr.getProfile();
var newPostKey = firebase.database().ref().child('allposts').push().key;
var fileID = newPostKey;
    var postData = {
      FileName:this.fiiilnam,
      authorName: ussss.name,
      uid: ussss.uid,
      favoritecount:'0',
      filestatu:valustatu,
      AllowUsers:array,
      description : prompt('add a description'),
      email:ussss.email,
      Creationdate :new Date().toDateString() ,
      idfile : fileID,
      liked:false
    };
    var newPostKey = firebase.database().ref().child('allposts').push().key;
    var updates = {};    
  updates['/user-posts/' + ussss.uid + '/' + fileID] = postData;
  updates['/allposts/' + fileID] = postData;
  updates['/Uploaded-Files/' + fileID] = postData;
  this.notifier.display('success','File Uploaded Successfully!!');
  return firebase.database().ref().update(updates);
  }
  /*********************************************** */

  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name)
    })
    .catch(error => console.log(error))
  }

  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
   // return this.uploadTask;
 return this.db.list(`${this.basePath}/`).remove(key);

  }
  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
 deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }

  // Writes the file details to the realtime db
private saveFileData(upload: Upload,array:any[],valustatu:any) {
    this.db.list(`${this.basePath}/`).push(upload);
    this.makeref(55,array,valustatu);
}

  

handlefavoriteclicked(fileData){

  const uid=firebase.auth().currentUser.uid;
  
  var updates = {};    
    updates['/allposts/' + fileData.name + '/oldfavoritecount' ] = fileData.favoritecount;
    updates['/allposts/' + fileData.name + '/favoritescount'] = fileData.favoritecount + 1 ;
    updates['/favorites/' + uid + "/" + fileData.name] = fileData;
  
      
    return firebase.database().ref().update(updates);
  
  }
 
}

