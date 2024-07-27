CREATE DATABASE SunsOutBunsOut;
GO

USE SunsOutBunsOut;
GO

CREATE TABLE Burgers (
    Id INT IDENTITY PRIMARY KEY,
    Name VARCHAR(255) not null unique,
    Description TEXT NULL,
    IsGlutenFree BIT NULL,
);
GO

INSERT INTO Burgers (Name, Description, IsGlutenFree) VALUES
('Classic Cheeseburger', 'A classic cheeseburger with lettuce, tomato, and pickles.', 0),
('Vegan Burger', 'A delicious vegan patty with avocado, lettuce, and tomato.', 1),
('BBQ Bacon Burger', 'A juicy burger topped with crispy bacon and BBQ sauce.', 0);
GO

SELECT * FROM Burgers;


