Projeto Extrato Bancário (Full-Stack)

Status: Em Desenvolvimento

Objetivo Principal

O objetivo é criar uma página de extrato bancário onde o usuário possa consultar e filtrar suas transações por data e tipo (entradas/saídas). A interface do frontend foi estilizada para simular a identidade visual do Banco do Brasil. O backend (em desenvolvimento) fornecerá a API para buscar o histórico de transações do banco de dados.

Tecnologias Utilizadas

Frontend (lado do cliente)

HTML5: Estruturação semântica da página de extrato.
CSS3: Estilização personalizada, incluindo o uso de variáveis CSS para o tema.
Bootstrap 5: Framework principal CSS para layout, componentes (modais, formulários) e responsividade.
Bootstrap Icons: Biblioteca de ícones.
JavaScript (ES6+): Manipulação de eventos e lógica de filtragem e renderização do extrato.

Backend (lado do servidor)

Node.js: Ambiente de execução para JavaScript no servidor.
Express.js: Framework para criação do servidor web e das rotas da API.
node-postgres (pg): Driver para a comunicação entre a aplicação Node.js e o banco de dados PostgreSQL.
CORS: Middleware para permitir que o frontend possa fazer requisições para a API.
PostgreSQL: Sistema de gerenciamento de banco de dados relacional.
