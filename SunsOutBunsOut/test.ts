using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Moq;
using Repositories;
using Models;
using Xunit;

public class BurgerRepositoryTests
{
    private readonly BurgerRepository _repository;
    private readonly BurgerContext _context;

    public BurgerRepositoryTests()
    {
        var options = new DbContextOptionsBuilder<BurgerContext>()
            .UseInMemoryDatabase(databaseName: "BurgerDatabase")
            .Options;
        _context = new BurgerContext(options);
        _repository = new BurgerRepository(_context);
    }

    [Fact]
    public async Task GetAllBurgersAsync_ReturnsAllBurgers()
    {
        // Arrange
        _context.Burger.AddRange(new List<Burger>
        {
            new Burger { Id = 1, Name = "Cheeseburger" },
            new Burger { Id = 2, Name = "Veggie Burger" }
        });
        await _context.SaveChangesAsync();

        // Act
        var result = await _repository.GetAllBurgersAsync();

        // Assert
        Assert.Equal(2, result.Count());
    }

    [Fact]
    public async Task GetBurgerByIdAsync_ReturnsBurger()
    {
        // Arrange
        var burger = new Burger { Id = 1, Name = "Cheeseburger" };
        _context.Burger.Add(burger);
        await _context.SaveChangesAsync();

        // Act
        var result = await _repository.GetBurgerByIdAsync(1);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Cheeseburger", result.Name);
    }

    [Fact]
    public async Task AddBurgerAsync_AddsBurger()
    {
        // Arrange
        var burger = new Burger { Id = 1, Name = "Cheeseburger" };

        // Act
        await _repository.AddBurgerAsync(burger);

        // Assert
        var result = await _context.Burger.FindAsync(1);
        Assert.NotNull(result);
        Assert.Equal("Cheeseburger", result.Name);
    }

    [Fact]
    public async Task UpdateBurgerAsync_UpdatesBurger()
    {
        // Arrange
        var burger = new Burger { Id = 1, Name = "Cheeseburger" };
        _context.Burger.Add(burger);
        await _context.SaveChangesAsync();

        burger.Name = "Updated Cheeseburger";

        // Act
        await _repository.UpdateBurgerAsync(burger);

        // Assert
        var result = await _context.Burger.FindAsync(1);
        Assert.NotNull(result);
        Assert.Equal("Updated Cheeseburger", result.Name);
    }

    [Fact]
    public async Task DeleteBurgerAsync_DeletesBurger()
    {
        // Arrange
        var burger = new Burger { Id = 1, Name = "Cheeseburger" };
        _context.Burger.Add(burger);
        await _context.SaveChangesAsync();

        // Act
        await _repository.DeleteBurgerAsync(1);

        // Assert
        var result = await _context.Burger.FindAsync(1);
        Assert.Null(result);
    }

    [Fact]
    public async Task BurgerExistsAsync_ReturnsTrueIfExists()
    {
        // Arrange
        var burger = new Burger { Id = 1, Name = "Cheeseburger" };
        _context.Burger.Add(burger);
        await _context.SaveChangesAsync();

        // Act
        var result = await _repository.BurgerExistsAsync(1);

        // Assert
        Assert.True(result);
    }

    [Fact]
    public async Task BulkAddBurgersAsync_AddsMultipleBurgers()
    {
        // Arrange
        var burgers = new List<Burger>
        {
            new Burger { Id = 1, Name = "Cheeseburger" },
            new Burger { Id = 2, Name = "Veggie Burger" }
        };

        // Act
        await _repository.BulkAddBurgersAsync(burgers);

        // Assert
        var result = await _context.Burger.ToListAsync();
        Assert.Equal(2, result.Count);
    }
}
