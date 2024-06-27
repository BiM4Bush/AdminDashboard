using System.ComponentModel.DataAnnotations;

namespace AdminDashboard.Core.Dtos.Auth
{
    public class UpdateRoleDto
    {
        [Required(ErrorMessage = " UserName is required")]
        public string UserName { get; set; }
        public RoleType NewRole { get; set; }
    }

    public enum RoleType
    {
        ADMIN,
        PROJECTMANAGER,
        HRMANAGER,
        EMPLOYEE
    }
}
