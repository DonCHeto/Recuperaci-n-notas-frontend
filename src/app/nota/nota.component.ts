import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Curso } from '../models/curso';
import { Alumno } from '../models/alumno';
import { Nota } from '../models/nota';
import { AlumnoService } from '../services/alumno.service';
import { CursoService } from '../services/curso.service';
import { NotaService } from '../services/nota.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-nota',
  standalone: true,
  imports: [
    TableModule, ButtonModule, DialogModule, RouterModule, InputTextModule,
    FormsModule, ConfirmDialogModule, ToastModule, DropdownModule
  ],
  templateUrl: './nota.component.html',
  styleUrl: './nota.component.css'
})
export class NotaComponent {
  alumnos: Alumno[] = [];
  cursos: Curso[] = [];
  notas: Nota[] = [];
  visible: boolean = false;
  isDeleteInProgress: boolean = false;
  nota: Nota = new Nota();
  titulo: string = '';
  opc: string = '';
  op = 0;
  selectedAlumno: Alumno | undefined;
  selectedCurso: Curso | undefined;

  constructor(
    private alumnosService: AlumnoService,
    private cursosService: CursoService,
    private notasService: NotaService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.listarAlumnos();
    this.listarCursos();
    this.listarNotas();  // Verificar si hay notas al inicio
  }

  listarAlumnos() {
    this.alumnosService.getAlumno().subscribe(
      (data) => {
        this.alumnos = data.map(alumno => ({
          ...alumno,
          displayName: `${alumno.dni} - ${alumno.nombre} ${alumno.apellido}`
        }));
        console.log(this.alumnos);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al cargar alumnos',
          detail: error.message || 'Error al cargar los alumnos',
        });
      }
    );
  }

  listarCursos() {
    this.cursosService.getCurso().subscribe(
      (data) => {
        this.cursos = data;
        console.log(this.cursos);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al cargar cursos',
          detail: error.message || 'Error al cargar los cursos',
        });
      }
    );
  }

  listarNotas() {
    this.notasService.getNotas().subscribe(
      (data) => {
        this.notas = data;
        console.log(this.notas);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al cargar notas',
          detail: error.message || 'Error al cargar las notas',
        });
      }
    );
  }

  showDialogCreate() {
    this.titulo = "Crear Nota";
    this.opc = "Guardar";
    this.op = 0;
    this.nota = new Nota();  // Limpia los campos del formulario
    this.visible = true;
  }

  showDialogEdit(id: number) {
    this.titulo = "Editar Nota";
    this.opc = "Editar";
    this.notasService.getNotasById(id).subscribe(
      (data) => {
        this.nota = { ...data };
        this.op = 1;
        this.visible = true;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al cargar la nota',
          detail: error.message || 'No se pudo cargar la nota',
        });
      }
    );
  }

  deleteNotas(id: number) {
    this.isDeleteInProgress = true;
    this.notasService.deleteNotas(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Nota eliminada',
        });
        this.isDeleteInProgress = false;
        this.listarNotas();
      },
      error: (error) => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la Nota: ' + error.message,
        });
      },
    });
  }

  calcularPromedio() {
    if (this.nota.nota1 && this.nota.nota2 && this.nota.nota3) {
      this.nota.promedio = (this.nota.nota1 + this.nota.nota2 + this.nota.nota3) / 3;
    }
  }

  opcion() {
    if (this.op === 0) {
      this.addNotas();
    } else if (this.op === 1) {
      this.editNotas();
    }
  }

  addNotas() {
    this.calcularPromedio();
    this.notasService.crearNotas(this.nota).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Nota Registrada',
        });
        this.listarNotas();
        this.visible = false;  // Cerrar el diálogo
        this.nota = new Nota();  // Limpiar el formulario
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar la Nota: ' + error.message,
        });
      },
    });
  }

  editNotas() {
    this.calcularPromedio();
    this.notasService.updateNotas(this.nota, this.nota.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Nota Editada Correctamente',
        });
        this.listarNotas();
        this.visible = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo editar la Nota: ' + error.message,
        });
      },
    });
  }

  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0;
    this.nota = new Nota();  // Reinicia la variable nota
    this.visible = false;
  }
}
