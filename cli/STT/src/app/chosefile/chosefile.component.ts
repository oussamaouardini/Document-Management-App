import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UploadService } from '../uploads/shared/upload.service';
import { NotificationService } from '../shared/notification.service';
import { MyFireService } from '../shared/myfire.service';
import { Upload } from '../uploads/shared/upload';
import { element } from 'protractor';
@Component({
  selector: 'app-chosefile',
  templateUrl: './chosefile.component.html',
  styleUrls: ['./chosefile.component.scss']
})
export class ChosefileComponent implements OnInit {

  constructor( private upSvc: UploadService , private myfire : MyFireService
    , private notifier : NotificationService ) { }

  usersnames : any = [];
  nbusers = 1  ; 
  userRef : any ; 
  selectedFiles: FileList;
  selectedstatu :boolean = false;
  currentUpload: Upload;

  expression : boolean = false;

  checkedusers : any = []; 
  valuestatu : any ; 

  ngOnInit() {


    this.userRef = firebase.database().ref('users').limitToFirst(100000);
    this.userRef.on('child_added',data =>{
      this.usersnames.push({
        key :data.key,
        data : data.val()
      });
     this.nbusers = this.nbusers +1 ;
    });



  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
}

selectionChange(input: HTMLInputElement){

  if((input.checked === false)){
   
for(var i = 0 ;i<this.nbusers ; i++){

if(this.checkedusers[i]=== input.value){
  delete this.checkedusers[i];
  
}
}
}

if(input.checked === true){
this.checkedusers.push(input.value);
}  
}



  uploadSingle() {


var desc =  (document.getElementById('form107')as HTMLInputElement).value
   
console.log(desc);

    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload,this.checkedusers,this.valuestatu,desc );

}


statuu(input: HTMLInputElement){
  console.log('logues');
  
    if(input.value == 'private')
    {
     this.expression = true;
     
      this.selectedstatu = true ; 
    }
    else if(input.value == 'public')
    {
      this.expression = false;
      
      this.selectedstatu = true ; 
    }

    this.valuestatu = input.value;
return (input.value);

  }





}
