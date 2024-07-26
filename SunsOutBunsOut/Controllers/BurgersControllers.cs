using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Repositories;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly IBurgerRepository _repository;

        public StudentsController(IBurgerRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Burgers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Burger>>> GetStudents()
        {
            var students = await _repository.GetAllBurgersAsync();
            return Ok(students);
        }

        // GET: api/Burgers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Burger>> GetStudent(long id)
        {
            var student = await _repository.GetBurgerByIdAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            return Ok(student);
        }

        // PUT: api/Burgers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudent(long id, Burger student)
        {
            if (id != student.Id)
            {
                return BadRequest();
            }

            try
            {
                await _repository.UpdateBurgerAsync(student);
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
        public async Task<ActionResult<Burger>> PostStudent(Burger burger)
        {
            await _repository.AddBurgerAsync(burger);
            return CreatedAtAction("GetStudent", new { id = burger.Id }, burger);
        }

        // DELETE: api/Burgers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(long id)
        {
            var student = await _repository.GetBurgerByIdAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            await _repository.DeleteBurgerAsync(id);

            return NoContent();
        }

        // POST: api/Burgers/bulk
        [HttpPost("bulk")]
        public async Task<ActionResult<IEnumerable<Burger>>> BulkCreateStudents(IEnumerable<Burger> students)
        {
            if (students == null || !students.Any())
            {
                return BadRequest("Student data is required.");
            }

            await _repository.BulkAddBurgersAsync(students);

            return Ok(students);
        }
    }
}