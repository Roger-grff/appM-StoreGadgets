import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'gadgets',
    pathMatch: 'full',
  },

  {
    path: 'gadgets',
    loadComponent: () =>
      import('./pages/gadgets/gadgets.page')
    .then((m) => m.GadgetsPage)
  },

  {
    path: 'gadgets-form',
    loadComponent: () =>
      import('./pages/gadgets-form/gadgets-form.page')
    .then((m) => m.GadgetsFormPage)
  },

  {
    path: 'gadgets-form/:id',
    loadComponent: () =>
      import('./pages/gadgets-form/gadgets-form.page')
    .then((m) => m.GadgetsFormPage)
  },
  {
    path: 'gadget-detalle/:id',
    loadComponent: () => import('./pages/gadget-detalle/gadget-detalle.page').then( m => m.GadgetDetallePage)
  },
  

];