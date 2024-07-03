using AdminDashboard.Core.Constants;
using AdminDashboard.Core.Dtos.LeaveRequest;
using AdminDashboard.Core.Entities.Business;
using AdminDashboard.Core.Interfaces;
using AdminDashboard.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AdminDashboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveRequestsController : ControllerBase
    {
        private readonly ILeaveRequestService _leaveRequestService;

        public LeaveRequestsController(ILeaveRequestService leaveRequestService)
        {
            _leaveRequestService = leaveRequestService;
        }

        [HttpGet]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER},{StaticUserRoles.HRMANAGER}, {StaticUserRoles.EMPLOYEE}")]
        public async Task<ActionResult<IEnumerable<LeaveRequest>>> GetLeaveRequestsList()
        {
            var leaveRequestsList = await _leaveRequestService.GetAllLeaveRequestsAsync();
            return Ok(leaveRequestsList);
        }

        [HttpGet("sort")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER},{StaticUserRoles.HRMANAGER}, {StaticUserRoles.EMPLOYEE}")]
        public async Task<ActionResult<IEnumerable<LeaveRequest>>> SortLeaveRequests(string sortBy)
        {
            var leaveRequests = await _leaveRequestService.SortLeaveRequestsAsync(sortBy);
            return Ok(leaveRequests);
        }


        [HttpGet("filter")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER},{StaticUserRoles.HRMANAGER}, {StaticUserRoles.EMPLOYEE}")]
        public async Task<ActionResult<IEnumerable<LeaveRequest>>> FilterLeaveRequests(string filterBy, string filterValue)
        {
            var leaveRequests = await _leaveRequestService.FilterLeaveRequestsAsync(filterBy, filterValue);
            return Ok(leaveRequests);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER},{StaticUserRoles.HRMANAGER}")]
        public async Task<ActionResult<LeaveRequest>> GetLeaveRequestDetails(int id)
        {
            var leaveRequest = await _leaveRequestService.GetLeaveRequestDetailsAsync(id);
            if (leaveRequest == null)
            {
                return NotFound();
            }
            return Ok(leaveRequest);
        }

        [HttpPost]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.EMPLOYEE}")]
        public async Task<ActionResult> CreateLeaveRequest([FromBody] LeaveRequestDto leaveRequestDto)
        {
            await _leaveRequestService.CreateLeaveRequestAsync(leaveRequestDto);
            return Ok();
        }

        [HttpPut("{id}")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.EMPLOYEE}")]
        public async Task<ActionResult> UpdateLeaveRequest(int id, LeaveRequest leaveRequest)
        {
            if (id != leaveRequest.Id)
            {
                return BadRequest();
            }

            await _leaveRequestService.UpdateLeaveRequestAsync(id, leaveRequest);
            return NoContent();
        }

        [HttpPut("cancel/{id}")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.EMPLOYEE}")]
        public async Task<ActionResult> ChangeStatusToCancel(int id)
        {
            await _leaveRequestService.ChangeStatusToCancelAsync(id);
            return Ok();
        }
    }
}
