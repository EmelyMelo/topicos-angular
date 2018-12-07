import { DBService } from '../servicos/db.service';
import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/entidades/paciente';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
  providers: [DBService]
})
export class PacienteComponent implements OnInit {
  paciente: Paciente;
  carregando: boolean;
  pacientes: Paciente[];

  constructor(private dbService: DBService) {
    this.paciente = new Paciente();
    this.carregarPacientes();
  }
  ngOnInit() { }

  private carregarPacientes() {
    this.carregando = true;
    this.dbService.listar<Paciente>('pacientes')
      .then(pacientesDB => {
        this.pacientes = pacientesDB;
        this.carregando = false;
      });
  }
  salvar() {
    this.dbService.inserir("pacientes", this.paciente)
      .then(() => {
        this.paciente = new Paciente();
        this.carregarPacientes();
      });
  }
  remover(uid: string) {
    this.dbService.remover('pacientes', uid)
      .then(() => {
        this.carregarPacientes();
      });
  }

  editar(usuario) {
    usuario.editando = true;
  }

  cancelEdit(usuario) {
    usuario.editando = false;
  }

  confirmEdit(paciente) {
    this.dbService.atualizar('pacientes', paciente.uid, { nome: paciente.nome, cpf: paciente.cpf })
      .then(() => {
        this.carregarPacientes();
      });
  }
}
