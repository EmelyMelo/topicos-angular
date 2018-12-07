import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/entidades/usuario';
import { DBService } from '../servicos/db.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [DBService]
})
export class CadastroComponent implements OnInit {

  novoUsuario: Usuario;

  usuarios: Usuario[];

  carregando: boolean;

  constructor (private database: DBService) {
    this.novoUsuario = new Usuario();
    this.carregarUsuarios();
  }

  ngOnInit() { }

  private carregarUsuarios() {
    this.carregando = true;
    this.database.listar<Usuario>('usuarios')
    .then(usuariosDB => {
      this.usuarios = usuariosDB;
      this.carregando = false;
    });
  }

  cadastrar() {
    this.database.inserir('usuarios', this.novoUsuario)
      .then(() => {
        this.novoUsuario = new Usuario();
        this.carregarUsuarios();
      });
  }

  remover(uid: string) {
    this.database.remover('usuarios', uid)
      .then(() => {
        this.carregarUsuarios();
      });
  }

  editar(usuario) {
    usuario.editando = true;
  }

  cancelEdit(usuario) {
    usuario.editando = false;
  }

  confirmEdit(usuario) {
    this.database.atualizar('usuarios', usuario.uid, { nome: usuario.nome, email: usuario.email })
      .then(() => {
        this.carregarUsuarios();
      });
  }
}