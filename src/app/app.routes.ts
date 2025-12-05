import { Routes } from '@angular/router';
import { ListaCamisas } from './camisas/lista-camisas/lista-camisas';
import { FormCamisas } from './camisas/form-camisas/form-camisas';

export const routes: Routes = [
  // rota padrão da lista de camisas
  { path: '', redirectTo: 'camisas', pathMatch: 'full' },

  // rota da lista de camisas
  { path: 'camisas', component: ListaCamisas, title: 'Loja de Camisas' },

  // rota de criação de nova camisa
  { path: 'camisas/novo', component: FormCamisas, title: 'Nova Camisa' },

  // rota de edição (recebe o ID)
  // o id será passado automaticamente para o input do componente por conta do withComponentInputBinding
  { path: 'camisas/editar/:id', component: FormCamisas, title: 'Editar Camisa' }
];
