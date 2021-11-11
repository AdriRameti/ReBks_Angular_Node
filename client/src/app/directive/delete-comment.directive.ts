import { 
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { UserService } from '../services/user.service';
import { BooksService } from 'src/app/services/books/books.service';

@Directive({
  selector: '[appDeleteComment]'
})
export class DeleteCommentDirective {
  condition!:boolean;
  constructor(
    private _BooksService : BooksService,
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) { }
    ngOnInit() {
      this.userService.currentUser.subscribe(user=>{
        var userName = user.userName;
        let slug : string | null = localStorage.getItem('slug');
        if(slug){
          this._BooksService.findDetailsBook(slug).subscribe(data=>{
            var autor = data[0].autor.userName;
            if(userName===autor){
              this.viewContainer.createEmbeddedView(this.templateRef);
            }else{
              this.viewContainer.clear();
            }
          });
        }
      });
    }
    @Input() set appDeleteComment(condition:boolean) {
  this.condition = condition;
}
}

