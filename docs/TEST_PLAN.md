# Plano de Testes - Ecx Wallet


## 1. Escopo e Objetivos
O objetivo principal é validar as regras de negócio críticas (transações financeiras), a segurança da autenticação (JWT) e a integridade dos dados (ACID).

### Ferramentas Utilizadas
*   **Framework de Teste:** RSpec (Padrão BDD).
*   **Massa de Dados:** FactoryBot (Fábricas de objetos) e Faker (Dados fictícios).
*   **Asserções:** Shoulda Matchers (Validadores one-line).
*   **Cobertura:** SimpleCov (Opcional, para métricas).

---

## 2. Backend (Ruby on Rails API)

### 2.1. Models (Testes Unitários)
Validar a integridade do banco de dados e regras básicas.
*   **User**
    *   Deve validar presença e formato de email.
    *   Deve garantir unicidade de email.
    *   Deve criptografar a senha (Bcrypt).
    *   Deve criar automaticamente uma `Account` após a criação do usuário (`after_create`).
*   **Account**
    *   Deve pertencer a um `User`.
    *   Deve ter um número de conta único.
    *   Saldo não pode ser negativo (exceto se houver regra de cheque especial, mas assumiremos zero como piso).
*   **Transaction**
    *   Deve pertencer a uma `Account`.
    *   Deve ter um `amount` positivo.
    *   Deve ter um `kind` válido (deposit, withdraw, transfer).

### 2.2. Services (Regras de Negócio Críticas)
Aqui reside a lógica pesada da aplicação.
*   **TransactionService**
    *   **Cenário: Depósito**
        *   Deve incrementar o saldo da conta.
        *   Deve criar um registro de transação do tipo `deposit`.
    *   **Cenário: Saque**
        *   Deve decrementar o saldo da conta.
        *   Deve falhar se saldo for insuficiente.
        *   Deve criar um registro de transação do tipo `withdraw`.
    *   **Cenário: Transferência (Entre Contas)**
        *   Deve decrementar saldo da origem e incrementar destino atomicamente.
        *   Deve falhar se origem não tiver saldo.
        *   Deve falhar se conta destino não existir.
        *   **Teste de Atomicidade (ACID):** Simular erro no meio da operação (ex: falha ao creditar destino) e garantir que o débito na origem seja desfeito (Rollback).

### 2.3. Controllers / Requests (API Endpoints)
Validar a integração HTTP, status codes e serialização JSON.
*   **Authentication (Devise/JWT)**
    *   `POST /login`: Sucesso retorna token JWT; Falha retorna 401.
    *   `POST /register`: Cria usuário e retorna sucesso.
*   **TransactionsController**
    *   `GET /transactions`: Deve listar apenas transações do usuário logado.
    *   `POST /transactions`: Deve criar transação via Service.
    *   **Segurança:** Tentar acessar dados de outro usuário deve retornar 403/404.

---

## 3. Frontend (Vue.js)

### 3.1. Unitários e Componentes
*   **LoginView**: Validar campos obrigatórios antes do submit.
*   **TransactionList**: Verificar renderização correta de valores positivos (verde) e negativos (vermelho).

### 3.2. Integração (E2E Manual ou Automatizado)
*   Fluxo Completo: Cadastro -> Login -> Ver Saldo Zero -> Depositar -> Ver Saldo Atualizado.

---

## 4. Estratégia de Execução (Pipeline)

1.  **Lint:** Rubocop (Backend) e ESLint (Frontend).
2.  **Testes de Unidade/Serviço:** RSpec.
3.  **Segurança:** Brakeman (Análise estática de vulnerabilidades).

## 5. Próximos Passos (Implementação)
1.  Configurar RSpec (`rails g rspec:install`).
2.  Configurar FactoryBot e Shoulda Matchers no `rails_helper.rb`.
3.  Criar factories para `User`, `Account`, `Transaction`.
4.  Escrever specs de Model.
5.  Escrever specs de Service (Prioridade Alta).
