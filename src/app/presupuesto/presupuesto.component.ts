import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { PresupuestoService } from '../services/presupuesto.service';
import { Gasto } from '../models/gasto.model';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css']
})
export class PresupuestoComponent implements OnInit {
  gastos: Gasto[] = [];
  categorias: string[] = ['🏨 Alojamiento', '🍽️ Comida', '🚗 Transporte', '🎯 Actividades', '🛍️ Compras', '🎁 Otros'];
  presupuestoTotal: number = 0;
  gastoTotal: number = 0;
  nuevoConcepto: string = '';
  nuevoMonto: number = 0;
  categoriaSeleccionada: string = '';

  constructor(
    private routerExtensions: RouterExtensions,
    private presupuestoService: PresupuestoService
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.presupuestoTotal = this.presupuestoService.obtenerPresupuestoTotal();
    this.gastos = this.presupuestoService.obtenerGastos();
    this.actualizarGastoTotal();
  }

  agregarGasto() {
    if (this.nuevoConcepto && this.nuevoMonto > 0 && this.categoriaSeleccionada) {
      const nuevoGasto = new Gasto({
        concepto: this.nuevoConcepto,
        monto: Math.abs(this.nuevoMonto),
        categoria: this.categoriaSeleccionada,
        fecha: new Date()
      });
      this.presupuestoService.agregarGasto(nuevoGasto);
      this.cargarDatos();
      this.limpiarFormulario();
    }
  }

  limpiarFormulario() {
    this.nuevoConcepto = '';
    this.nuevoMonto = 0;
    this.categoriaSeleccionada = '';
  }

  actualizarGastoTotal() {
    this.gastoTotal = this.presupuestoService.obtenerGastoTotal();
  }

  establecerPresupuesto(monto: string) {
    const nuevoPresupuesto = Math.abs(parseFloat(monto)) || 0;
    this.presupuestoService.establecerPresupuesto(nuevoPresupuesto);
    this.presupuestoTotal = nuevoPresupuesto;
  }

  onBackTap() {
    this.routerExtensions.back();
  }
}