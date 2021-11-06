import {Books} from "./books";
export interface User {
    id:string;
    email: string;
    token: string;
    userName: string;
    favorites: string[];
    follow:string[];
    comments:[Comment]
  }
  export interface Comment{
    body:string;
    autor:User;
    book:Books;
  }
  