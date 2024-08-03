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
            // Add two burgers
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

                // Run the repository
                var burgers = await repository.GetAllBurgersAsync();

                // Assert 2 burgers in the database
                Assert.Equal(2, burgers.Count());
            }
        }

        [Fact]
        public async Task GetBurgerByIdAsync_ReturnsCorrectBurger()
        {
            // Add a Cheeseburger
            using (var context = CreateContext())
            {
                context.Burger.Add(new Burger { Id = 1, Name = "Cheeseburger" });
                await context.SaveChangesAsync();
            }

            using (var context = CreateContext())
            {
                var repository = new BurgerRepository(context);

                // Find the burger with id 1
                var burger = await repository.GetBurgerByIdAsync(1);

                // Assert 1 burger with the name Cheeseburger 
                Assert.NotNull(burger);
                Assert.Equal(1, burger.Id);
                Assert.Equal("Cheeseburger", burger.Name);
            }
        }

        [Fact]
        public async Task AddBurgerAsync_AddsBurger()
        {
            // Prepare a burger
            using (var context = CreateContext())
            {
                var repository = new BurgerRepository(context);
                var burger = new Burger { Id = 1, Name = "Cheeseburger" };

                // Add the burger
                await repository.AddBurgerAsync(burger);

                // Assert one burger in the database with the name Cheeseburger
                Assert.Equal(1, context.Burger.Count());
                Assert.Equal("Cheeseburger", context.Burger.Single().Name);
            }
        }

        [Fact]
        public async Task UpdateBurgerAsync_UpdatesBurger()
        {
            // Add a burger called Cheeseburger
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

                // Update the burger to Bacon Cheeseburger
                await repository.UpdateBurgerAsync(burger);

                // Assert the burger as Bacon Cheeseburger
                var updatedBurger = context.Burger.Single();
                Assert.Equal("Bacon Cheeseburger", updatedBurger.Name);
            }
        }

        [Fact]
        public async Task DeleteBurgerAsync_DeletesBurger()
        {
            // Add a new burger 
            using (var context = CreateContext())
            {
                context.Burger.Add(new Burger { Id = 1, Name = "Cheeseburger" });
                await context.SaveChangesAsync();
            }

            using (var context = CreateContext())
            {
                var repository = new BurgerRepository(context);

                // Delete the burger
                await repository.DeleteBurgerAsync(1);

                // Assert no burger in the database
                Assert.Empty(context.Burger);
            }
        }

        [Fact]
        public async Task BurgerExistsAsync_ReturnsCorrectly()
        {
            // Add a Cheeseburger
            using (var context = CreateContext())
            {
                context.Burger.Add(new Burger { Id = 1, Name = "Cheeseburger" });
                await context.SaveChangesAsync();
            }

            using (var context = CreateContext())
            {
                var repository = new BurgerRepository(context);

                // Check if the burgers exist
                var exists = await repository.BurgerExistsAsync(1);
                var notExists = await repository.BurgerExistsAsync(2);

                // Assert there is burger with id 1 but not with id 2
                Assert.True(exists);
                Assert.False(notExists);
            }
        }

        [Fact]
        public async Task BulkAddBurgersAsync_AddsBurgers()
        {
            // Prepare two burgers
            using (var context = CreateContext())
            {
                var repository = new BurgerRepository(context);
                var burgers = new List<Burger>
                {
                    new Burger { Id = 1, Name = "Cheeseburger" },
                    new Burger { Id = 2, Name = "Veggie Burger" }
                };

                // Add two new burgers at the same time
                await repository.BulkAddBurgersAsync(burgers);

                // Assert two burgers in the database
                Assert.Equal(2, context.Burger.Count());
            }
        }

        // Delete records
        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }
    }
}
