using Microsoft.EntityFrameworkCore;
using Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Check if a connection string is provided
var connectionString = builder.Configuration.GetConnectionString("BurgerContext");
var useSqlServer = !string.IsNullOrEmpty(connectionString);

Console.WriteLine($"{useSqlServer}");
if (useSqlServer)
{
    try
    {
        // Create a temporary DbContext to test the SQL Server connection
        var optionsBuilder = new DbContextOptionsBuilder<BurgerContext>()
            .UseSqlServer(connectionString);

        using (var tempContext = new BurgerContext(optionsBuilder.Options))
        {
            tempContext.Database.OpenConnection();
        }

        // Configure DbContext to use SQL Server
        builder.Services.AddDbContext<BurgerContext>(options =>
            options.UseSqlServer(connectionString));
    }
    catch (Exception ex)
    {
        // Log the failure and fall back to in-memory database
        Console.WriteLine($"SQL Server connection failed: {ex.Message}");

        builder.Services.AddDbContext<BurgerContext>(options =>
            options.UseInMemoryDatabase("Burger"));
    }
}
else
{
    // Fall back to in-memory database if no connection string is provided
    Console.WriteLine($"Using InMemory Database");
    builder.Services.AddDbContext<BurgerContext>(options =>
        options.UseInMemoryDatabase("Burger"));
}

// Dependency Injection
builder.Services.AddScoped<IBurgerRepository, BurgerRepository>();

// Allow CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            // Change your localhost URL here
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Configure Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Enable CORS
app.UseCors("AllowReactApp");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
