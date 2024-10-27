import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ApplicationSettings } from '@nativescript/core';

interface Nota {
  id: string;
  contenido: string;
  fecha: Date;
}

interface Tarea {
  id: string;
  descripcion: string;
  completada: boolean;
  fecha: Date;
}

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  notas: Nota[] = [];
  tareas: Tarea[] = [];
  nuevaNota: string = '';
  nuevaTarea: string = '';

  constructor(private routerExtensions: RouterExtensions) {}

  ngOnInit() {
    this.cargarDatos();
  }

  private cargarDatos() {
    const notasGuardadas = ApplicationSettings.getString('notas');
    const tareasGuardadas = ApplicationSettings.getString('tareas');
    
    if (notasGuardadas) {
      this.notas = JSON.parse(notasGuardadas).map((nota: any) => ({
        ...nota,
        fecha: new Date(nota.fecha)
      }));
    }
    
    if (tareasGuardadas) {
      this.tareas = JSON.parse(tareasGuardadas).map((tarea: any) => ({
        ...tarea,
        fecha: new Date(tarea.fecha)
      }));
    }
  }

  private guardarDatos() {
    ApplicationSettings.setString('notas', JSON.stringify(this.notas));
    ApplicationSettings.setString('tareas', JSON.stringify(this.tareas));
  }

  agregarNota() {
    if (this.nuevaNota.trim()) {
      this.notas.unshift({
        id: Date.now().toString(),
        contenido: this.nuevaNota,
        fecha: new Date()
      });
      this.nuevaNota = '';
      this.guardarDatos();
    }
  }

  agregarTarea() {
    if (this.nuevaTarea.trim()) {
      this.tareas.unshift({
        id: Date.now().toString(),
        descripcion: this.nuevaTarea,
        completada: false,
        fecha: new Date()
      });
      this.nuevaTarea = '';
      this.guardarDatos();
    }
  }

  toggleTarea(tarea: Tarea) {
    tarea.completada = !tarea.completada;
    this.guardarDatos();
  }

  eliminarNota(id: string) {
    this.notas = this.notas.filter(nota => nota.id !== id);
    this.guardarDatos();
  }

  eliminarTarea(id: string) {
    this.tareas = this.tareas.filter(tarea => tarea.id !== id);
    this.guardarDatos();
  }

  onBackTap() {
    this.routerExtensions.back();
  }
}