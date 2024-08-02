using Microsoft.EntityFrameworkCore;
using Models;

namespace Repositories
{
    public class BurgerRepository : IBurgerRepository
    {
        private readonly BurgerContext _context;

        public BurgerRepository(BurgerContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Burger>> GetAllBurgersAsync()
        {
            return await _context.Burger.ToListAsync();
        }

        public async Task<Burger> GetBurgerByIdAsync(int id)
        {
            var burger = await _context.Burger.FindAsync(id);
            if (burger == null)
            {
                throw new InvalidOperationException($"Burger with ID {id} not found.");
            }
            return burger;
        }


        public async Task AddBurgerAsync(Burger Burger)
        {
            _context.Burger.Add(Burger);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBurgerAsync(Burger Burger)
        {
            _context.Entry(Burger).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBurgerAsync(int id)
        {
            var burger = await _context.Burger.FindAsync(id);
            if (burger != null)
            {
                _context.Burger.Remove(burger);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> BurgerExistsAsync(int id)
        {
            return await _context.Burger.AnyAsync(e => e.Id == id);
        }

        public async Task BulkAddBurgersAsync(IEnumerable<Burger> Burgers)
        {
            await _context.Burger.AddRangeAsync(Burgers);
            await _context.SaveChangesAsync();
        }
    }
}