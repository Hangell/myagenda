import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ContatosService} from '../../services/contatos.service';
import {Contatos} from '../../model/contact.model';
import {OverlayService} from '../../services/overlay.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  contatos: Contatos[] = [];
  isModalOpen = false;

  constructor(
    private router: Router,
    private database: ContatosService,
    private overlayService: OverlayService,
    private clipboard: Clipboard,
  ) {
  }

  ngOnInit() {

  }

  setOpen(contato: Contatos) {
    this.contatos = [contato];
    console.log(this.contatos);
    this.isModalOpen = true;
  }

  setClose() {
    this.getlistContacts();
    this.isModalOpen = false;
  }

  async setCloseandEdit(contato: Contatos) {
    this.setClose();
    setTimeout(() => {
    this.gotoEditContacts(contato);
    }, 50);
  }

  ionViewWillEnter() {
    this.getlistContacts();
  }

  getlistContacts() {
    this.database.getAll().then(contatos => {
      this.contatos = contatos;
    });
  }

  gotoCreateContacts() {
    this.router.navigate(['/create']);
  }

  gotoEditContacts(contato: Contatos) {
    this.router.navigate(['/create/' + contato.id]);
  }

  async deleteContacts(contato: Contatos) {
    try {
      this.database.delete(contato.id);
      await this.overlayService.toast({message: `O contato ${contato.nome} ${contato.sobrenome} foi execluido com exito!`});
      this.getlistContacts();
    } catch (e) {
      await this.overlayService.toast({message: e.message});
    }

  }

  doSerchClear() {
    this.getlistContacts();
  }

  async doSerchBarChange($event: any) {
    const value = $event.target.value;
    if (value && value.length >= 2) {
      this.contatos = await this.database.search(value);
    }
  }

  async copyText(text: any) {
    console.log(text);
    await this.clipboard.copy(text);
    await this.overlayService.toast({message: `Copiado ${text}`});
  }

  ngOnDestroy() {
    this.contatos = null;
  }
}
