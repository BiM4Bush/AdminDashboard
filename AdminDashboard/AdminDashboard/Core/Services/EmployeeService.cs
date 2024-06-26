using AdminDashboard.Core.DBContext;
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

        public async Task AddEmployeeAsync(Employee employee)
        {
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
        }

        public Task AssignEmployeeToProjectAsync(int employeeId, int projectId)
        {
            throw new NotImplementedException();
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

        public async Task UpdateEmployeeAsync(Employee employee)
        {
            var existingEmployee = _context.Employees.FirstOrDefault(e => e.Id == employee.Id);
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
