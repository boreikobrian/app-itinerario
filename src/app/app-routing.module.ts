import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { HomeComponent } from './home/home.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { FotosComponent } from './fotos/fotos.component';
import { ItinerarioComponent } from './itinerario/itinerario.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import { NotasComponent } from './notas/notas.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: 'fotos', component: FotosComponent },
  { path: 'itinerario', component: ItinerarioComponent },
  { path: 'presupuesto', component: PresupuestoComponent },
  { path: 'notas', component: NotasComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}