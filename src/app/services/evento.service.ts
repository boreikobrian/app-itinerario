import { Injectable } from '@angular/core';
import { Evento } from '../models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private eventos: Evento[] = [];

  constructor() {
    // Cargar eventos desde el almacenamiento local
  }

  obtenerEventos(): Evento[] {
    return this.eventos;
  }

  agregarEvento(evento: Evento) {
    this.eventos.push(evento);
    // Guardar en el almacenamiento local
  }

  obtenerProximoEvento(): Evento | null {
    const ahora = new Date();
    return this.eventos
      .filter(evento => evento.fecha > ahora)
      .sort((a, b) => a.fecha.getTime() - b.fecha.getTime())[0] || null;
  }

  // Implementar métodos para editar y eliminar eventos
}