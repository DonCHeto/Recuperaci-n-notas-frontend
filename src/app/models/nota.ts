import { Alumno } from "./alumno";
import { Curso } from "./curso";

export class Nota {
    id:number;
    nota1:number;
    nota2:number;
    nota3:number;
    promedio:number;
    alumno:Alumno;
    curso:Curso
    constructor(id:number = 0,nota1:number=0,nota2:number=0,nota3:number=0, promedio:number=0 ,alumno:Alumno=new Alumno(),curso:Curso=new Curso()){
        this.id=id;
        this.nota1=nota1;
        this.nota2=nota2;
        this.nota3=nota3;
        this.promedio=promedio;
        this.alumno=alumno;
        this.curso=curso;
    }
}
