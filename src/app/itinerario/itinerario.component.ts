import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Geolocation } from '@nativescript/geolocation';
import { requestPermissions } from '@nativescript/geolocation';

@Component({
  selector: 'app-itinerario',
  templateUrl: './itinerario.component.html',
  styleUrls: ['./itinerario.component.css']
})
export class ItinerarioComponent implements OnInit {
  actividades: any[] = [];
  ubicacionActual: string = '';
  nuevaActividad: string = '';
  horaSeleccionada: Date = new Date();

  constructor(private routerExtensions: RouterExtensions) {}

  ngOnInit() {
    this.obtenerUbicacion();
  }

  agregarActividad() {
    if (this.nuevaActividad && this.horaSeleccionada) {
      this.actividades.push({ 
        nombre: this.nuevaActividad, 
        hora: this.horaSeleccionada.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), 
        ubicacion: this.ubicacionActual 
      });
      this.nuevaActividad = '';
      this.horaSeleccionada = new Date();
    }
  }

  async obtenerUbicacion() {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        console.log('No se otorgaron permisos de ubicación');
        return;
      }
      const loc = await Geolocation.getCurrentLocation({ desiredAccuracy: 3, updateDistance: 10, timeout: 20000 });
      if (loc) {
        this.ubicacionActual = `${loc.latitude.toFixed(4)}, ${loc.longitude.toFixed(4)}`;
      }
    } catch (error) {
      console.log('Error al obtener la ubicación: ', error);
    }
  }

  onTimeSelected(args: any) {
    this.horaSeleccionada = args.value;
  }

  onBackTap() {
    this.routerExtensions.back();
  }
}