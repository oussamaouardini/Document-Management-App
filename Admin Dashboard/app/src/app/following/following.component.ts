import { Component, OnInit , OnDestroy} from '@angular/core';

import * as firebase from 'firebase'; 
import { MyFireService } from '../shared/myfire.service';
import { NotificationService } from '../shared/notification.service';
import { UploadService } from '../uploads/shared/upload.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {

  constructor(private myfire:MyFireService,private notifier : NotificationService,private upp : UploadService , private userService : UserService) { }
  allRef : any ;
  favRef : any ; 
  fav : any = [];
  loadMoreRef : any ; 
  all : any = [];
  tim=false;
  ladate : any =new Date(Date.now()) ;
   yesterday : any = new Date(Date.now() - 864e5);
   nbfile = 0 ;
   favposts : any = [];
   favref : any ; 
   likked : false ; 
   favoritepostuser : any = [];
   favoritepostuserref:any ; 
   cureentusruser : any = this.userService.getProfile().uid;
  kulchi : any = [];
  following :  any = [];
  ngOnInit() {
var tou ;
    
  
this.allRef = firebase.database().ref('Uploaded-Files').limitToFirst(10000);
this.allRef.on('child_added',data => {
  this.all.push({
  
    key : data.key , 
    data : data.val()
    
  });
  this.kulchi.push(data.key);
});



firebase.database().ref("Uploaded-Files").once('value').then(snapshot =>{
  Object.entries(snapshot.val());
 tou =   Object.entries(snapshot.val()).length;
 for(var j = 0 ; j < tou ; j++){

  console.log(this.all);
 // console.log("hhhhhhhhhhhhhhhhh",this.all[j].data.likedby.length);
 if( this.all[j].data.likedby == undefined || this.all[j].data.likedby == null ){

 }else{
  for(var k = 0 ; k <this.all[j].data.likedby.length;k++){
    if(this.all[j].data.likedby[k] == this.userService.getProfile().uid)
    {
      console.log(this.all[j]);
      this.following.push(this.all[j]);
    }
  }
 }
 
//console.log(this.following);

 /*
  for(var k = 0 ; k <this.all[j].data.likedby.length;k++){
    if(this.all[j].data.likedby[k] == this.userService.getProfile().uid)
    {
      console.log(this.all[j]);
    }
  }*/
 // console.log(j);
}

  
/*
  for(var i = 0 ; i <  Object.entries(snapshot.val()).length;i++){
    console.log(Object.entries(snapshot.val())[i]);
  }*/
})





this.favref = firebase.database().ref('Uploaded-Files').limitToFirst(10000);
  this.favref.on('child_added',data=>{
  
    firebase.database().ref('/Uploaded-Files/').child(data.key).once('value').then(snapshot =>{
    
    
 

      if(snapshot.val().liked ==true ||snapshot.val().liked ===true ){
        this.favposts.push({
          key:data.key,
          data:data.val(),
               });
        var j ;




        for( j=0;j <this.nbfile;j++){
         
            let icon = document.querySelectorAll('i');
          icon[j].setAttribute("class","fa fa-heart fa-2x ");

          
        
        
          
          
          }
        
      }



 });
  });




  let icon = document.querySelectorAll('i');
    for(let i = 0; i < icon.length; i++){
      icon[i].setAttribute("class"," fa fa-heart fa-2x red ");
    }



  }
  onLoadMore(){
    

    if(this.fav.length >0){
      const lastLoadedPostt = this.fav[this.fav.length-1];
      const lastLoadedPostkey = lastLoadedPostt.key ; 

      this.loadMoreRef = firebase.database().ref('Uploaded-Files').startAt(null , lastLoadedPostkey).limitToFirst(3+1)
      this.loadMoreRef.on('child_added',data => {

        if(data.key === lastLoadedPostkey){
          return ;
        } else {
          this.fav.push ({
            key : data.key , 
            data : data.val()
          });
        }
      });
    }
  }

  ngOnDestroy() {
  this.allRef.off();

  }



  onfavoritesclicked(fileData){

    this.upp.handlefavoriteclicked(fileData).then(fileData=>{
      
      this.notifier.display('succes','image added to favorites');
    }).catch(err=>{

this.notifier.display('error','error adding image to favorites ');
    })

  }
}
