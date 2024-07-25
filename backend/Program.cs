using Microsoft.EntityFrameworkCore;
using Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure DbContext before building the app
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddDbContext<BurgerContext>(options =>
        options.UseInMemoryDatabase("Burger"));
}
else
{
    builder.Services.AddDbContext<BurgerContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("BurgerContext") ?? throw new InvalidOperationException("Connection string 'BurgerContext' not found.")));
}

// Dependency Injection
builder.Services.AddScoped<IBurgerRepository, BurgerRepository>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

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
