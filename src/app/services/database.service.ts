import { Injectable } from '@angular/core';
import Dexie  from 'dexie';
import {Contatos} from '../model/contact.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: Dexie;
  private contatos: Dexie.Table<Contatos, any> = null;

  constructor() {
    this.iniciarDb();
  }

  iniciarDb() {
    this.db = new Dexie('contatos');
    this.db.version(1).stores({
      // eslint-disable-next-line max-len
      contatos: 'id, nome, sobrenome, empresa, logradouro, numero, complemento, bairro, cidade, cep, uf, foneProfissional, fonePessoal, emailProfissional, emailPessoal, observacoes'
    });
    this.contatos = this.db.table('contatos');
  }

  async create(contato: Contatos) {
    await this.contatos.add(contato);
  }

  async getAll() {
    return await this.contatos.toArray();
  }

  async getById(id: string) {
    return await this.contatos.get(id);
  }

  async update(contato: Contatos) {
    await this.contatos.update(contato.id, contato);
  }

  async delete(id: string) {
    await this.contatos.delete(id);
  }

  async search(nome: string) {
    return await this.contatos.where('nome').startsWithIgnoreCase(nome).toArray();
  }

}
