using AdminDashboard.Core.Constants;
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
    public class ApprovalRequestsController : ControllerBase
    {
        private readonly IApprovalRequestService _approvalRequestService;

        public ApprovalRequestsController(IApprovalRequestService approvalRequestService)
        {
            _approvalRequestService = approvalRequestService;
        }

        [HttpGet("sort")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER},{StaticUserRoles.HRMANAGER}")]
        public async Task<ActionResult<IEnumerable<ApprovalRequest>>> SortApprovalRequests(string sortBy)
        {
            var approvalRequests = await _approvalRequestService.SortEmployeesAsync(sortBy);
            return Ok(approvalRequests);
        }

        [HttpGet("filter")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER},{StaticUserRoles.HRMANAGER}")]
        public async Task<ActionResult<IEnumerable<ApprovalRequest>>> FilterApprovalRequests(string filterBy, string filterValue)
        {
            var approvalRequests = await _approvalRequestService.FilterEmployeesAsync(filterBy, filterValue);
            return Ok(approvalRequests);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER},{StaticUserRoles.HRMANAGER}")]
        public async Task<ActionResult<ApprovalRequest>> GetApprovalRequestDetails(int id)
        {
            var approvalRequest = await _approvalRequestService.GetApprovalRequestDetailsAsync(id);
            if(approvalRequest == null)
            {
                return NotFound();
            }
            return Ok(approvalRequest);
        }
        [HttpPut("{id}/approve")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER},{StaticUserRoles.HRMANAGER}")]
        public async Task<ActionResult<ApprovalRequest>> ApproveRequest(int id)
        {
            await _approvalRequestService.ApproveRequestAsync(id);
            return Ok();
        }

        [HttpPut("{id}/reject")]
        [Authorize(Roles = $"{StaticUserRoles.ADMIN},{StaticUserRoles.PROJECTMANAGER},{StaticUserRoles.HRMANAGER}")]
        public async Task<ActionResult<ApprovalRequest>> RejectRequest(int id)
        {
            await _approvalRequestService.RejectRequestAsync(id);
            return Ok();
        }
    }
}
