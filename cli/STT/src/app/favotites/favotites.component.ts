import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';
import { NgForm } from '@angular/forms';
import * as pdfjsLib from 'pdfjs-dist';

@Component({
  selector: 'app-favotites',
  templateUrl: './favotites.component.html',
  styleUrls: ['./favotites.component.scss']
})
export class FavotitesComponent implements OnInit {


  @Input() checkeduser ;

 checkedusers : any = [];
  usersnames : any = [];
  loadMoreRefusers : any ;
  userRef : any ; 
   nbusers = 1  ; 
  constructor() { }

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
  




  onSubmit(form : NgForm){


  }
  



}
