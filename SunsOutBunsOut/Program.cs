using Microsoft.EntityFrameworkCore;
using Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure DbContext with connection string
builder.Services.AddDbContext<BurgerContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BurgerContext") ?? throw new InvalidOperationException("Connection string 'BurgerContext' not found.")));

// Dependency Injection
builder.Services.AddScoped<IBurgerRepository, BurgerRepository>();

// Allow CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
            .AllowAnyHeader()
            .AllowAnyOrigin(); // For localhost only. Allow all
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Check if the database is connected successfully
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<BurgerContext>();
    try
    {
        dbContext.Database.OpenConnection();
        Console.WriteLine("Database connection successful!");

        // Example query to test the database
        var testQuery = "SELECT COUNT(*) FROM Burger"; // Replace with your table name
        using (var command = dbContext.Database.GetDbConnection().CreateCommand())
        {
            command.CommandText = testQuery;
            var result = command.ExecuteScalar();
            Console.WriteLine($"Test query result: {result}");
        }

        dbContext.Database.CloseConnection();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Database connection failed: {ex.Message}");
    }
}


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
