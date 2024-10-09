import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';
import { NativeScriptHttpClientModule } from '@nativescript/angular';
import { NativeScriptFormsModule } from '@nativescript/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { FotosComponent } from './fotos/fotos.component';
import { ItinerarioComponent } from './itinerario/itinerario.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import { NotasComponent } from './notas/notas.component';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptHttpClientModule,
    NativeScriptFormsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    CalendarioComponent,
    FotosComponent,
    ItinerarioComponent,
    PresupuestoComponent,
    NotasComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}