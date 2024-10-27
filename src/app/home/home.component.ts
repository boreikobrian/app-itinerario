import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { EventoService } from '../services/evento.service';
import { PresupuestoService } from '../services/presupuesto.service';
import { Application } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(RadSideDrawer) drawerComponent: RadSideDrawer;
  
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
    this.cargarDatos();
    this.isDarkMode = Application.systemAppearance() === 'dark';
  }

  cargarDatos() {
    this.cargarProximoEvento();
    this.cargarResumenPresupuesto();
  }

  navigateTo(route: string) {
    console.log('Navigating to:', route);
    this.routerExtensions.navigate([route], {
      animated: true,
      transition: {
        name: 'slide',
        duration: 200,
        curve: 'ease'
      }
    }).then(() => {
      console.log('Navigation completed');
    }).catch(error => {
      console.error('Navigation error:', error);
    });
  }

  cargarProximoEvento() {
    this.proximoEvento = this.eventoService.obtenerProximoEvento();
  }

  cargarResumenPresupuesto() {
    this.presupuestoTotal = this.presupuestoService.obtenerPresupuestoTotal();
    this.gastoTotal = this.presupuestoService.obtenerGastoTotal();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    Application.setSystemAppearance(this.isDarkMode ? 'dark' : 'light');
  }

  openDrawer() {
    if (this.drawerComponent) {
      this.drawerComponent.toggleDrawerState();
    }
  }
}