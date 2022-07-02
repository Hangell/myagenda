import {Injectable} from '@angular/core';
import {Contatos} from '../model/contact.model';
import {DatabaseService} from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  constructor(private database: DatabaseService) {
  }

  create(contato: Contatos) {
    this.database.create(contato);
  }

  getAll() {
    return this.database.getAll();
  }

  getById(id: string) {
    return this.database.getById(id);
  }

  update(contato: Contatos) {
    this.database.update(contato);
  }

  delete(id: string) {
    this.database.delete(id);
  }

  search(nome: string) {
    return this.database.search(nome);
  }

}
