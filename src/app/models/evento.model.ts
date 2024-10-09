export class Evento {
  id?: number;
  nombre: string;
  fecha: Date;
  hora?: Date;
  ubicacion?: string;

  constructor(data: Partial<Evento> = {}) {
    Object.assign(this, data);
  }
}