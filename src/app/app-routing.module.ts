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
    path: "perfil",
    loadChildren: () => import("./perfil/perfil.module").then( m => m.PerfilPageModule)
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
    path: 'tema',
    loadChildren: () => import('./components/tema/tema.module').then( m => m.TemaPageModule)
  },
  {
    path: 'tema/:idAsig',
    loadChildren: () => import('./components/tema/tema.module').then( m => m.TemaPageModule)
  },
  {
    path: 'new-tema',
    loadChildren: () => import('./components/new-tema/new-tema.module').then( m => m.NewTemaPageModule)
  },
  {
    path: 'new-tema/:idAsig',
    loadChildren: () => import('./components/new-tema/new-tema.module').then( m => m.NewTemaPageModule)
  },
  {
    path: 'new-examen',
    loadChildren: () => import('./components/new-examen/new-examen.module').then( m => m.NewExamenPageModule)
  },
  {
    path: 'new-examen/:idDatosE', 
    loadChildren: () => import('./components/new-examen/new-examen.module').then( m => m.NewExamenPageModule)
  },
  {
    path: 'examen',
    loadChildren: () => import('./components/examen/examen.module').then( m => m.ExamenPageModule)
  },
 /**
  *  {
    path: 'examen/:idExamen',
    loadChildren: () => import('./components/examen/examen.module').then( m => m.ExamenPageModule)
  },//idDatosE
  */
  {
    path: 'examen/:idDatosE',
    loadChildren: () => import('./components/examen/examen.module').then( m => m.ExamenPageModule)
  },
  {
    path: 'datos-examen',
    loadChildren: () => import('./components/datos-examen/datos-examen.module').then( m => m.DatosExamenPageModule)
  },{
    path: 'datos-examen/:idDatosE',
    loadChildren: () => import('./components/datos-examen/datos-examen.module').then( m => m.DatosExamenPageModule)
  },
  {
    path: 'view-result',
    loadChildren: () => import('./view-result/view-result.module').then( m => m.ViewResultPageModule)
  },
  {
    path: 'view-result/:idDatosE',
    loadChildren: () => import('./view-result/view-result.module').then( m => m.ViewResultPageModule)
  },{
    path: 'edit-perfil',
    loadChildren: () => import('./components/edit-perfil/edit-perfil.module').then( m => m.EditPerfilPageModule)
  },
  {
    path: 'edit-perfil/:iud',
    loadChildren: () => import('./components/edit-perfil/edit-perfil.module').then( m => m.EditPerfilPageModule)
  },
  {
    path: 'new-curso',
    loadChildren: () => import('./components/new-curso/new-curso.module').then( m => m.NewCursoPageModule)
  },
  {
    path: 'new-curso/:idCurso',
    loadChildren: () => import('./components/new-curso/new-curso.module').then( m => m.NewCursoPageModule)
  },
  {
    path: 'new-asignatura',
    loadChildren: () => import('./components/new-asignatura/new-asignatura.module').then( m => m.NewAsignaturaPageModule)
  },
  {
    path: 'new-asignatura/:idCurso',
    loadChildren: () => import('./components/new-asignatura/new-asignatura.module').then( m => m.NewAsignaturaPageModule)
  },
  // {
  //   path: 'new-asignatura/:idAsig',
  //   loadChildren: () => import('./components/new-asignatura/new-asignatura.module').then( m => m.NewAsignaturaPageModule)
  // },
  {
    path: 'asignatura',
    loadChildren: () => import('./components/asignatura/asignatura.module').then( m => m.AsignaturaPageModule)
  },
  // {
  //   path: 'asignatura/:idAsig',
  //   loadChildren: () => import('./components/asignatura/asignatura.module').then( m => m.AsignaturaPageModule)
  // },
  {
    path: 'asignatura/:idCurso',
    loadChildren: () => import('./components/asignatura/asignatura.module').then( m => m.AsignaturaPageModule)
  },
  {
    path: 'home-examen',
    loadChildren: () => import('./components/home-examen/home-examen.module').then( m => m.HomeExamenPageModule)
  },
  {
    path: 'home-examen/:idDatosE',
    loadChildren: () => import('./components/home-examen/home-examen.module').then( m => m.HomeExamenPageModule)
  },
  {
    path: 'c-examen',
    loadChildren: () => import('./components/c-examen/c-examen.module').then( m => m.CExamenPageModule)
  },
  {
    path: 'c-examen/:idDatosE',
    loadChildren: () => import('./components/c-examen/c-examen.module').then( m => m.CExamenPageModule)
  },
  



  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
