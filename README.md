# 🧩 Donation Platform – Demo Application

The **donation-platform** is a demonstration web application built with **Vue.js** and **TypeScript**, designed in response to a CSR-focused enterprise use case (e.g., **ACME Corp** with 20K+ employees). It simulates an internal tool that empowers employees to engage in and support social or environmental causes through fundraising campaigns.

---

## 🚀 Live Demo

👉 [Try it here](https://dawidstask.github.io/donation-platform/)

---

## 🌍 Use Case Scenario

This project models a **corporate internal donation system**, where authenticated employees can:

- ✅ Create and manage fundraising campaigns
- ✅ Browse and donate to causes supported by their peers
- ✅ Receive donation confirmations

The goal is to support corporate social responsibility (CSR) initiatives and foster community engagement within large organizations.

---

## 🔧 Key Features

- **Campaign Management** – Employees can propose and manage donation initiatives
- **Donations** – Users can contribute to campaigns (mocked API responses)
- **Admin Dashboard** – Includes **Chart.js** visualizations for administrators
- **Responsive Design** – Optimized for desktop and mobile
- **Code Quality** – Enforced using **ESLint** and modular project structure

---

## ⚠️ Disclaimer

This is a **non-production demo application** created for demonstration purposes only. It includes basic functionality but **omits** certain production-level features, such as:

- ❌ Loading indicators during API calls
- ❌ Authentication and advanced role-based permissions
- ❌ Automated testing and CI/CD
- ❌ Robust error handling
- ❌ **Backend-driven search and pagination**
  > *(Currently implemented on the frontend; should be server-side in production for performance and scalability)*

---

## 🛠️ Project Setup

Install dependencies:

```bash
yarn install
```
Start local development server:
```bash
yarn serve
```
Build for production:
```bash
yarn build
```
Lint and fix files:
```bash
yarn lint
```
