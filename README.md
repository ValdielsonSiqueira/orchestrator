# @FIAP/orchestrator

## Descrição

Aplicação raiz (Root Config) responsável por inicializar e orquestrar os microfrontends utilizando o Single-SPA. Gerencia o layout base, o roteamento e o carregamento dos módulos via SystemJS.

## Tecnologias

- **Core**: Single-SPA (Layout Engine).
- **Loader**: SystemJS.
- **Linguagem**: JavaScript/HTML (EJS).
- **Build Tool**: Webpack.

## Pré-requisitos

- **Node.js**: Versão LTS.
- **Gerenciador de Pacotes**: pnpm.

## Como Rodar

1. Instale as dependências:

   ```bash
   pnpm install
   ```

2. Inicie o orquestrador:
   ```bash
   pnpm start
   ```
   Acesse a aplicação completa em `http://localhost:9000`.

## Funcionalidades

- **Roteamento**: Mapeia URLs para microfrontends ativos.
- **Layout**: Define a estrutura HTML base (Header, Sidebar, Conteúdo).
- **Import Maps**: Gerencia as URLs dos microfrontends.

## Arquitetura de Deploy

A infraestrutura de deploy é baseada na **Vercel**, aproveitando sua capacidade de servir assets estáticos de forma performática.

- **Deploy Individual**: Cada microfrontend (Dashboard, Sidebar, Login, etc.) possui seu próprio pipeline de CI/CD e é implantado como um projeto independente na Vercel.
- **Bundles Hospedados**: A Vercel hospeda os arquivos JavaScript (bundles) gerados pelo Webpack de cada projeto.
- **Integração no Orquestrador**: O `orchestrator` consome esses bundles através de um **Import Map**. As URLs no import map apontam diretamente para os domínios de produção da Vercel de cada microfrontend (ex: `https://fiap-dashboard.vercel.app/main.js`), garantindo que a aplicação principal sempre carregue a versão mais recente disponível de cada módulo.
