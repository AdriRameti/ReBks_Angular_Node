import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books/books.service';
import { Books } from 'src/app/models/books';
import { SearchService } from 'src/app/services/search/search.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit {
  currentUser!:User;
  listAllBooks!: Books[];
  dataSearch!:string;
  constructor(
    private _BooksService: BooksService,
    private searchService: SearchService,
    private router:Router,
    private userService:UserService,
    ) { }

  ngOnInit(): void {
    this.searchService.searchEmitter.subscribe(data=>{
      this.dataSearch = data;
      this.changeOption();
    });
    this.changeOption();
  }
  changeOption(){
    if(this.dataSearch){
      let myUrl = '';
      myUrl = 'books';
      localStorage.setItem('BeforeUrl',myUrl);
      this.searchSubject();
    }else{
      this.obtenerTodosLibros();
    }
  }
  toggleButton(slug:string){
    var option = localStorage.getItem('option');
    var btn_like = document.getElementById(slug) as HTMLElement;
    if(option=='0'){
      btn_like.classList.add('red');
    }else{
      btn_like.classList.remove('red');
    }
    
  }
  followButton(userName:string){
    var optionfollow = localStorage.getItem('option-follow');
    var btn = document.querySelectorAll('app-follow-button');
    btn.forEach(element=>{
      if((element.id == userName)&&(optionfollow=='0')){
        element.classList.add('green');
      }else{
        element.classList.remove('green');
      }
    })
  }
  searchSubject(){
    this.router.navigate(['search']);
  }
  obtenerTodosLibros(){
    let limitBooks : number =  parseInt(localStorage.getItem('limit') || "0");
    let skip : number = parseInt(localStorage.getItem('skip') || '0');
    this._BooksService.findAllBooks(limitBooks,skip).subscribe(data => {
      this._BooksService.paginationEmitter.emit(data);
      this.listAllBooks = data;
      setTimeout(() => {
        this.userService.currentUser.subscribe(datos=>{
          this.currentUser = datos;
          var lookFav = false
          this.listAllBooks.forEach(element=>{
            
            if(this.currentUser.favorites){
              lookFav = this.currentUser.favorites.includes(element.slug);
            }
            if(lookFav==true){
              var btn_like = document.getElementById(element.slug) as HTMLElement;
              btn_like.classList.add('red');
            }
          })
        });
        this.userService.currentUser.subscribe(datos=>{
          this.currentUser=datos;
          var lookFoll = false;
          this.listAllBooks.forEach(element=>{
            if(this.currentUser.follow){
              lookFoll = this.currentUser.follow.includes(element.autor.userName);
              if(lookFoll==true){
                var name = element.autor.userName
                var btn = document.querySelectorAll('app-follow-button');
                btn.forEach(element=>{
                  if((element.id == name)){
                    element.classList.add('green');
                  }else{
                    element.classList.remove('green');
                  }
                })
              }
            }

          })
        })
      },10);
    });
  }
}
