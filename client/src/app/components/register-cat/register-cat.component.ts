import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ValidationErrors , Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-register-cat',
  templateUrl: './register-cat.component.html',
  styleUrls: ['./register-cat.component.css']
})
export class RegisterCatComponent implements OnInit {
  validaButton!:boolean;
  isSubmitting = false;
  authType: String = '';
  constructor(private router:Router,private userService: UserService) { }
  registerForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    repeatPass: new FormControl('', Validators.required)
  });
  ngOnInit(): void {
    this.validaButton = (document.getElementById('continueForm') as HTMLInputElement)?.disabled
    if(this.validaButton == false){
      this.changeStyle();
    }
  }

  continue(){
    const userName = this.registerForm.controls['userName'].value;
    const email = this.registerForm.controls['email'].value;
    const password = this.registerForm.controls['password'].value;
    const repeatPass = this.registerForm.controls['repeatPass'].value;
    const repeatPassError = (document.getElementById('repeatPassError')as HTMLElement);
    const passwordError = (document.getElementById('passwordError')as HTMLElement);

    if(password != repeatPass){
      repeatPassError.innerHTML="<span style='color:red'>*Las contraseñas no coinciden*<span>";
      passwordError.innerHTML="<span style='color:red'>*Las contraseñas no coinciden*<span>";
    }else{
      this.isSubmitting = true;
      this.authType='register';
      const credentials = this.registerForm.value;
      this.userService.attemptAuth(this.authType,credentials).subscribe(data=>{
        this.router.navigate(['']);
      })

    }

  }

  changeStyle(){
    const nameError = (document.getElementById('nameError')as HTMLElement);
    const emailError = (document.getElementById('emailError')as HTMLElement);
    const passwordError = (document.getElementById('passwordError')as HTMLElement);
    const repeatPassError = (document.getElementById('repeatPassError')as HTMLElement);
    nameError.innerHTML="<span style='color:red'>*Este campo es obligatorio*<span>";
    emailError.innerHTML="<span style='color:red'>*Debes utilizar la sintaxis name@servidor.com *<span>";
    passwordError.innerHTML="<span style='color:red'>*Este campo es obligatorio*<span>";
    repeatPassError.innerHTML="<span style='color:red'>*Este campo es obligatorio*<span>";
    this.registerForm.controls['userName'].valueChanges.subscribe(nameValue=>{
      if(!nameValue){
        nameError.innerHTML="<span style='color:red'>*Este campo es obligatorio*<span>";
      }else{
        nameError.innerHTML='';
      }
    })

    this.registerForm.controls['email'].valueChanges.subscribe(emailValue=>{
      if(!emailValue){
        emailError.innerHTML="<span style='color:red'>*Debes utilizar la sintaxis name@servidor.com *<span>";
      }else{
        emailError.innerHTML='';
      }
    })
    this.registerForm.controls['password'].valueChanges.subscribe(passwordValue=>{
      if(!passwordValue){
        passwordError.innerHTML="<span style='color:red'>*Este campo es obligatorio*<span>";
      }else{
        passwordError.innerHTML='';
      }
    })
    this.registerForm.controls['repeatPass'].valueChanges.subscribe(passwordValue=>{
      if(!passwordValue){
        repeatPassError.innerHTML="<span style='color:red'>*Este campo es obligatorio*<span>";
      }else{
        repeatPassError.innerHTML='';
      }
    })
  }

  redirect(){
    this.router.navigate(['login']);
  }
}
