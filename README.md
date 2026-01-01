# 🧩 Kanbanify

**Kanbanify** is a case study project focused on building a modern **Kanban Board–based** web application using up-to-date technologies such as **Laravel 11**, **ReactJS**, and **InertiaJS**.

This project is designed to develop a **Single Page Application (SPA)** using a monolithic approach — without separating the frontend and backend.

---

## 🚀 Technologies Used

- **Laravel 11** – Main backend framework & routing
- **InertiaJS** – Bridges Laravel and ReactJS (SPA without an API layer)
- **ReactJS** – For building reactive UI components
- **TailwindCSS** – Utility-first CSS framework for rapid styling
- **ShadCN UI** – Modern UI components built on TailwindCSS + Radix UI
- **DnD Kit** – Modern library for drag-and-drop functionality
- **Laravel Breeze (Inertia stack)** – Authentication and initial scaffolding

---

## 🎯 Key Features

- ✅ User authentication (login/register) using Laravel Breeze
- ✅ Interactive Kanban board with drag & drop (DnD Kit)
- ✅ Modern UI components powered by **ShadCN UI**
- ✅ Modular and reusable layout structure
- ✅ Full SPA experience via InertiaJS (no REST API required)
- ✅ Custom datatable implementation:
    - Pagination
    - Searching
    - Sorting
    - Other advanced features

---

## 📦 Installation Guide

```bash
# 1. Clone this repository
git clone https://github.com/aditya250400/kanbanify.git

# 2. Navigate into the project directory
cd kanbanify

# 3. Install backend dependencies
composer install

# 4. Install frontend dependencies
npm install

# 5. Set up environment and database
cp .env.example .env
php artisan key:generate

# 6. Run database migrations
php artisan migrate

# 7. Start the development servers
npm run dev
php artisan serve
