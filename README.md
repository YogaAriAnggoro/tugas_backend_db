# 📚 REST API — Sistem Perpustakaan Digital (Peminjaman)

REST API sederhana untuk mengelola sistem peminjaman buku perpustakaan digital. Dibangun menggunakan Node.js, Express.js, dan PostgreSQL.

1. Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL (via `pg` Pool)
* **Dev Tools:** Nodemon, CORS, dotenv

2. Fitur

* Mencatat transaksi peminjaman buku baru (POST)
* Melihat seluruh riwayat peminjaman (GET All)
* Melihat detail spesifik peminjaman berdasarkan ID (GET by ID)
* Mengubah status peminjaman (contoh: dari "Dipinjam" menjadi "Dikembalikan") (PUT)
* Menghapus data riwayat peminjaman (DELETE)

3. Struktur Folder Dasar

```text
tugas-backend/
├── index.js          # Main server & REST API Endpoints
├── db.sql            # Schema tabel database PostgreSQL
├── package.json      # Konfigurasi npm & dependencies
├── package-lock.json # Lock tree dependencies
└── README.md         # Dokumentasi proyek
