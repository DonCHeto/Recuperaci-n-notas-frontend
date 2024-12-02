export class Alumno {
    id:number;
    nombre:string;
    apellido:string;
    dni:string;
    constructor(id:number=0,nombre:string='', apellido:string='', dni:string=''){
        this.id=id;
        this.nombre=nombre;
        this.apellido=apellido;
        this.dni=dni;
    }
}
