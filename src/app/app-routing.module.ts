import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {path: '', redirectTo: '/GreenLeaves', pathMatch: 'full'},
  {path: 'GreenLeaves', component: FormComponent},
  {path: '**', component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
