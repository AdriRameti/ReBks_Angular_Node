import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { concatMap ,  tap} from 'rxjs/operators';
import { Books } from 'src/app/models/books';
import { BooksService } from 'src/app/services/books/books.service';
import { UserService } from 'src/app/services/user.service';
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
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }
  @Input() books!: Books;
  @Output() toggle = new EventEmitter<boolean>();
  favorite(){
    console.log('hola');
    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated)=>{
      console.log('entra');
      console.log(authenticated);
      if (!authenticated) {
        this.router.navigateByUrl('/login');
        return of(null);
      }

      //Si no esta favorito lo hacemos favorito
      if (!this.books) {
        return this.booksService.favorite()
        .pipe(tap(
          data => {
            this.toggle.emit(true);
          }
        ));

      //Sino le haremos unfavorite
      } else {
        return this.booksService.unfavorite()
        .pipe(tap(
          data => {
            console.log(data);
            this.toggle.emit(false);
          }
        ));
      }
    }));
    
  }
}
