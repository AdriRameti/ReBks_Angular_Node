
export interface Books{
    ensenanza:string,
    curso:number,
    asignatura:string,
    titulo:string,
    editorial:string,
    año:number,
    tapa:string,
    estado:string,
    descripcion:string,
    precio:string,
    img: Images
}

export interface Images{
    portada:String,
    subPortada:string,
    imgVenta1:string,
    imgVenta2:string
}