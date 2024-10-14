using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using rraf.Models;

namespace rraf.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }

    private readonly string _connectionString = "Server=194.44.236.9;Database=svr_23;User=svr_23;Password=id23_svr;";

    [HttpGet("rraf-get-locations")]
    public async Task<IActionResult> GetLocations()
    {
        var locations = new List<Location>();

        using (var connection = new MySqlConnection(_connectionString))
        {
            await connection.OpenAsync();

            using (var cmd = new MySqlCommand("RrafGetLocations", connection))
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        locations.Add(new Location
                        {
                            Name = reader.GetString("name"),
                            Region = reader.GetString("Region")
                        });
                    }
                }
            }
        }

        return Ok(locations);
    }
}
