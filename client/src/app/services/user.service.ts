import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';
import { map ,  distinctUntilChanged } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import { User } from '../models/user';
import { UsersService } from './user/users.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  
  constructor(private jwtService: JwtService, private usersService: UsersService) { }

  populate(){
    var credentials = localStorage.getItem("credentials") || "";
    var UserCredentials = null;
    if(credentials == ""){
      this.logOutCleaner();
    }else{
      try {
      UserCredentials = {user:JSON.parse(credentials)};
      } catch(e) {
        localStorage.removeItem('credentials');
      }
    }

    if (this.jwtService.getToken() && UserCredentials) {
      this.usersService.login(UserCredentials)
      .subscribe(
        data => this.setAuth(data.user),
        err => this.logOutCleaner()
      );
    } else {
      this.logOutCleaner();
    }
  }
  
  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }
  attemptAuth(type:any,credentials:Object): Observable<User> {
    if(type==='register'){
      return this.usersService.register({user:credentials})
      .pipe(map(
      data => {
        this.setAuth(data.user);
        return data;
      }
    ));  
    }else{
      return this.usersService.login({user:credentials})
      .pipe(map(
      data => {
        this.setAuth(data.user);
        return data;
      }
    )); 
    }
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  update(user:Object): Observable<User> {
    return this.usersService.update(user)
    .pipe(map(data=>{
      console.log(data);
      this.currentUserSubject.next(data.user);
      return data.user
    }));
  }
  logOutCleaner() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
    // localStorage.setItem('credentials','');
  }

}
