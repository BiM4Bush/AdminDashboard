using AdminDashboard.Core.Entities.Business;

namespace AdminDashboard.Core.Interfaces
{
    public interface IApprovalRequestService
    {
        Task<IEnumerable<ApprovalRequest>> SortEmployeesAsync(string sortBy);
        Task<IEnumerable<ApprovalRequest>> FilterEmployeesAsync(string filterBy, string filterValue);
        Task<ApprovalRequest> GetApprovalRequestByNumberAsync(int approvalRequestId);
        Task<ApprovalRequest> GetApprovalRequestDetailsAsync(int approvalRequestId);
        Task ApproveRequestAsync(int approvalRequestId);
        Task RejectRequestAsync(int approvalRequestId);
    }
}
