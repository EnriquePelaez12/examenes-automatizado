import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "inicio",
        loadChildren: () => import("../inicio/inicio.module").then(m => m.InicioPageModule)
      },
      {
        path: "cursos",
        loadChildren: () => import('../cursos/cursos.module').then(m => m.CursosPageModule)   
      },
      {
        path: "consejos",
        loadChildren: () => import("../consejos/consejos.module").then(m => m.ConsejosPageModule)
      },
      {
        path: "mas",
        loadChildren: () => import("../mas/mas.module").then(m => m.MasPageModule)
      },
      {
        path: "",
        redirectTo: "inicio",
        pathMatch: "full"
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
