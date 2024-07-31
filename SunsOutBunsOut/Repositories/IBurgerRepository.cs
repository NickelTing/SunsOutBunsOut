using Models;

namespace Repositories
{
    public interface IBurgerRepository
    {
        Task<IEnumerable<Burger>> GetAllBurgersAsync();
        Task<Burger> GetBurgerByIdAsync(int id);
        Task AddBurgerAsync(Burger Burger);
        Task UpdateBurgerAsync(Burger Burger);
        Task DeleteBurgerAsync(int id);
        Task<bool> BurgerExistsAsync(int id);
        Task BulkAddBurgersAsync(IEnumerable<Burger> Burgers);
    }
}