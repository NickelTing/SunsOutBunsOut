namespace Models
{
    public class Burger
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool IsGlutenFree { get; set; }
    }
}