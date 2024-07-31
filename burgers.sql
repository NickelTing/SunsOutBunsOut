-- SQL script to create local database and table, and insert sample data 
-- NOTE: the connection string in program.cs uses the server of (localdb)\\MSSQLLOCALDB 
-- (please activate if not already)

CREATE DATABASE SunsOutBunsOut;
GO

USE SunsOutBunsOut;
GO

CREATE TABLE Burger (
    Id INT IDENTITY PRIMARY KEY,
    Name VARCHAR(255) NOT NULL unique,
	Image VARCHAR(255) NULL,
    Description TEXT NULL,
	Price INT NULL,
    IsGlutenFree BIT NOT NULL,
);
GO


INSERT INTO Burger (Name, Description, Image, Price, IsGlutenFree) VALUES
('Classic Cheeseburger', 'A classic cheeseburger with lettuce, tomato, and pickles.', NULL, 10, 0),
('Vegan Burger', 'A delicious vegan patty with avocado, lettuce, and tomato.', NULL, 12, 1),
('BBQ Bacon Burger', 'A juicy burger topped with crispy bacon and BBQ sauce.', NULL, 15, 0);
GO

SELECT * FROM Burger;
GO