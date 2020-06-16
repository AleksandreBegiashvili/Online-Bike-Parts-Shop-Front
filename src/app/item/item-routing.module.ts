import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { AuthGuardService } from '../guards/auth-guard.service';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemUpdateComponent } from './item-update/item-update.component';

const routes: Routes = [
  {
    path: 'list',
    component: ItemListComponent
  },
  {
    path: 'create',
    component: ItemCreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'update/:id',
    component: ItemUpdateComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
