using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminDashboard.Core.Entities.Business
{
    public class ApprovalRequest
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Approver")]
        public int ApproverId { get; set; }
        public Employee? Approver { get; set; }

        [ForeignKey("LeaveRequest")]
        public int LeaveRequestId { get; set; }
        public LeaveRequest? LeaveRequest { get; set; }

        [Required]
        public string Status { get; set; } = "New";

        public string Comment { get; set; }


    }
}
