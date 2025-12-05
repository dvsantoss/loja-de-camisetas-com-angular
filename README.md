# Loja de Camisas 👕

**Descrição:** Projeto de e-commerce simples de camisetas inspirado na HIGH (StreetWear). Front-end em Angular 21, back-end em `json-server` usando o arquivo `db.json`.

## 📁 Estrutura do Projeto

```
loja-de-camisas/
├── db.json                          # Base de dados de desenvolvimento (json-server)
├── package.json                     # Dependências e scripts do projeto
├── angular.json                     # Configuração do Angular CLI
├── tsconfig.json                    # Configuração TypeScript
├── public/
│   └── favicon.ico                  # Ícone da aplicação
└── src/
    ├── index.html                   # HTML principal
    ├── main.ts                      # Bootstrap da aplicação Angular
    ├── styles.css                   # Estilos globais
    ├── custom-theme.scss            # Tema customizado do Angular Material
    └── app/
        ├── app.ts                   # Componente root (standalone)
        ├── app.html                 # Template do componente root
        ├── app.css                  # Estilos do componente root
        ├── app.config.ts            # Configuração global do app
        ├── app.routes.ts            # Definição de rotas
        ├── app.spec.ts              # Testes do componente root
        ├── camisas/
        │   ├── model/
        │   │   └── camisa.ts        # Interface Camisa (id, nome, descrição, preço, categoria, imagem)
        │   ├── service/
        │   │   └── camisas.service.ts  # Serviço HTTP que consome a API (HttpClient + inject)
        │   ├── lista-camisas/       # Componente de listagem
        │   │   ├── lista-camisas.ts
        │   │   ├── lista-camisas.html
        │   │   ├── lista-camisas.css
        │   │   └── lista-camisas.spec.ts
        │   └── form-camisas/        # Componente de formulário (criar/editar)
        │       ├── form-camisas.ts
        │       ├── form-camisas.html
        │       ├── form-camisas.css
        │       └── form-camisas.spec.ts
        └── shared/
            └── components/
                └── confirmation-dialog/  # Diálogo de confirmação de exclusão
                    ├── confirmation-dialog.ts
                    ├── confirmation-dialog.html
                    ├── confirmation-dialog.css
                    └── confirmation-dialog.spec.ts
```

## 🛠️ Tecnologias

- **Front-end:** Angular 21 (+ Angular Material)
- **Back-end:** json-server (API REST de desenvolvimento)
- **Linguagem:** TypeScript

## 📋 Descrição dos Componentes Principais

### Arquivos de Configuração
- **`db.json`:** Base de dados de desenvolvimento usada pelo `json-server` (contém os objetos `camisa`)
- **`src/main.ts`** e **`src/index.html`:** Bootstrap da aplicação Angular
- **`src/app/app.ts`, `app.html`, `app.css`:** Componente root (standalone) que carrega as rotas e componentes
- **`src/app/app.routes.ts`:** Definição de rotas (lista, formulário de novo/edição, etc.)
- **`src/app/app.config.ts`:** Configuração global do app (imports de módulos, providers, interceptors se houver)

### Módulo de Camisas
- **`src/app/camisas/model/camisa.ts`:** Interface `Camisa` (tipagem usada em toda a aplicação)
- **`src/app/camisas/service/camisas.service.ts`:** Serviço HTTP que comunica com `json-server`
- **`src/app/camisas/lista-camisas`:** Componente de listagem (tabela, filtro, paginação, ações de editar/excluir)
- **`src/app/camisas/form-camisas`:** Componente de formulário para criar/editar camisas (validações e envio para API)

### Componentes Compartilhados
- **`src/app/shared/components/confirmation-dialog`:** Componente de diálogo usado para confirmar exclusão

## ✨ Funcionalidades Principais

- **Listagem:** Tabela com `MatTable`, colunas: imagem, nome, categoria, preço e ações
- **Formulário:** Criar/editar camisas com validações (`nome`, `categoria` e `preço` obrigatórios)
- **Modal de Confirmação:** Diálogo de confirmação antes de excluir (ConfirmationDialog)
- **Pesquisa/Filtro:** Campo que aplica filtro ao `dataSource` da tabela (`dataSource.filter = valor.trim().toLowerCase()`)
- **Reatividade:** Uso de Signals para reatividade (`camisas = signal<Camisa[]>([])`)

## 🚀 Como Rodar

### Pré-requisitos
- Node.js instalado
- npm ou yarn

### Passos

1. **Instale as dependências:**
```cmd
npm install
```

2. **Inicie a API Local (`json-server`) em uma janela de terminal separada:**
```cmd
npx json-server db.json
```

3. **Inicie a aplicação Angular em outro terminal:**
```cmd
ng serve
```
ou
```cmd
npm start
```

4. **Acesse no navegador:**
```
http://localhost:4200
```

## 🧪 Validações do Formulário

Os campos `nome`, `categoria` e `preço` usam `Validators.required`. Ao submeter com algum desses campos vazios, o form exibe mensagens de erro e impede o envio até que sejam preenchidos.

Exemplo: no método de submit do componente, a aplicação normalmente verifica `if (form.invalid) { markAllAsTouched(); return; }`.

## 🔍 Busca / Filtro

O campo de pesquisa usa o valor do input para preencher `dataSource.filter`:

```typescript
aplicarFiltro(evento: Event) {
    const valor = (evento.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
}
```

## 📸 Cenários de Teste & Screenshots

## **Tela Inicial:**
<img width="1920" height="1020" alt="Image" src="https://github.com/user-attachments/assets/73f7730b-8b05-4ca7-9890-953ab9276df9" />

## **Tela do Formulário (criar/editar):**
<img width="1920" height="1020" alt="Image" src="https://github.com/user-attachments/assets/d6fd4dee-4f1b-4aad-8da2-f2877a2e206e" />

## **Validação de Campos Obrigatórios:**
<img width="1920" height="1020" alt="Image" src="https://github.com/user-attachments/assets/c9a6129e-0869-46ff-b51d-05a26bd5bfea" />

## **Modal de Confirmação de Exclusão:**
<img width="1920" height="1020" alt="Image" src="https://github.com/user-attachments/assets/989c3444-f3c4-4d8b-aa0d-78d271bf20d9" />

## **Pesquisa aplicada:**
<img width="1920" height="1020" alt="Image" src="https://github.com/user-attachments/assets/2cbc8bb1-d7bd-4e1c-a4f5-e0ddb148da41" />

## 📝 Observações sobre Angular 21

- O projeto foi atualizado para Angular 21 (dependências em `package.json` apontam para `^21.0.1`)
- Uso de APIs modernas como `standalone components` e `signals` — verifique a documentação oficial de atualização se houver problemas ao executar
