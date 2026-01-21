# 🏦 Ecx Wallet

**Ecx Wallet** is a modern, full-stack Fintech application designed to simulate a comprehensive digital wallet experience. Built with **Ruby on Rails** (API Mode) and **Vue.js 3**, it demonstrates enterprise-grade architecture, secure financial transactions, and a reactive user interface.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 🚀 Features

### 🔐 Authentication & Security
- **JWT Authentication:** Secure stateless authentication using `devise-jwt`.
- **Role-Based Access:** Support for User and Admin roles.
- **Route Guarding:** Frontend protection for authenticated routes.

### 💸 Core Financial Operations
- **Account Management:** Automatic account creation upon registration.
- **Transactions:** 
  - Deposits
  - Withdrawals
  - **P2P Transfers:** Secure transfers between users via email.
- **ACID Compliance:** Uses database transactions to guarantee data integrity during financial operations.

### 📊 Interactive Dashboard
- **Real-time Overview:** Total balance and quick actions.
- **Money Flow Chart:** Visual breakdown of income vs. expenses using `Chart.js`.
- **Activity Log:** Searchable and filterable transaction history.
- **Card Management:** Visual interface for managing virtual/physical cards.

---

## 🛠️ Tech Stack

### Backend (API)
- **Framework:** Ruby on Rails 7 (API Mode)
- **Database:** PostgreSQL 15
- **Authentication:** Devise + JWT
- **Architecture:** Service Objects for business logic isolation.
- **Testing:** RSpec (configured).

### Frontend (Client)
- **Framework:** Vue.js 3 (Composition API)
- **Language:** TypeScript
- **State Management:** Pinia
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Icons:** Lucide Vue

### Infrastructure
- **Containerization:** Docker & Docker Compose
- **Orchestration:** Single command setup for DB, Backend, and Frontend.

---

## 📦 Installation & Setup

### Prerequisites
- Docker & Docker Compose installed on your machine.

### Quick Start
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ecx-wallet.git
   cd ecx-wallet
   ```

2. **Start the application:**
   ```bash
   docker compose up --build
   ```
   *This will build the images, create the database, run migrations, and start the servers.*

3. **Access the application:**
   - **Frontend:** [http://localhost:5173](http://localhost:5173)
   - **Backend API:** [http://localhost:3000](http://localhost:3000)

### Default Credentials (Seeds)
- **Admin:** `admin@ecxwallet.com` / `password123`
- **User:** `user@ecxwallet.com` / `password123`

---

## 📐 Architecture Highlights

- **Service Objects:** Complex business logic (like transferring funds) is extracted from controllers into dedicated services (e.g., `TransactionService`), following the Single Responsibility Principle (SRP).
- **Optimistic UI:** The frontend is designed to provide immediate feedback to users while handling background API synchronizations.
- **Hybrid Data Mode:** The frontend supports switching between Real API data and Mock data for easier UI development and testing.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
