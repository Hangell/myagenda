import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {v4 as uuidv4} from 'uuid';
import {ActivatedRoute, Router} from '@angular/router';
import {ContatosService} from '../../services/contatos.service';
import {OverlayService} from '../../services/overlay.service';
import {Contatos} from '../../model/contact.model';

@Component({
  selector: 'app-create-contacts',
  templateUrl: './create-contacts.page.html',
  styleUrls: ['./create-contacts.page.scss'],
})
export class CreateContactsPage implements OnInit {
  title = 'Novo contato';
  contact: Contatos;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private database: ContatosService,
    private overlayService: OverlayService,
  ) {
  }

  ngOnInit() {
    this.contact = new Contatos();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.title = 'Editar contato';
      this.loadContact(idParam);
    }
  }

  async loadContact(id: string) {
    this.contact = await this.database.getById(id);
  }

  onSubmit() {
    try {
      console.log(this.contact);
      if (!this.contact.id) {
        this.contact.id = uuidv4();
        this.database.create(this.contact);
        this.overlayService.toast({message: `O contato ${this.contact.nome} ${this.contact.sobrenome} foi criado com exito!`});
        this.gotoHome();
      } else {
        this.database.update(this.contact);
        this.overlayService.toast({message: `Contato ${this.contact.nome} ${this.contact.sobrenome} atualizado com exito!`});
        this.gotoHome();
      }
    } catch (e) {
      this.overlayService.toast({message: e.message});
    }

  }

  gotoHome() {
    this.router.navigate(['/home']);
  }
}
