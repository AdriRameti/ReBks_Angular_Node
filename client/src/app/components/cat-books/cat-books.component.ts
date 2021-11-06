import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BooksService } from 'src/app/services/books/books.service';
import { Books } from 'src/app/models/books';
import { SearchService } from 'src/app/services/search/search.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-cat-books',
  templateUrl: './cat-books.component.html',
  styleUrls: ['./cat-books.component.css']
})
export class CatBooksComponent implements OnInit {
  currentUser!:User;
  listBooks !: Books[];
  dataSearch!:string;
  constructor(
    private route : ActivatedRoute, 
    private _BooksService: BooksService,
    private searchService: SearchService,
    private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      localStorage.setItem('asignatura',params.asignaturas);
    })

    this.searchService.searchEmitter.subscribe(data=>{
      this.dataSearch = data;
      this.changeOption();
    });
    this.changeOption();

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
  followButton(slug:string){
    var optionfollow = localStorage.getItem('option-follow');
    var btn_like = document.getElementById(slug+'FLLW') as HTMLElement;
    if(optionfollow=='0'){
      btn_like.classList.add('green');
    }else{
      btn_like.classList.remove('green');
    }
  }
  changeOption(){
    if(this.dataSearch){
      let asignaturas : string | null = localStorage.getItem('asignatura');
      let myUrl = '';
      myUrl = 'books/'+asignaturas;
      localStorage.setItem('BeforeUrl',myUrl);
      this.searchSubject();
    }else{
      this.obtenerLibros();
    }
  }
  searchSubject(){
    this.router.navigate(['search']);
  }
  obtenerLibros(){
    let asignaturas : string | null = localStorage.getItem('asignatura');
    let curso : number = parseInt(localStorage.getItem('curso') || "0");
    let tituEnsen: string | null = localStorage.getItem('ensenanza');

    if(asignaturas && curso && tituEnsen){

      this._BooksService.findBooks(asignaturas,curso,tituEnsen).subscribe(data =>{

        this._BooksService.paginationEmitter.emit(data);
        let limitBooks : number =  parseInt(localStorage.getItem('limit') || "0");
        let skip : number = parseInt(localStorage.getItem('skip') || '0');

        if(asignaturas && curso && tituEnsen&&limitBooks){
          this._BooksService.findBooksPag(asignaturas,curso,tituEnsen,limitBooks,skip).subscribe(data =>{
            this.listBooks = data;
            
          setTimeout(() => {
            this.userService.currentUser.subscribe(datos=>{
              this.currentUser = datos;

              this.listBooks.forEach(element=>{
                var lookFav = this.currentUser.favorites.includes(element.slug);
                
                if(lookFav==true){
                  var btn_like = document.getElementById(element.slug) as HTMLElement;
                  btn_like.classList.add('red');
                }
              })
            });
          },10);
          })
        }else{
          this.listBooks = data;
        }
      },error=>{
        console.log(error);
      })
    }else{
      console.log('Error en las variables');
    }
  }

}
