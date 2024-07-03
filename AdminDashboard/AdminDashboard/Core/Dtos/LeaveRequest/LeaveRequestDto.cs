using System.ComponentModel.DataAnnotations;

namespace AdminDashboard.Core.Dtos.LeaveRequest
{
    public class LeaveRequestDto
    {
        public Entities.Business.Employee? Employee { get; set; }

        [Required(ErrorMessage = "AbscenseReason is required")]
        public string AbscenseReason { get; set; }

        [Required(ErrorMessage = "StartDate is required")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "EndDate is required")]
        public DateTime EndDate { get; set; }

        public string Comment { get; set; }

        [Required(ErrorMessage = "Status is required")]
        public string Status { get; set; }


    }
}
