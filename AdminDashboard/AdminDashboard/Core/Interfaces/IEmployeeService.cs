﻿using AdminDashboard.Core.Dtos.Employee;
using AdminDashboard.Core.Entities.Business;

namespace AdminDashboard.Core.Interfaces
{
    public interface IEmployeeService
    {
        Task<IEnumerable<Employee>> SortEmployeesAsync(string sortBy);
        Task<IEnumerable<Employee>> FilterEmployeesAsync(string filterBy, string filterValue);
        Task<Employee> GetEmployeeByNameAsync(string fullName);
        Task AddEmployeeAsync(EmployeeDto employeeDto);
        Task UpdateEmployeeAsync(int id, Employee employee);
        Task DeactivateEmployeeAsync(int employeeId);
        Task<Employee> GetEmployeeDetailsAsync(int employeeId);
        Task AssignEmployeeToProjectAsync(int employeeId, int projectId);
    }
}
