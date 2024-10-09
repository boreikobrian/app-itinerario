import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { EventoService } from '../services/evento.service';
import { PresupuestoService } from '../services/presupuesto.service';
import { Application } from '@nativescript/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  proximoEvento: any;
  presupuestoTotal: number = 0;
  gastoTotal: number = 0;
  isDarkMode: boolean = false;

  constructor(
    private routerExtensions: RouterExtensions,
    private eventoService: EventoService,
    private presupuestoService: PresupuestoService
  ) {}

  ngOnInit() {
    this.cargarProximoEvento();
    this.cargarResumenPresupuesto();
    this.isDarkMode = Application.systemAppearance() === 'dark';
    Application.on('systemAppearanceChanged', this.onSystemAppearanceChanged, this);
  }

  navigateTo(route: string) {
    this.routerExtensions.navigate([route], {
      transition: {
        name: 'slide'
      },
      clearHistory: false
    });
  }

  cargarProximoEvento() {
    this.proximoEvento = this.eventoService.obtenerProximoEvento();
  }

  cargarResumenPresupuesto() {
    this.presupuestoTotal = this.presupuestoService.obtenerPresupuestoTotal();
    this.gastoTotal = this.presupuestoService.obtenerGastoTotal();
  }

  onThemeToggle(args: any) {
    this.isDarkMode = args.object.checked;
    Application.setSystemAppearance(this.isDarkMode ? 'dark' : 'light');
  }

  onSystemAppearanceChanged(args: any) {
    this.isDarkMode = args.newValue === 'dark';
  }

  ngOnDestroy() {
    Application.off('systemAppearanceChanged', this.onSystemAppearanceChanged, this);
  }
}