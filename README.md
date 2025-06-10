# Teste Técnico - Teddy Open Finance

## Sobre o Sistema

O sistema possui uma tela inicial onde o usuário pode inserir o nome e, em seguida, será redirecionado para uma tela com a lista de todos os clientes cadastrados. Nesta tela, o usuário poderá cadastrar, selecionar, atualizar e excluir clientes. Além disso, há uma tela para visualização dos clientes selecionados.

## Requisitos do Sistema

- Utilize TypeScript. ✅
- Utilizar Angular (versão mais recente). ✅
- Crie uma arquitetura de micro-frontends. ✅
- A aplicação deverá ser responsiva. ✅
- Utilizar Docker para containerizar a aplicação. ✅
- Fazer deploy na Vercel. ✅
- Crie um README explicando como rodar a aplicação. ✅
- Gravar um vídeo demonstrando toda a aplicação. ✅
- Sinta-se livre para incluir melhorias. ✅

## Diferenciais

- Testes end-to-end.
- Micro front-end para design system.
- Adicione testes unitários à aplicação. ✅

## Critérios de Avaliação

- Componentização.
- Estrutura de pastas.
- Gerenciamento de estado.
- Responsividade.
- Padrões de código.
- Padrão de commits.

## Como Rodar a Aplicação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker
- Angular CLI

### Passos para Rodar a Aplicação

1. Clone o repositório:

   ```sh
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Construa os projetos:

   ```sh
   npm run build -- --project=shell
   npm run build -- --project=mf-clientes
   npm run build -- --project=mf-auth
   ```

4. Execute os containers Docker:

   ```sh
   docker-compose up --build
   ```

5. Acesse a aplicação no navegador:
   - Shell: `http://localhost:80`

### Executando a Aplicação em Desenvolvimento

Para rodar ambos os projetos em modo de desenvolvimento, utilize o comando:

```sh
npm run start:all
```
## Vídeo da Aplicação Rodando

https://github.com/user-attachments/assets/6f094f39-6301-44ee-8131-615e63304b76
