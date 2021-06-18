using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Logging;
using dotnet.Models;

namespace dotnet.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private static readonly User[] Users = new[]
        {
            new User {Id=1, FirstName="Ben", LastName="Winchester", Age=34, IsBamaFan=false},
            new User {Id=2, FirstName="Mark", LastName="Olivet", Age=39, IsBamaFan=true},
        };

        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<List<User>> GetAll()
        {
            List<User> usersFound = new List<User>();
            using(var conn = new SqliteConnection("Data Source=/home/ben/dev/workTut/backend/db.db"))
            {
                conn.Open();

                var command = conn.CreateCommand();
                command.CommandText = 
                @"
                    SELECT id, firstName, lastName, age, isBamaFan
                    FROM Users
                ";

                using(var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        User foundUser = new User {
                            Id = reader.GetInt32(0),
                            FirstName = reader.GetString(1),
                            LastName = reader.GetString(2),
                            Age = reader.GetInt32(3),
                            IsBamaFan = reader.GetBoolean(4)
                        };

                        usersFound.Add(foundUser);
                    }
                }
            }
            return Ok(usersFound);
        }

        [HttpGet("{id}")]
        public ActionResult<User> GetById(int id)
        {
            User foundUser = new User{};
             using(var conn = new SqliteConnection("Data Source=/home/ben/dev/workTut/backend/db.db"))
            {
                conn.Open();

                var command = conn.CreateCommand();
                command.CommandText = 
                @"
                    SELECT id, firstName, lastName, age, isBamaFan
                    FROM Users
                    WHERE id = $id
                ";

                command.Parameters.AddWithValue("$id", id);

                using(var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        foundUser.Id = reader.GetInt32(0);
                        foundUser.FirstName = reader.GetString(1);
                        foundUser.LastName = reader.GetString(2);
                        foundUser.Age = reader.GetInt32(3);
                        foundUser.IsBamaFan = reader.GetBoolean(4);
                    }
                }
            }
            if(foundUser.Id == null)
            {
                return NotFound();
            }
            return Ok(foundUser);
        }

        [HttpPost]
        public ActionResult<User> AddUser([FromBody] User newUser)
        {
            User writtenUser = new User{};
            using(var conn = new SqliteConnection("Data Source=/home/ben/dev/workTut/backend/db.db"))
            {
                conn.Open();

                var command = conn.CreateCommand();
                command.CommandText = 
                @"
                    INSERT INTO Users (firstName, lastName, age, isBamaFan)
                    VALUES ($fn, $ln, $age, $bama)
                ";

                command.Parameters.AddWithValue("$fn", newUser.FirstName);
                command.Parameters.AddWithValue("$ln", newUser.LastName);
                command.Parameters.AddWithValue("$age", newUser.Age);
                command.Parameters.AddWithValue("$bama", newUser.IsBamaFan);

                try
                {
                    command.ExecuteNonQuery();
                }
                catch
                {
                    return StatusCode(500);
                }

                var command2 = conn.CreateCommand();
                command2.CommandText = 
                @"
                    SELECT id, firstName, lastName, age, isBamaFan
                    FROM Users
                    ORDER BY id DESC
                    LIMIT 1
                ";

                using(var reader = command2.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        writtenUser.Id = reader.GetInt32(0);
                        writtenUser.FirstName = reader.GetString(1);
                        writtenUser.LastName = reader.GetString(2);
                        writtenUser.Age = reader.GetInt32(3);
                        writtenUser.IsBamaFan = reader.GetBoolean(4);
                    }
                }
            }
            if(writtenUser.Id == null)
            {
                return StatusCode(500);
            }
            return Created($"/user/{writtenUser.Id}",writtenUser);
        }
    }
}
