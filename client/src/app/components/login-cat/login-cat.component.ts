import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ValidationErrors ,Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-cat',
  templateUrl: './login-cat.component.html',
  styleUrls: ['./login-cat.component.css']
})
export class LoginCatComponent implements OnInit {
  validaButton!:boolean;
  constructor(private router:Router) { }
  loginForm = new FormGroup({
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  ngOnInit(): void {
    this.validaButton = (document.getElementById('continueForm') as HTMLInputElement)?.disabled
    if(this.validaButton == false){
      this.changeStyle();
    }
  }

  continue(){
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;
    console.log(email,password);

  }

  changeStyle(){
    const emailError = (document.getElementById('emailError')as HTMLElement);
    const passwordError = (document.getElementById('passwordError')as HTMLElement);
    emailError.innerHTML="<span style='color:red'>*Debes utilizar la sintaxis name@servidor.com *<span>";
    passwordError.innerHTML="<span style='color:red'>*Este campo es obligatorio*<span>";

    this.loginForm.controls['email'].valueChanges.subscribe(emailValue=>{
      if(!emailValue){
        emailError.innerHTML="<span style='color:red'>*Debes utilizar la sintaxis name@servidor.com *<span>";
      }else{
        emailError.innerHTML='';
      }
    })
    this.loginForm.controls['password'].valueChanges.subscribe(passwordValue=>{
      if(!passwordValue){
        passwordError.innerHTML="<span style='color:red'>*Este campo es obligatorio*<span>";
      }else{
        passwordError.innerHTML='';
      }
    })
    
  }
  redirect(){
    this.router.navigate(['register']);
  }
}
