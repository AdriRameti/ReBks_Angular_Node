import {Books} from "./books";
export interface User {
    id:string;
    email: string;
    token: string;
    userName: string;
    favorites: string[];
    follow:string[];
    comments:Comment;
    users:User;
  }
  export interface Comment{
    body:string;
    autor:User;
    book:Books;
  }
  