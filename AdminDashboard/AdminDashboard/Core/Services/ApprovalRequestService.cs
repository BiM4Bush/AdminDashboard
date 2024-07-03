using AdminDashboard.Core.DBContext;
using AdminDashboard.Core.Entities.Business;
using AdminDashboard.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AdminDashboard.Core.Services
{
    public class ApprovalRequestService : IApprovalRequestService
    {
        private readonly ApplicationDbContext _context;

        public ApprovalRequestService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task ApproveRequestAsync(int approvalRequestId)
        {
            var approvalRequest = _context.ApprovalRequests.FirstOrDefault(ar => ar.Id == approvalRequestId);
            if (approvalRequest != null)
            {
                approvalRequest.Status = "Approved";
            }
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ApprovalRequest>> FilterEmployeesAsync(string filterBy, string filterValue)
        {
            switch (filterBy.ToLower())
            {
                case "status":
                    return _context.ApprovalRequests.Where(ar => ar.Status == filterValue);
                case "approver":
                    return _context.ApprovalRequests.Where(ar => ar.Approver.FullName.Contains(filterValue));
                default:
                    return _context.ApprovalRequests;
            }
        }

        public async Task<ApprovalRequest> GetApprovalRequestByNumberAsync(int approvalRequestId)
        {
            return _context.ApprovalRequests.FirstOrDefault(ar => ar.Id == approvalRequestId);
        }

        public async Task<ApprovalRequest> GetApprovalRequestDetailsAsync(int approvalRequestId)
        {
            return _context.ApprovalRequests.FirstOrDefault(ar => ar.Id == approvalRequestId);
        }

        public async Task RejectRequestAsync(int approvalRequestId)
        {
            var approvalRequest = _context.ApprovalRequests.FirstOrDefault(ar => ar.Id == approvalRequestId);
            if(approvalRequest != null)
            {
                approvalRequest.Status = "Rejected";
            }
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ApprovalRequest>> SortEmployeesAsync(string sortBy)
        {
            switch (sortBy.ToLower())
            {
                case "status":
                    return _context.ApprovalRequests.OrderBy(ar => ar.Status);
                case "approver":
                    return _context.ApprovalRequests.OrderBy(ar => ar.Approver.FullName);
                default:
                    return _context.ApprovalRequests.OrderBy(ar => ar.Id);
            }
        }

        public async Task<IEnumerable<ApprovalRequest>> GetAllApprovalRequestsAsync()
        {
            return await _context.ApprovalRequests.ToListAsync();
        }
    }
}
