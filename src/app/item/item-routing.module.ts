import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { AuthGuardService } from '../guards/auth-guard.service';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemUpdateComponent } from './item-update/item-update.component';
import { ItemListByCategoryComponent } from './item-list-by-category/item-list-by-category.component';

const routes: Routes = [
  {
    path: '',
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
  },
  {
    path: ':categoryName',
    component: ItemListByCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
