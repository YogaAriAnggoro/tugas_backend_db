const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

// 1. Inisialisasi Aplikasi & Konfigurasi
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 2. Koneksi Database PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

pool.connect((err) => {
    if (err) {
        console.error('Gagal terhubung ke database:', err.stack);
    } else {
        console.log('Berhasil terhubung ke database PostgreSQL!');
    }
});

// ============================================
// 3. ROUTE FITUR TRANSAKSI PEMINJAMAN
// ============================================

// GET: Melihat semua data peminjaman
app.get('/api/borrowings', async (req, res) => {
    try {
        const allBorrowings = await pool.query("SELECT * FROM borrowings");
        res.json(allBorrowings.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET by ID: Melihat data peminjaman spesifik
app.get('/api/borrowings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const borrowing = await pool.query("SELECT * FROM borrowings WHERE id = $1", [id]);
        
        if (borrowing.rows.length === 0) return res.status(404).json({ message: "Data tidak ditemukan" });
        res.json(borrowing.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: Membuat data peminjaman baru
app.post('/api/borrowings', async (req, res) => {
    try {
        const { user_name, book_title } = req.body;
        const newBorrowing = await pool.query(
            "INSERT INTO borrowings (user_name, book_title) VALUES ($1, $2) RETURNING *",
            [user_name, book_title]
        );
        res.json({ message: "Peminjaman berhasil dicatat!", data: newBorrowing.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT: Mengubah status peminjaman
app.put('/api/borrowings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const updateBorrowing = await pool.query(
            "UPDATE borrowings SET status = $1 WHERE id = $2 RETURNING *",
            [status, id]
        );
        
        if (updateBorrowing.rows.length === 0) return res.status(404).json({ message: "Data tidak ditemukan" });
        res.json({ message: "Status peminjaman diperbarui!", data: updateBorrowing.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE: Menghapus riwayat peminjaman
app.delete('/api/borrowings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteBorrowing = await pool.query("DELETE FROM borrowings WHERE id = $1 RETURNING *", [id]);
        
        if (deleteBorrowing.rows.length === 0) return res.status(404).json({ message: "Data tidak ditemukan" });
        res.json({ message: "Data peminjaman berhasil dihapus!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ============================================
// 4. Menjalankan Server
// ============================================
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});