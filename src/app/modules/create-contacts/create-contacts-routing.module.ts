import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateContactsPage } from './create-contacts.page';

const routes: Routes = [
  {
    path: '',
    component: CreateContactsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateContactsPageRoutingModule {}
