# 🧩 Kanbanify

**Kanbanify** adalah project studi kasus dalam membangun sebuah website modern berbasis **Kanban Board** menggunakan teknologi terkini yaitu **Laravel 11**, **ReactJS**, dan **InertiaJS**.

Proyek ini dirancang untuk pembuatan aplikasi **Single Page Application (SPA)** dengan pendekatan monolitik — tanpa perlu memisahkan antara frontend dan backend.

---

## 🚀 Teknologi yang Digunakan

- **Laravel 11** – Sebagai backend utama & routing
- **InertiaJS** – Menjembatani Laravel dengan ReactJS (SPA tanpa API layer)
- **ReactJS** – Untuk membangun komponen UI yang reaktif
- **TailwindCSS** – Utility-first CSS framework untuk styling cepat
- **ShadCN UI** – Komponen UI modern berbasis TailwindCSS + Radix UI
- **DnD Kit** – Library modern untuk fitur drag-and-drop
- **Laravel Breeze (Inertia stack)** – Untuk autentikasi dan scaffolding awal

---

## 🎯 Fitur Utama

- ✅ Autentikasi pengguna (login/register) menggunakan Laravel Breeze
- ✅ Kanban board interaktif dengan drag & drop (DnD Kit)
- ✅ Komponen UI modern dengan **ShadCN UI**
- ✅ Layout modular dan reusable
- ✅ SPA full via InertiaJS (tanpa perlu REST API)
- ✅ Pembuatan datatable custom:
    - Pagination
    - Searching
    - Sorting
    - Fitur lanjutan lainnya

---

## 📦 Cara Install

```bash
# 1. Clone repository ini
git clone https://github.com/aditya250400/kanbanify.git

# 2. Masuk ke direktori project
cd kanbanify

# 3. Install dependency backend
composer install

# 4. Install dependency frontend
npm install

# 5. Setup environment dan database
cp .env.example .env
php artisan key:generate

# 6. Jalankan migrasi
php artisan migrate

# 7. Jalankan dev server
npm run dev
php artisan serve
```
