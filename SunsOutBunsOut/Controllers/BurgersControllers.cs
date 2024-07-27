using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Repositories;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BurgersController : ControllerBase
    {
        private readonly IBurgerRepository _repository;

        public BurgersController(IBurgerRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Burgers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Burger>>> GetBurgers()
        {
            var burgers = await _repository.GetAllBurgersAsync();
            return Ok(burgers);
        }

        // GET: api/Burgers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Burger>> GetBurger(long id)
        {
            var burger = await _repository.GetBurgerByIdAsync(id);

            if (burger == null)
            {
                return NotFound();
            }

            return Ok(burger);
        }

        // PUT: api/Burgers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBurger(long id, Burger burger)
        {
            if (id != burger.Id)
            {
                return BadRequest();
            }

            try
            {
                await _repository.UpdateBurgerAsync(burger);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _repository.BurgerExistsAsync(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Burgers
        [HttpPost]
        public async Task<ActionResult<Burger>> PostBurger(Burger burger)
        {
            await _repository.AddBurgerAsync(burger);
            return CreatedAtAction("GetBurger", new { id = burger.Id }, burger);
        }

        // DELETE: api/Burgers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBurger(long id)
        {
            var burger = await _repository.GetBurgerByIdAsync(id);
            if (burger == null)
            {
                return NotFound();
            }

            await _repository.DeleteBurgerAsync(id);

            return NoContent();
        }

        // POST: api/Burgers/bulk
        [HttpPost("bulk")]
        public async Task<ActionResult<IEnumerable<Burger>>> BulkCreateBurgers(IEnumerable<Burger> burgers)
        {
            if (burgers == null || !burgers.Any())
            {
                return BadRequest("Burger data is required.");
            }

            await _repository.BulkAddBurgersAsync(burgers);

            return Ok(burgers);
        }
    }
}