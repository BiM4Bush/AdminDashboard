﻿using AdminDashboard.Core.Entities.Business;

namespace AdminDashboard.Core.Interfaces
{
    public interface ILeaveRequestService
    {
        Task<IEnumerable<LeaveRequest>> SortLeaveRequestsAsync(string sortBy);
        Task<IEnumerable<LeaveRequest>> FilterLeaveRequestsAsync(string filterBy, string filterValue);
        Task<LeaveRequest> GetLeaveRequestDetailsAsync(int id);
        Task CreateLeaveRequestAsync(LeaveRequest leaveRequest);
        Task UpdateLeaveRequestAsync(int id, LeaveRequest leaveRequest);
        Task ChangeStatusToCancelAsync(int id);
    }
}
