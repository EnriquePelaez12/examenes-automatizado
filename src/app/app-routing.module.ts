import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./sui/sui.module").then(m => m.SuiPageModule)
  },
  {
    path: "tabs",
    loadChildren: () => import("./tabs/tabs.module").then( m => m.TabsPageModule)
  },
  {
    path: "inicio",
    loadChildren: () => import("./inicio/inicio.module").then( m => m.InicioPageModule)
  },
  {
    path: "cursos",
    loadChildren: () => import("./cursos/cursos.module").then( m => m.CursosPageModule)
  },
  {
    path: "consejos",
    loadChildren: () => import("./consejos/consejos.module").then( m => m.ConsejosPageModule)
  },
  {
    path: "mas",
    loadChildren: () => import("./mas/mas.module").then( m => m.MasPageModule)
  },
  {
    path: "login",
    loadChildren: () => import("./login/login.module").then( m => m.LoginPageModule)
  },
  {
    path: "signup",
    loadChildren: () => import("./signup/signup.module").then( m => m.SignupPageModule)
  },
  {
    path: "forgotpwd",
    loadChildren: () => import("./forgotpwd/forgotpwd.module").then( m => m.ForgotpwdPageModule)
  },
  {
    path: 'asignaturas',
    loadChildren: () => import('./asignaturas/asignaturas.module').then( m => m.AsignaturasPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
