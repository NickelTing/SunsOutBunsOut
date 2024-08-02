using Microsoft.EntityFrameworkCore;
using Xunit;
using Repositories;
using Models;

namespace BurgerRepositoryTests
{
    public class BurgerRepositoryTests : IDisposable
    {
        private readonly DbContextOptions<BurgerContext> _options;
        private readonly BurgerContext _context;

        public BurgerRepositoryTests()
        {
            _options = new DbContextOptionsBuilder<BurgerContext>()
                .UseInMemoryDatabase(databaseName: "Burger")
                .Options;
            _context = new BurgerContext(_options);
        }

        private BurgerContext CreateContext() => new BurgerContext(_options);

        [Fact]
        public async Task GetAllBurgersAsync_ReturnsAllBurgers()
        {
            // Arrange
            using (var context = CreateContext())
            {
                context.Burger.AddRange(
                    new Burger { Id = 1, Name = "Cheeseburger" },
                    new Burger { Id = 2, Name = "Veggie Burger" }
                );
                await context.SaveChangesAsync();
            }

            using (var context = CreateContext())
            {
                var repository = new BurgerRepository(context);

                // Act
                var burgers = await repository.GetAllBurgersAsync();

                // Assert
                Assert.Equal(2, burgers.Count());
            }
        }

        [Fact]
        public async Task GetBurgerByIdAsync_ReturnsCorrectBurger()
        {
            // Arrange
            using (var context = CreateContext())
            {
                context.Burger.Add(new Burger { Id = 1, Name = "Cheeseburger" });
                await context.SaveChangesAsync();
            }

            using (var context = CreateContext())
            {
                var repository = new BurgerRepository(context);

                // Act
                var burger = await repository.GetBurgerByIdAsync(1);

                // Assert
                Assert.NotNull(burger);
                Assert.Equal(1, burger.Id);
                Assert.Equal("Cheeseburger", burger.Name);
            }
        }

        [Fact]
        public async Task AddBurgerAsync_AddsBurger()
        {
            // Arrange
            using (var context = CreateContext())
            {
                var repository = new BurgerRepository(context);
                var burger = new Burger { Id = 1, Name = "Cheeseburger" };

                // Act
                await repository.AddBurgerAsync(burger);

                // Assert
                Assert.Equal(1, context.Burger.Count());
                Assert.Equal("Cheeseburger", context.Burger.Single().Name);
            }
        }

        [Fact]
        public async Task UpdateBurgerAsync_UpdatesBurger()
        {
            // Arrange
            using (var context = CreateContext())
            {
                context.Burger.Add(new Burger { Id = 1, Name = "Cheeseburger" });
                await context.SaveChangesAsync();
            }

            using (var context = CreateContext())
            {
                var repository = new BurgerRepository(context);
                var burger = await repository.GetBurgerByIdAsync(1);
                burger.Name = "Bacon Cheeseburger";

                // Act
                await repository.UpdateBurgerAsync(burger);

                // Assert
                var updatedBurger = context.Burger.Single();
                Assert.Equal("Bacon Cheeseburger", updatedBurger.Name);
            }
        }

        [Fact]
        public async Task DeleteBurgerAsync_DeletesBurger()
        {
            // Arrange
            using (var context = CreateContext())
            {
                context.Burger.Add(new Burger { Id = 1, Name = "Cheeseburger" });
                await context.SaveChangesAsync();
            }

            using (var context = CreateContext())
            {
                var repository = new BurgerRepository(context);

                // Act
                await repository.DeleteBurgerAsync(1);

                // Assert
                Assert.Empty(context.Burger);
            }
        }

        [Fact]
        public async Task BurgerExistsAsync_ReturnsCorrectly()
        {
            // Arrange
            using (var context = CreateContext())
            {
                context.Burger.Add(new Burger { Id = 1, Name = "Cheeseburger" });
                await context.SaveChangesAsync();
            }

            using (var context = CreateContext())
            {
                var repository = new BurgerRepository(context);

                // Act
                var exists = await repository.BurgerExistsAsync(1);
                var notExists = await repository.BurgerExistsAsync(2);

                // Assert
                Assert.True(exists);
                Assert.False(notExists);
            }
        }

        [Fact]
        public async Task BulkAddBurgersAsync_AddsBurgers()
        {
            // Arrange
            using (var context = CreateContext())
            {
                var repository = new BurgerRepository(context);
                var burgers = new List<Burger>
                {
                    new Burger { Id = 1, Name = "Cheeseburger" },
                    new Burger { Id = 2, Name = "Veggie Burger" }
                };

                // Act
                await repository.BulkAddBurgersAsync(burgers);

                // Assert
                Assert.Equal(2, context.Burger.Count());
            }
        }

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }
    }
}
