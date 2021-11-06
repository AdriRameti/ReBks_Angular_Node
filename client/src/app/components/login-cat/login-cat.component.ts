import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ValidationErrors ,Validator, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login-cat',
  templateUrl: './login-cat.component.html',
  styleUrls: ['./login-cat.component.css']
})
export class LoginCatComponent implements OnInit {
  validaButton!:boolean;
  authType: String = '';
  constructor(private router:Router,private userService: UserService) { }
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
    const credentials = this.loginForm.value;
    var cred = JSON.stringify(credentials);
    localStorage.setItem("credentials",cred);
    this.authType='login';
    this.userService.attemptAuth(this.authType,credentials).subscribe(data=>{
      this.router.navigateByUrl('/')
    })

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
