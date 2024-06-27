using AdminDashboard.Core.DBContext;
using AdminDashboard.Core.Dtos.Employee;
using AdminDashboard.Core.Entities.Business;
using AdminDashboard.Core.Interfaces;

namespace AdminDashboard.Core.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly ApplicationDbContext _context;

        public EmployeeService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddEmployeeAsync(EmployeeDto employeeDto)
        {
            Employee employee = new Employee()
            {
                FullName = employeeDto.FullName,
                Subdivision = employeeDto.Subdivision,
                Position = employeeDto.Position,
                Status = employeeDto.Status,
                PeoplePartner = employeeDto.PeoplePartner,
                PeoplePartnerId = employeeDto.PeoplePartner.Id,
                OutOfOfficeBalance = employeeDto.OutOfOfficeBalance,
                Photo = employeeDto.Photo
            };
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
        }

        public async Task AssignEmployeeToProjectAsync(int employeeId, int projectId)
        {
            var employee = _context.Employees.FirstOrDefault(x => x.Id == employeeId);
            if (employee != null)
            {
                var project = _context.Projects.FirstOrDefault(x => x.Id == projectId);
                if (project != null)
                {
                    project.ProjectManager = employee;
                    project.ProjectManagerId = employee.Id;
                }
            }
        }

        public async Task DeactivateEmployeeAsync(int employeeId)
        {
            var employee = _context.Employees.FirstOrDefault(e => e.Id == employeeId);
            if (employee == null)
            {
                employee.Status = "Deactivated";
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Employee>> FilterEmployeesAsync(string filterBy, string filterValue)
        {
            switch (filterBy.ToLower())
            {
                case "subdivision":
                    return _context.Employees.Where(e => e.Subdivision == filterValue);
                case "position":
                    return _context.Employees.Where(e => e.Position == filterValue);
                case "status":
                    return _context.Employees.Where(e => e.Status == filterValue);
                default:
                    return _context.Employees;
            }
        }

        public async Task<Employee> GetEmployeeByNameAsync(string fullName)
        {
            return _context.Employees.FirstOrDefault(e => e.FullName == fullName);
        }

        public async Task<Employee> GetEmployeeDetailsAsync(int employeeId)
        {
            return _context.Employees.FirstOrDefault(e => e.Id == employeeId);
        }

        public async Task<IEnumerable<Employee>> SortEmployeesAsync(string sortBy)
        {
            switch (sortBy.ToLower())
            {
                case "fullname":
                    return _context.Employees.OrderBy(e => e.FullName);
                case "subdivision":
                    return _context.Employees.OrderBy(e => e.Subdivision);
                case "position":
                    return _context.Employees.OrderBy(e => e.Position);
                case "status":
                    return _context.Employees.OrderBy(e => e.Status);
                default:
                    return _context.Employees.OrderBy(e => e.Id);
            }
        }

        public async Task UpdateEmployeeAsync(int id, Employee employee)
        {
            var existingEmployee = _context.Employees.FirstOrDefault(e => e.Id == id);
            if (existingEmployee != null)
            {
                existingEmployee.FullName = employee.FullName;
                existingEmployee.Subdivision = employee.Subdivision;
                existingEmployee.Position = employee.Position;
                existingEmployee.Status = employee.Status;
                existingEmployee.PeoplePartnerId = employee.PeoplePartnerId;
                existingEmployee.OutOfOfficeBalance = employee.OutOfOfficeBalance;
                existingEmployee.Photo = employee.Photo;
            }
            await _context.SaveChangesAsync();
        }
    }
}
