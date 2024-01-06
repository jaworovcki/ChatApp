using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class UserDto
{
    [Required]
    [StringLength(20, MinimumLength = 3, ErrorMessage = "Name must be at least (3) and maximum (20) characters")]
    public string Name { get; set; }
}
