using System.ComponentModel.DataAnnotations;

namespace AdminDashboard.Core.Dtos.Employee
{
    public class EmployeeDto
    {
        [Required(ErrorMessage = "FullName is required")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Subdivision is required")]
        public string Subdivision { get; set; }

        [Required(ErrorMessage = "Position is required")]
        public string Position { get; set; }

        [Required(ErrorMessage = "Status is required")]
        public string Status { get; set; }

        public Entities.Business.Employee? PeoplePartner { get; set; }

        public decimal OutOfOfficeBalance { get; set; }

        public IFormFile Photo { get; set; }
    }
}
