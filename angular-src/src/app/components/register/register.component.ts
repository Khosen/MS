import { Component, OnInit } from '@angular/core';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import  {Router} from '@angular/router';
import { timeout } from 'q';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name:String;
  username:String;
  email:String;
  password:String;

  constructor(private validateService: ValidateService, 
              private flashMessage:FlashMessagesService,
              private router:Router,
              private authService:AuthService
    
    ) { }

  ngOnInit() {
  }

 onRegisterSubmit(){
    const user ={
      name: this.name,
      username:this.username,
      email: this.email,
      password: this.password
    }
    //required fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('please fill in all the fields', {cssClass:'alert-danger', timeout:3000});
      return false;
    }
//required email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('please use correct email', {cssClass:'alert-danger', timeout:3000});
      return false;
     }

  //register user
  this.authService.registerUser(user).subscribe(data =>{
    if(data){
      this.flashMessage.show('you are now reg you can login', {cssClass:'alert-success', timeout:3000});
      this.router.navigate(['/login']);
    }
    else{
      this.flashMessage.show('soemthing went wrong', {cssClass:'alert-danger', timeout:3000});
      this.router.navigate(['/register']); 
  
    }
  });   
}
  
}
