-- CREATE USERS
INSERT INTO "user" (id, name, email, password) VALUES 
('1', 'Kerem Çakır', 'test.user@mail.com', '$2b$10$rLvN6n64iUAOMD4aFrDDwuyLjHUYhsOtZj32wsZEy4IiGQ5vjQfDq');

-- CREATE BOOK TYPES
INSERT INTO book_type (id, name) VALUES
('1', 'Science Fiction'),
('2', 'Mystery'),
('3', 'Romance'),
('4', 'Horror'),
('5', 'Fantasy');

-- CREATE AUTHORS
INSERT INTO author (id, name) VALUES
('1', 'William Shakespeare'),
('2', 'J.K. Rowling'),
('3', 'Gabriel García Márquez'),
('4', 'Leo Tolstoy'),
('5', 'George Orwell');

-- CREATE BOOKS
INSERT INTO book (id, name, publish_year, author_id, type_id) VALUES
('1', 'Hamlet', '2024', '1', '1'),
('2', 'Harry Potter', '2023', '2', '2'),
('3', 'One Hundred Years of Solitude', '2022', '3', '3'),
('4', 'War and Peace', '2021', '4', '4'),
('5', '1984', '2020', '5', '5');
