# 🏦 Ecx Wallet

**Ecx Wallet** é uma aplicação **Fintech Full-Stack** desenvolvida para simular uma carteira digital completa. O projeto demonstra a criação de um sistema financeiro robusto, seguro e escalável, utilizando as melhores práticas de engenharia de software modernas.

---

## 🚀 Skills & Tecnologias

Este projeto foi construído para demonstrar domínio nas seguintes tecnologias e conceitos:

### **Backend (Ruby on Rails API)**
*   **Framework:** Ruby on Rails 7 (Modo API)
*   **Banco de Dados:** PostgreSQL 15
*   **Autenticação:** JWT (Stateless) com Devise
*   **Arquitetura:** Service Objects (Regras de negócio isoladas)
*   **Integridade de Dados:** Transações ACID para operações financeiras
*   **Testes:** RSpec

### **Frontend (Vue.js)**
*   **Framework:** Vue.js 3 (Composition API)
*   **Linguagem:** TypeScript
*   **Estado Global:** Pinia
*   **Estilização:** Tailwind CSS
*   **Build Tool:** Vite
*   **Visualização de Dados:** Chart.js

### **DevOps & Infraestrutura**
*   **Containerização:** Docker & Docker Compose
*   **Orquestração:** Ambiente de desenvolvimento unificado (DB, Backend, Frontend)

---

## � O Que é o Projeto?

O **Ecx Wallet** é uma plataforma que permite aos usuários gerenciar suas finanças digitais com segurança.

**Funcionalidades Principais:**
*   🔐 **Autenticação Segura:** Login e cadastro com tokens JWT.
*   💰 **Gestão de Contas:** Criação automática de contas digitais.
*   💸 **Transações Financeiras:**
    *   Depósitos e Saques.
    *   **Transferências P2P:** Envio de valores entre usuários em tempo real.
*   📊 **Dashboard Interativo:**
    *   Visão geral de saldo.
    *   Gráficos de fluxo de caixa (Entradas vs Saídas).
    *   Gestão visual de cartões de crédito virtuais.
    *   Histórico detalhado de atividades com filtros.

---

## 📦 Como Rodar

Pré-requisitos: **Docker** e **Docker Compose**.

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/RafaelForti1/Fintech-ECX.git
   cd ecx-wallet
   ```

2. **Suba o ambiente:**
   ```bash
   docker compose up --build
   ```

3. **Acesse:**
   - **Frontend:** [http://localhost:5173](http://localhost:5173)
   - **Backend API:** [http://localhost:3000](http://localhost:3000)

**Credenciais de Teste:**
- **Admin:** `admin@ecxwallet.com` / `password123`
- **Usuário:** `user@ecxwallet.com` / `password123`
