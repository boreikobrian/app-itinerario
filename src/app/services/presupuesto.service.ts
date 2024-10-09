import { Injectable } from '@angular/core';
import { Gasto } from '../models/gasto.model';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
  private presupuestoTotal: number = 0;
  private gastos: Gasto[] = [];

  constructor() {
    // Cargar presupuesto y gastos desde el almacenamiento local
  }

  establecerPresupuesto(monto: number) {
    this.presupuestoTotal = monto;
    // Guardar en el almacenamiento local
  }

  obtenerPresupuestoTotal(): number {
    return this.presupuestoTotal;
  }

  agregarGasto(gasto: Gasto) {
    this.gastos.push(gasto);
    // Guardar en el almacenamiento local
  }

  obtenerGastos(): Gasto[] {
    return this.gastos;
  }

  obtenerGastoTotal(): number {
    return this.gastos.reduce((total, gasto) => total + gasto.monto, 0);
  }

  // Implementar métodos para editar y eliminar gastos
}