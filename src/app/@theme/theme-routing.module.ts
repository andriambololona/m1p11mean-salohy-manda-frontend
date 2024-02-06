import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientComponent } from '../pages/client/client.component';


const routes: Routes = [
  /*{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      redirectTo: 'client',
      pathMatch: 'full',
    },
  ],
}*/

//{path:'client',component:ClientComponent},
];
const config: ExtraOptions = {
  useHash: true,
};
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemeRoutingModule {
}
