using AdminDashboard.Core.Constants;
using AdminDashboard.Core.Dtos.Project;
using AdminDashboard.Core.Entities.Business;
using AdminDashboard.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AdminDashboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER}, {StaticUserRoles.HRMANAGER}")]
        public async Task<ActionResult<IEnumerable<Project>>> GetAllProjects()
        {
            var projectsList = await _projectService.GetAllProjectsAsync();
            return Ok(projectsList);
        }

        [HttpGet("sort")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER}, {StaticUserRoles.HRMANAGER}")]
        public async Task<ActionResult<IEnumerable<Project>>> SortProjects(string sortBy)
        {
            var projects = await _projectService.SortProjectsAsync(sortBy);
            return Ok(projects);
        }

        [HttpGet("filter")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER}, {StaticUserRoles.HRMANAGER}")]
        public async Task<ActionResult<IEnumerable<Project>>> FilterProjects(string filterBy, string filterValue)
        {
            var projects = await _projectService.FilterProjectsAsync(filterBy, filterValue);
            return Ok(projects);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER}, {StaticUserRoles.HRMANAGER}")]
        public async Task<ActionResult<Project>> GetProjectDetails(int id)
        {
            var project = await _projectService.GetProjectDetailsAsync(id);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }

        [HttpPost]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER}")]
        public async Task<ActionResult> CreateProject([FromBody] ProjectDto projectDto)
        {
            await _projectService.CreateProjectAsync(projectDto);
            return Ok();
        }

        [HttpPut("{id}")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER}")]
        public async Task<ActionResult> UpdateProject(int id, Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            await _projectService.UpdateProjectAsync(id, project);
            return Ok();
        }

        [HttpPut("deactivate/{id}")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER}")]
        public async Task<ActionResult> ChangeStatusToDeactivated(int id)
        {
            await _projectService.ChangeStatusToDeactivatedAsync(id);
            return Ok();
        }

    }
}
