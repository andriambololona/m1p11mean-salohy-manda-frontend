import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


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

/*{path:'accueil',component:PagesComponent,children:[
  {path:'',component:AccueilComponent},
  {path:'bibliotheque',component:BibliothequeComponent},
  {path:'archive',component:ArchiveComponent}
]},*/
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
