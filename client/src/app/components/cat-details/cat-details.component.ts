import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { BooksService } from 'src/app/services/books/books.service';
import { Books } from 'src/app/models/books';
import { SearchService } from 'src/app/services/search/search.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ValidationErrors ,Validator, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UsersService } from 'src/app/services/user/users.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-cat-details',
  templateUrl: './cat-details.component.html',
  styleUrls: ['./cat-details.component.css']
})
export class CatDetailsComponent implements OnInit {

  listDetails!: Books[];
  dataSearch!:string;
  listComments!:User[];
  listUser!:User[];
  constructor(
    private route : ActivatedRoute, 
    private _BooksService : BooksService,
    private searchService: SearchService,
    private router:Router,
    private userService:UserService,
    private UserService:UsersService
    ) { }
    commentForm = new FormGroup({
      comment: new FormControl('', Validators.required)
    });
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      localStorage.setItem('slug',params.slug);
    });
    this.searchService.searchEmitter.subscribe(data=>{
      this.dataSearch = data;
      this.changeOption();
    });
    this.changeOption();
    this.UserService.showComments().subscribe(data=>{
      console.log(data);
      this.listComments = data;
    });
  }

  rating(valor:number){
    console.log(valor);
  }
  post(){
    var body = this.commentForm.controls['comment'].value;
    var authent;
    var autor;
    var book = this.listDetails[0]._id;
    this.userService.isAuthenticated.subscribe((authenticated)=>{
      if(authenticated==false){
        this.router.navigateByUrl('/login');
        authent = authenticated
        return authenticated;
      }else{
        authent = authenticated
        this.userService.currentUser.subscribe(datos=>{
          autor=datos.id;
        });
        return authent
      }
    });
    if((body)&&(authent==true)&&(autor)&&(book)){
      var comment = {
        body:body,
        autor:autor,
        book:book
      };

      this.UserService.comments(comment).subscribe(data=>{
      })
    }
  }
  changeOption(){
    if(this.dataSearch){
      let slug : string | null = localStorage.getItem('slug');
      let myUrl = '';
      myUrl = 'details/'+slug;
      localStorage.setItem('BeforeUrl',myUrl);
      this.searchSubject();
    }else{
      this.obtenerDetails();
    }
  }
  searchSubject(){
    this.router.navigate(['search']);
  }
  obtenerDetails(){
    let slug : string | null = localStorage.getItem('slug');
    if(slug){
      this._BooksService.findDetailsBook(slug).subscribe(data=>{
        this.listDetails = data;
      });
    }

  }
}
