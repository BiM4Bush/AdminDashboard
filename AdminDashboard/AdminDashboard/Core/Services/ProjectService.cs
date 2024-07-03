using AdminDashboard.Core.DBContext;
using AdminDashboard.Core.Dtos.Project;
using AdminDashboard.Core.Entities.Business;
using AdminDashboard.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AdminDashboard.Core.Services
{
    public class ProjectService : IProjectService
    {
        private readonly ApplicationDbContext _context;

        public ProjectService(ApplicationDbContext context)
        {
             _context = context;
        }

        public async Task ChangeStatusToDeactivatedAsync(int id)
        {
            var project = _context.Projects.FirstOrDefault(p => p.Id == id);
            if (project != null)
            {
                project.Status = "Deactivated";
            }
            await _context.SaveChangesAsync();
        }

        public async Task CreateProjectAsync(ProjectDto projectdto)
        {
            Project project = new Project()
            {
                ProjectType = projectdto.ProjectType,
                StartDate = projectdto.StartDate,
                EndDate = projectdto.EndDate,
                ProjectManager = projectdto.ProjectManager,
                ProjectManagerId = projectdto.ProjectManager.Id,
                Comment = projectdto.Comment,
                Status = projectdto.Status
            };
            await _context.Projects.AddAsync(project);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Project>> FilterProjectsAsync(string filterBy, string filterValue)
        {
            switch (filterBy.ToLower())
            {
                case "projecttype":
                    return _context.Projects.Where(p => p.ProjectType.Contains(filterValue));
                case "startdate":
                    var startDate = DateTime.Parse(filterValue); 
                    return _context.Projects.Where(p => p.StartDate.Date == startDate.Date);
                case "enddate":
                    var endDate = DateTime.Parse(filterValue); 
                    return _context.Projects.Where(p => p.EndDate.HasValue && p.EndDate.Value.Date == endDate.Date);
                case "projectmanager":
                    return _context.Projects.Where(p => p.ProjectManager.FullName.Contains(filterValue));
                default:
                    return _context.Projects;
            }
        }

        public async Task<Project> GetProjectDetailsAsync(int id)
        {
            return _context.Projects.FirstOrDefault(x => x.Id == id);    
        }

        public async Task<IEnumerable<Project>> SortProjectsAsync(string sortBy)
        {
            switch (sortBy.ToLower())
            {
                case "projecttype":
                    return _context.Projects.OrderBy(p => p.ProjectType);
                case "startdate":
                    return _context.Projects.OrderBy(p => p.StartDate);
                case "enddate":
                    return _context.Projects.OrderBy(p => p.EndDate);
                case "projectmanager":
                    return _context.Projects.OrderBy(p => p.ProjectManager.FullName);
                default:
                    return _context.Projects.OrderBy(p => p.Id);
            }
        }

        public async Task UpdateProjectAsync(int id, Project project)
        {
            var existingProject = _context.Projects.FirstOrDefault(p => p.Id == id);
            if (existingProject != null)
            {
                existingProject.ProjectType = project.ProjectType;
                existingProject.StartDate = project.StartDate;
                existingProject.EndDate = project.EndDate;
                existingProject.ProjectManagerId = project.ProjectManagerId;
                existingProject.Comment = project.Comment;
                existingProject.Status = project.Status;
            }
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Project>> GetAllProjectsAsync()
        {
            return await _context.Projects.ToListAsync();
        }
    }
}
