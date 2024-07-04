using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AdminDashboard.Core.Dtos.Auth
{
    public class UpdateRoleDto
    {
        [Required(ErrorMessage = " UserName is required")]
        public string UserName { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
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
