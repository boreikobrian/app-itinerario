import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent {
  notas: any[] = [];
  tareas: any[] = [];
  nuevaNota: string = '';
  nuevaTarea: string = '';

  constructor(private routerExtensions: RouterExtensions) {}

  agregarNota() {
    if (this.nuevaNota) {
      this.notas.push({ contenido: this.nuevaNota, fecha: new Date() });
      this.nuevaNota = '';
    }
  }

  agregarTarea() {
    if (this.nuevaTarea) {
      this.tareas.push({ descripcion: this.nuevaTarea, completada: false });
      this.nuevaTarea = '';
    }
  }

  toggleTarea(index: number) {
    this.tareas[index].completada = !this.tareas[index].completada;
  }

  onBackTap() {
    this.routerExtensions.back();
  }
}