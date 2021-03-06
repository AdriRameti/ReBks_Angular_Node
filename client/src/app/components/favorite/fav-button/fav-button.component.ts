import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { concatMap ,  tap} from 'rxjs/operators';
import { Books } from 'src/app/models/books';
import { BooksService } from 'src/app/services/books/books.service';
import { UserService } from 'src/app/services/user.service';
import { UsersService } from 'src/app/services/user/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fav-button',
  templateUrl: './fav-button.component.html',
  styleUrls: ['./fav-button.component.css']
})
export class FavButtonComponent{

  constructor(
    private booksService: BooksService,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private usersService:UsersService
  ) { }

  ngOnInit(): void {
  }
  @Input() books!: Books;
  @Output() toggle = new EventEmitter<string>();

  favorite(){
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
    var slug = this.books['slug'];
    var MyObjejct = {user:{
      slug:slug,
      email:email
    }}
    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated)=>{
      if (!authenticated) {
        this.router.navigateByUrl('/login');
        return of(null);
      }
      
      return this.usersService.showFav(slug)
      .pipe(tap(
        data => {
          return data;
        }
      ));
    }
    )).subscribe((data)=>{
      this.userService.currentUser.subscribe(data=>{
        var id = data.id;
        var karmaObject={
          id:id,
          karma:10
        }
        this.usersService.karma(karmaObject).subscribe(data=>{
          console.log(data);
        });
      });
      if(data.length===0){
        this.usersService.favorite(MyObjejct).subscribe(data=>{
          if(data==0){
            localStorage.setItem('option',"0");
            this.toggle.emit(slug);
            
          } 
      });
      }else{
        this.usersService.favorite(MyObjejct).subscribe(data=>{
          if(data==1){
            localStorage.setItem('option',"1");
            this.toggle.emit(slug);
          }
        });
      }
      this.cd.markForCheck();
    });
    
  }
}
