# 🎭 Automated E2E Testing - Wizard Bank (Playwright + POM)

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=Playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Design Pattern](https://img.shields.io/badge/Pattern-Page_Object_Model-blue?style=for-the-badge)

Este repositório contém a suíte de testes automatizados End-to-End (E2E) para a aplicação **Wizard Bank**, desenvolvida utilizando **Playwright** com **JavaScript**. O projeto adota o padrão de projeto **Page Object Model (POM)** para garantir modularidade, alta reuso de código e fácil manutenção.

---

## 📌 Objetivos do Projeto

- Validar fluxos críticos de usuário (Login, navegação, transações e validações de interface).
- Aplicar o padrão **Page Object Model (POM)** para separar a lógica de automação da estrutura da página.
- Garantir a execução de testes regressivos rápidos e confiáveis.
- Gerar relatórios detalhados de execução para análise de falhas.

---

## 🏗️ Arquitetura do Projeto (Page Object Model)

O projeto é estruturado mantendo a separação clara de responsabilidades:

```text
qa_pw_wizard_bank_pom/
├── pages/                # Classes com os seletores e ações de cada página (POM)
│   ├── LoginPage.js
│   └── DashboardPage.js
├── tests/                # Casos de teste automatizados (.spec.js)
│   ├── login.spec.js
│   └── dashboard.spec.js
├── playwright.config.js  # Configurações globais do Playwright (browsers, timeouts, baseurl)
├── package.json          # Dependências e scripts de execução
└── README.md             # Documentação do projeto
