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
      console.log(data[0].users);
      this.listUser = data[0].users;
      this.listComments = data;
    });
  }

  rating(valor:number){
    var valId1; var valId2; var valId3; var valId4; var valId5;
    var firstStar; var secondStar; var threeStar; var fourStar; var fiveStar;

    switch(valor){
      case 1:
        valId1 = valor.toString();
        firstStar = document.getElementById(valId1) as HTMLElement;
        secondStar = document.getElementById("2") as HTMLElement;
        threeStar = document.getElementById("3") as HTMLElement;
        fourStar = document.getElementById("4") as HTMLElement;
        fiveStar = document.getElementById("5") as HTMLElement;

        firstStar.classList.add('rating');
        secondStar.classList.remove('rating');
        threeStar.classList.remove('rating');
        fourStar.classList.remove('rating');
        fiveStar.classList.remove('rating');
        break;
      case 2:
        valId2 = valor.toString();
        firstStar = document.getElementById("1") as HTMLElement;
        secondStar = document.getElementById(valId2) as HTMLElement;
        threeStar = document.getElementById("3") as HTMLElement;
        fourStar = document.getElementById("4") as HTMLElement;
        fiveStar = document.getElementById("5") as HTMLElement;

        firstStar.classList.add('rating');
        secondStar.classList.add('rating');
        threeStar.classList.remove('rating');
        fourStar.classList.remove('rating');
        fiveStar.classList.remove('rating');
        break;
      case 3:
        valId3 = valor.toString();
        firstStar = document.getElementById("1") as HTMLElement;
        secondStar = document.getElementById("2") as HTMLElement;
        threeStar = document.getElementById(valId3) as HTMLElement;
        fourStar = document.getElementById("4") as HTMLElement;
        fiveStar = document.getElementById("5") as HTMLElement;

        firstStar.classList.add('rating');
        secondStar.classList.add('rating');
        threeStar.classList.add('rating');
        fourStar.classList.remove('rating');
        fiveStar.classList.remove('rating');
        break;
      case 4:
        valId4 = valor.toString();
        firstStar = document.getElementById("1") as HTMLElement;
        secondStar = document.getElementById("2") as HTMLElement;
        threeStar = document.getElementById("3") as HTMLElement;
        fourStar = document.getElementById(valId4) as HTMLElement;
        fiveStar = document.getElementById("5") as HTMLElement;

        firstStar.classList.add('rating');
        secondStar.classList.add('rating');
        threeStar.classList.add('rating');
        fourStar.classList.add('rating');
        fiveStar.classList.remove('rating');
        break;
      case 5:
        valId5 = valor.toString();
        firstStar = document.getElementById("1") as HTMLElement;
        secondStar = document.getElementById("2") as HTMLElement;
        threeStar = document.getElementById("3") as HTMLElement;
        fourStar = document.getElementById("4") as HTMLElement;
        fiveStar = document.getElementById(valId5) as HTMLElement;

        firstStar.classList.add('rating');
        secondStar.classList.add('rating');
        threeStar.classList.add('rating');
        fourStar.classList.add('rating');
        fiveStar.classList.add('rating');
        break;
    }
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
