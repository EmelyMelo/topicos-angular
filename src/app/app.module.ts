import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';
import { CadastroComponent } from './cadastro/cadastro.component';
import { PacienteComponent } from './paciente/paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    PacienteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: 'usuario', component: CadastroComponent },
      { path: 'paciente', component: PacienteComponent }
    ])
  ],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
