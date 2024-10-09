export class Gasto {
  id?: number;
  concepto: string;
  monto: number;
  categoria: string;
  fecha: Date;

  constructor(data: Partial<Gasto> = {}) {
    Object.assign(this, data);
    this.fecha = this.fecha || new Date();
  }
}