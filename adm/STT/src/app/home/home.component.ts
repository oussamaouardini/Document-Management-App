import { Component, OnInit } from '@angular/core';
import { UploadService } from '../uploads/shared/upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private upp : UploadService) {  }
  frst_q_1:boolean=false;
  frst_q_2:boolean=false;
  frst_q_3:boolean=false;
  frst_q_4:boolean=false;
  ngOnInit() {
  }
  firstq(){
    var clasds= document.getElementById("frst_q_1").getAttribute("class");
    if(clasds == "frst_q_1 fas fa fa-plus-circle" ){
      this.frst_q_1 = true;
      document.getElementById("frst_q_1").setAttribute("class",' frst_q_1 fas fa fa-minus-circle');
    }else{
      this.frst_q_1 = false;
      document.getElementById("frst_q_1").setAttribute("class",'frst_q_1 fas fa fa-plus-circle');

    }
  }
  secondq(){

    var clasds= document.getElementById("frst_q_2").getAttribute("class");
    if(clasds == "frst_q_2 fas fa fa-plus-circle" ){
      this.frst_q_2 = true;
      document.getElementById("frst_q_2").setAttribute("class",' frst_q_2 fas fa fa-minus-circle');
    }else{
      this.frst_q_2 = false;
      document.getElementById("frst_q_2").setAttribute("class",'frst_q_2 fas fa fa-plus-circle');

    }
  }

  thirdq(){
    var clasds= document.getElementById("frst_q_3").getAttribute("class");
    if(clasds == "frst_q_3 fas fa fa-plus-circle" ){
      this.frst_q_3 = true;
      document.getElementById("frst_q_3").setAttribute("class",' frst_q_3 fas fa fa-minus-circle');
    }else{
      this.frst_q_3 = false;
      document.getElementById("frst_q_3").setAttribute("class",'frst_q_3 fas fa fa-plus-circle');

    }
  }

  fourthq(){
    var clasds= document.getElementById("frst_q_4").getAttribute("class");
    if(clasds == "frst_q_4 fas fa fa-plus-circle" ){
      this.frst_q_4 = true;
      document.getElementById("frst_q_4").setAttribute("class",' frst_q_4 fas fa fa-minus-circle');
    }else{
      this.frst_q_4 = false;
      document.getElementById("frst_q_4").setAttribute("class",'frst_q_4 fas fa fa-plus-circle');

    }
  }


}
