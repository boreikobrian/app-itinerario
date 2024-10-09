import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/evento.model';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  eventos: Evento[] = [];
  eventosDia: Evento[] = [];
  nuevoEvento: Evento = new Evento();
  fechaSeleccionada: Date = new Date();

  constructor(
    private routerExtensions: RouterExtensions,
    private eventoService: EventoService
  ) {}

  ngOnInit() {
    this.cargarEventos();
  }

  cargarEventos() {
    this.eventos = this.eventoService.obtenerEventos();
    this.filtrarEventosPorDia();
  }

  onDateSelected(args: any) {
    this.fechaSeleccionada = args.date;
    this.filtrarEventosPorDia();
  }

  filtrarEventosPorDia() {
    this.eventosDia = this.eventos.filter(evento => 
      evento.fecha.toDateString() === this.fechaSeleccionada.toDateString()
    );
  }

  agregarEvento() {
    if (this.nuevoEvento.nombre && this.nuevoEvento.fecha) {
      this.eventoService.agregarEvento(this.nuevoEvento);
      this.cargarEventos();
      this.nuevoEvento = new Evento();
    }
  }

  onEventSelected(args: any) {
    console.log('Evento seleccionado:', args.event);
    // Aquí puedes implementar la lógica para mostrar detalles del evento o editarlo
  }

  onBackTap() {
    this.routerExtensions.back();
  }
}