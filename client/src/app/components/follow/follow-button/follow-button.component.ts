import { Component,EventEmitter, Input, Output, OnInit,ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { concatMap ,  tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Books } from 'src/app/models/books';
import { UserService } from 'src/app/services/user.service';
import { UsersService } from 'src/app/services/user/users.service';
@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent{

  constructor(
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private usersService:UsersService
  ) { }

  @Input() books!: Books;
  @Output() follow_btn = new EventEmitter<string>();
  ngOnInit(): void {
  }
  follow(){
    console.log('follow',this.books);
    var credentials = localStorage.getItem('credentials') || "";
    var myCredentials = null
    if(credentials == ""){
    }else{
      try {
      myCredentials = JSON.parse(credentials);
      } catch(e) {
      }
    }
    var email =myCredentials["email"]
    var userName = this.books.autor.userName;
    console.log(userName);
    var MyObjejct = {user:{
      userName:userName,
      email:email
    }}
    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated)=>{
      if (!authenticated) {
        this.router.navigateByUrl('/login');
        return of(null);
      }
      return this.usersService.showFollow(userName)
      .pipe(tap(
        data => {
        }
      ));
    }
    )).subscribe((data)=>{
      console.log(data.length);
      if(data.length===0){
        this.usersService.follow(MyObjejct).subscribe(data=>{
          console.log(data);
          if(data==0){
            localStorage.setItem('option-follow',"0");
            this.follow_btn.emit(userName);
          }
        });
      }else{
        this.usersService.follow(MyObjejct).subscribe(data=>{
          if(data==1){
            localStorage.setItem('option-follow',"1");
            this.follow_btn.emit(userName);
          }
        });
      }
      this.cd.markForCheck();
    });
  }
}
