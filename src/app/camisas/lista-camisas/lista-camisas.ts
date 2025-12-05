import { Component, inject, OnInit, ViewChild, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Camisa } from '../model/camisa';
import { CamisasService } from '../service/camisas.service';
import { ConfirmationDialog } from '../../shared/components/confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-lista-camisas',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './lista-camisas.html',
  styleUrl: './lista-camisas.css'
})
export class ListaCamisas implements OnInit, AfterViewInit {
  private readonly service = inject(CamisasService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  // signal para manter a lista de camisas original (estado)
  camisas = signal<Camisa[]>([]);

  // principal da tabela do Material que sabe filtrar e paginar
  dataSource = new MatTableDataSource<Camisa>([]);

  displayedColumns = ['imagem', 'nome', 'categoria', 'preco', 'acoes']; // colunas que vai mostrar na tabela

  // pega o <mat-paginator> do HTML para controlar por aqi aqui
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.carregarCamisas(); // chamar função para carregar as camisas
  }

  // executar logo após o html ser carregado
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  carregarCamisas() {
    this.service.list().subscribe({
      next: (dados) => {

        this.camisas.set(dados);

        this.dataSource.data = dados;

        // para garantir que o paginador está conectado
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      },
      error: (erro) => console.error('Erro ao carregar camisas:', erro)
    });
  }

  // função de filtro
  // (chamada a cada letra digitada na busca)
  aplicarFiltro(evento: Event) {
    const valor = (evento.target as HTMLInputElement).value;

    this.dataSource.filter = valor.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  adicionar() {
    this.router.navigate(['camisas', 'novo']);
  }

  editar(id: string) {
    this.router.navigate(['camisas', 'editar', id]);
  }

  deletar(id: string) {
    // abrindo o modal de confirmação
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: { mensagem: 'Tem certeza que deseja remover esta camisa do estoque?' }
    });

    // para escutar quando o modal for fechado
    dialogRef.afterClosed().subscribe(resultado => {
      // se for true deleta
      if (resultado === true) {
        this.service.delete(id).subscribe(() => this.carregarCamisas());
      }
      // se for false ou undefined (fechou sem confirmar) não faz nada
    });
  }
}
