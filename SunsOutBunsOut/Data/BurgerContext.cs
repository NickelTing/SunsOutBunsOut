using Microsoft.EntityFrameworkCore;

public class BurgerContext : DbContext
{
    public BurgerContext(DbContextOptions<BurgerContext> options)
        : base(options)
    {
    }

    public DbSet<Models.Burger> Burger { get; set; } = default!;
}