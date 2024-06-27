using AdminDashboard.Core.Entities.Business;
using System.ComponentModel.DataAnnotations;

namespace AdminDashboard.Core.Dtos.Project
{
    public class ProjectDto
    {
        [Required(ErrorMessage = "ProjectType is required")]
        public string ProjectType { get; set; }

        [Required(ErrorMessage = "StartDate is required")] 
        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public Entities.Business.Employee ProjectManager { get; set; }

        public string Comment { get; set; }

        [Required(ErrorMessage = "Status is required")]
        public string Status { get; set; }
    }
}
