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
import { Comment, User } from 'src/app/models/user';
@Component({
  selector: 'app-cat-details',
  templateUrl: './cat-details.component.html',
  styleUrls: ['./cat-details.component.css']
})
export class CatDetailsComponent implements OnInit {

  listDetails!: Books[];
  dataSearch!:string;
  listComments!:any[];
  listUser!:User[];
  canModify:boolean = false;
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
    this.printRate();
    // this.userService.currentUser.subscribe(user=>{
    //   var userName = user.userName;
    //   let slug : string | null = localStorage.getItem('slug');
    //   if(slug){
    //     this._BooksService.findDetailsBook(slug).subscribe(data=>{
    //       var autor = data[0].autor.userName;
    //       if(userName===autor){
    //         this.canModify= false;
    //       }else{
    //         this.canModify=true;
    //       }
    //     });
    //   }
    // });
  }
  delete(datos:any){
    this._BooksService.deleteComment(datos).subscribe(data=>{
      console.log(data);
      if(data==0){
        let slug : string | null = localStorage.getItem('slug');
        if(slug){
          this._BooksService.findDetailsBook(slug).subscribe(data=>{
            this.listDetails = data;
            this.listComments = data[0].comments;
          });
        }
      }
    })
  }
  redirect(){
    let slug : string | null = localStorage.getItem('slug');
    if(slug){
      this._BooksService.findDetailsBook(slug).subscribe(data=>{
        var id = data[0].autor._id;
        localStorage.setItem('id',id);
        this.router.navigate(['profile']);
      });
    }
  }
  contFav(id:string){
    this.userService.currentUser.subscribe(data=>{

      var body = {
        id:id,
      }
      this._BooksService.updateComment(body).subscribe(data=>{
        let slug : string | null = localStorage.getItem('slug');
        if(slug){
          this._BooksService.findDetailsBook(slug).subscribe(data=>{
            this.listDetails = data;
            this.listComments = data[0].comments;
          });
        }
      });
    });

  }
  printRate(){
    var valId1; var valId2; var valId3; var valId4; var valId5;
    var firstStar; var secondStar; var threeStar; var fourStar; var fiveStar;
    let slug : string | null = localStorage.getItem('slug');
    var id;
    var idBook:any;
    if(slug){
      this._BooksService.findDetailsBook(slug).subscribe(data=>{
        id = data[0].autor._id;
        idBook = data[0]._id;
        this.userService.currentUser.subscribe(data=>{
          id=data.id;
        });
        this.UserService.showRating(id).subscribe(data=>{
          var rating = data.rating;
          for(var i = 0; i<rating.length;i++){
            if(rating[i].book==idBook){
              switch(rating[i].rate){
                case 1:
                  valId1 = rating[i].rate.toString();
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
                  valId2 = rating[i].rate.toString();
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
                  valId3 = rating[i].rate.toString();
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
                  valId4 = rating[i].rate.toString();
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
                  valId5 = rating[i].rate.toString();
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
          }
        })
      });
    }
  }
  rating(valor:number){
    var valId1; var valId2; var valId3; var valId4; var valId5;
    var firstStar; var secondStar; var threeStar; var fourStar; var fiveStar;
    var id;
    let slug : string | null = localStorage.getItem('slug');
    var userId : any;
    this.userService.currentUser.subscribe(data=>{
      userId = data.id;
      var karmaObject={
        id:userId,
        karma:25
      }
      this.UserService.karma(karmaObject).subscribe(data=>{
        console.log(data);
      });
    });
    if(userId&&slug){
      this._BooksService.findDetailsBook(slug).subscribe(data=>{
        id = data[0]._id;
        this.UserService.rating(id,userId,valor).subscribe(data=>{
        })
      });
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
    }else{
      this.router.navigate(['login']);
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
        book:book,
        favorito:0
      };
      this._BooksService.comments(comment).subscribe(data=>{
        if(data == 0){
          let slug : string | null = localStorage.getItem('slug');
          if(slug){
            this._BooksService.findDetailsBook(slug).subscribe(data=>{
              this.listDetails = data;
              this.listComments = data[0].comments;
            });
          }
        }
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
        console.log(data);
        this.listDetails = data;
        this.listComments = data[0].comments;
      });
    }

  }
}
