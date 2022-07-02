import { NgModule } from '@angular/core';
import { CreateContactsPageRoutingModule } from './create-contacts-routing.module';

import { CreateContactsPage } from './create-contacts.page';
import {SharedModule} from '../../shared/shared.module';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    SharedModule,
    CreateContactsPageRoutingModule,
    IonicModule,
    FormsModule
  ],
  declarations: [CreateContactsPage]
})
export class CreateContactsPageModule {}
