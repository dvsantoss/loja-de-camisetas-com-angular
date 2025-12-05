import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'; // módulo de formulários
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // para resposta visual
import { Location } from '@angular/common'; // para botão voltar
import { CamisasService } from '../service/camisas.service';
import { Camisa } from '../model/camisa';

@Component({
  selector: 'app-form-camisas',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './form-camisas.html',
  styleUrl: './form-camisas.css'
})
export class FormCamisas implements OnInit {
  // dependências
  private fb = inject(FormBuilder); // construtor de formulários
  private service = inject(CamisasService); // serviço de camisas
  private snackBar = inject(MatSnackBar);  // barra de notificações (alertas de resposta ao usuário)
  private location = inject(Location); // para navegação

  // recebe o ID da rota
  @Input() id?: string;

  // dfinindo o formulário com validações
  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    categoria: ['', Validators.required],
    preco: [0, [Validators.required, Validators.min(0.01)]],
    descricao: [''],
    imagem: [''] // campo da URL da foto
  });

  ngOnInit(): void {
    // se tiver ID, busca os dados no bd para preencher o formulário (por causa da edição)
    if (this.id) {
      this.service.loadById(this.id).subscribe({
        next: (camisa) => this.updateForm(camisa),
        error: (e) => this.onError('Erro ao carregar camisa.')
      });
    }
  }

  // atualiza os dados do formulário
  updateForm(camisa: Camisa) {
    this.form.patchValue({
      nome: camisa.nome,
      categoria: camisa.categoria,
      preco: camisa.preco,
      descricao: camisa.descricao,
      imagem: camisa.imagem
    });
  }

  onSubmit() {
    if (this.form.valid) {
      // cria o objeto camisa com os dados do form
      const dadosCamisa = this.form.value as Partial<Camisa>;

      if (this.id) {
        // edição (PUT)
        this.service.update(this.id, dadosCamisa).subscribe({
          next: () => this.onSuccess('Camisa atualizada com sucesso!'),
          error: () => this.onError('Erro ao atualizar camisa.')
        });
      } else {
        // criação (POST)
        this.service.save(dadosCamisa).subscribe({
          next: () => this.onSuccess('Camisa cadastrada com sucesso!'),
          error: () => this.onError('Erro ao cadastrar camisa.')
        });
      }
    } else {
      this.onError('Formulário inválido. Verifique os campos.');
    }
  }

  onCancel() {
    this.location.back(); // volta para a tela anterior (Lista)
  }

  private onSuccess(msg: string) {
    this.snackBar.open(msg, 'X', { duration: 3000 });
    this.onCancel(); // volta para a lista automatico
  }

  private onError(msg: string) {
    this.snackBar.open(msg, 'X', { duration: 3000 });
  }
}
