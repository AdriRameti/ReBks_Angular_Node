import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-cat',
  templateUrl: './profile-cat.component.html',
  styleUrls: ['./profile-cat.component.css']
})
export class ProfileCatComponent implements OnInit {
  validaButton!:boolean;
  user: User = {} as User;
  errors: Object = {};
  isSubmitting = false;
  listFollow!: String[];
  listFavorite!:String[];
  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) { }
    profileForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      repeatPass: new FormControl('', Validators.required),
      image:new FormControl('')
    });
  ngOnInit(): void {
    Object.assign(this.user, this.userService.getCurrentUser());
    // Fill the form
    this.profileForm.patchValue(this.user);
    this.validaButton = (document.getElementById('continueForm') as HTMLInputElement)?.disabled
    if(this.validaButton == false){
      this.changeStyle();
    }
    this.listFollow = this.userService.getCurrentUser().follow;
    this.listFavorite = this.userService.getCurrentUser().favorites;
  }

  changeStyle(){
    const nameError = (document.getElementById('nameError')as HTMLElement);
    const emailError = (document.getElementById('emailError')as HTMLElement);
    const passwordError = (document.getElementById('passwordError')as HTMLElement);
    const repeatPassError = (document.getElementById('repeatPassError')as HTMLElement);
    passwordError.innerHTML="<span style='color:red'>*Este campo es obligatorio*<span>";
    repeatPassError.innerHTML="<span style='color:red'>*Este campo es obligatorio*<span>";

    
    this.profileForm.controls['userName'].valueChanges.subscribe(nameValue=>{
      if(!nameValue){
        nameError.innerHTML="<span style='color:red'>*Este campo es obligatorio*<span>";
      }else{
        nameError.innerHTML='';
      }
    })

    this.profileForm.controls['email'].valueChanges.subscribe(emailValue=>{
      if(!emailValue){
        emailError.innerHTML="<span style='color:red'>*Debes utilizar la sintaxis name@servidor.com *<span>";
      }else{
        emailError.innerHTML='';
      }
    })
    this.profileForm.controls['password'].valueChanges.subscribe(passwordValue=>{
      if(!passwordValue){
        passwordError.innerHTML="<span style='color:red'>*Este campo es obligatorio*<span>";
      }else{
        passwordError.innerHTML='';
      }
    })
    this.profileForm.controls['repeatPass'].valueChanges.subscribe(passwordValue=>{
      if(!passwordValue){
        repeatPassError.innerHTML="<span style='color:red'>*Este campo es obligatorio*<span>";
      }else{
        repeatPassError.innerHTML='';
      }
    })
  }
  
  continue(){
    this.isSubmitting = true;

    const password = this.profileForm.controls['password'].value;
    const repeatPass = this.profileForm.controls['repeatPass'].value;
    const repeatPassError = (document.getElementById('repeatPassError')as HTMLElement);
    const passwordError = (document.getElementById('passwordError')as HTMLElement);
    if(password != repeatPass){
      repeatPassError.innerHTML="<span style='color:red'>*Las contraseñas no coinciden*<span>";
      passwordError.innerHTML="<span style='color:red'>*Las contraseñas no coinciden*<span>";
    }else{
      this.updateUser(this.profileForm.value);

      this.userService
      .update(this.user)
      .subscribe(
        updatedUser =>{
          this.router.navigateByUrl('/');
        } 
      );
    }


  }

  updateUser(values: Object) {
    Object.assign(this.user, values);
  }
}
