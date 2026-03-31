CREATE TABLE borrowings (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    book_title VARCHAR(255) NOT NULL,
    borrow_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(50) DEFAULT 'Dipinjam'
);

