using AdminDashboard.Core.Constants;
using AdminDashboard.Core.Dtos.Employee;
using AdminDashboard.Core.Entities.Business;
using AdminDashboard.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AdminDashboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeesController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }
        [HttpGet]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER},{StaticUserRoles.HRMANAGER}")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployeesList()
        {
            var employeesList = await _employeeService.GetAllEmployeesAsync();
            return Ok(employeesList);
        }

        [HttpGet("sort")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER},{StaticUserRoles.HRMANAGER}")]
        public async Task<ActionResult<IEnumerable<Employee>>> SortEmployees(string sortBy)
        {
            var employees = await _employeeService.SortEmployeesAsync(sortBy);
            return Ok(employees);
        }

        [HttpGet("filter")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER},{StaticUserRoles.HRMANAGER}")]
        public async Task<ActionResult<IEnumerable<Employee>>> FilterEmployees(string filterBy, string filterValue)
        {
            var employees = await _employeeService.FilterEmployeesAsync(filterBy, filterValue);
            return Ok(employees);
        }

        [HttpGet("search-by-name")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER},{StaticUserRoles.HRMANAGER}")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployeeByName(string fullName)
        {
            var employee = await _employeeService.GetEmployeeByNameAsync(fullName);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        [HttpPost]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.HRMANAGER}")]
        public async Task<ActionResult> AddEmployee([FromForm] EmployeeDto employeeDto)
        {
            await _employeeService.AddEmployeeAsync(employeeDto);
            return Ok();
        }

        [HttpPut("{id}")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.HRMANAGER}")]
        public async Task<ActionResult> UpdateEmployee(int id, [FromForm] EmployeeDto employeeDto)
        {
            await _employeeService.UpdateEmployeeAsync(id, employeeDto);
            return Ok();
        }

        [HttpPut("deactivate/{id}")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.HRMANAGER}")]
        public async Task<ActionResult> DeactivateEmployee(int id)
        {
            await _employeeService.DeactivateEmployeeAsync(id);
            return Ok();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER}")]
        public async Task<ActionResult<Employee>> GetEmployeeDetails(int id)
        {
            var employee = await _employeeService.GetEmployeeDetailsAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        [HttpPut("/assignProject/{id}")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER}")]
        public async Task<ActionResult> AssignEmployeeToProject(int id, int projectId)
        {
            await _employeeService.AssignEmployeeToProjectAsync(id, projectId);
            return Ok();
        }

    }
}
