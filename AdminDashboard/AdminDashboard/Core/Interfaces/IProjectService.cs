using AdminDashboard.Core.Entities.Business;

namespace AdminDashboard.Core.Interfaces
{
    public interface IProjectService
    {
        Task<IEnumerable<Project>> SortProjectsAsync(string sortBy);
        Task<IEnumerable<Project>> FilterProjectsAsync(string filterBy, string filterValue);
        Task<Project> GetProjectDetailsAsync(int id);
        Task CreateProjectAsync(Project project);
        Task UpdateProjectAsync(int id, Project project);
        Task ChangeStatusToDeactivatedAsync(int id);
    }
}
