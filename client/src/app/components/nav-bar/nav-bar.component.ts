import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentUser!:User;
  constructor(private userService: UserService,) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        
      }
    );
  }

}
