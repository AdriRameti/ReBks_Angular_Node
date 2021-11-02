import { 
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { UserService } from '../services/user.service';
@Directive({
  selector: '[appShowUser]'
})
export class ShowUserDirective implements OnInit{
  condition!: boolean;
  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) { }
  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        console.log(isAuthenticated,this.condition);
        if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    );
  }

  @Input() set appShowUser(condition: boolean) {
    this.condition = condition;
  }
}