using AdminDashboard.Core.Constants;
using AdminDashboard.Core.Entities.Business;
using AdminDashboard.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult<Employee>> GetEmployeeByName(string fullName)
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
        public async Task<ActionResult> AddEmployee(Employee employee)
        {
            await _employeeService.AddEmployeeAsync(employee);
            return Ok();
        }

        [HttpPut("{id}/update")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.HRMANAGER}")]
        public async Task<ActionResult> UpdateEmployee(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            await _employeeService.UpdateEmployeeAsync(employee);
            return Ok();
        }

        [HttpPut("{id}/deactivate")]
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

        [HttpPut("{id}/assignProject")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER}")]
        public async Task<ActionResult> AssignEmployeeToProject(int id, int projectId)
        {
            await _employeeService.AssignEmployeeToProjectAsync(id, projectId);
            return Ok();
        }

    }
}
