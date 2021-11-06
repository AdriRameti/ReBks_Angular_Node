import { User } from "./user";
export interface Books{
    ensenanza:string,
    curso:number,
    asignatura:string,
    titulo:string,
    editorial:string,
    any:number,
    tapa:string,
    estado:string,
    descripcion:string,
    precio:string,
    img: Images,
    slug:string,
    autor:User,
    _id:string
}

export interface Images{
    portada:String,
    subPortada:string,
    imgVenta1:string,
    imgVenta2:string
}