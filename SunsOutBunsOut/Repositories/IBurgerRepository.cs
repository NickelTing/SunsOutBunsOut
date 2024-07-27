using Models;

namespace Repositories
{
    public interface IBurgerRepository
    {
        Task<IEnumerable<Burger>> GetAllBurgersAsync();
        Task<Burger> GetBurgerByIdAsync(long id);
        Task AddBurgerAsync(Burger Burger);
        Task UpdateBurgerAsync(Burger Burger);
        Task DeleteBurgerAsync(long id);
        Task<bool> BurgerExistsAsync(long id);
        Task BulkAddBurgersAsync(IEnumerable<Burger> Burgers);
    }
}