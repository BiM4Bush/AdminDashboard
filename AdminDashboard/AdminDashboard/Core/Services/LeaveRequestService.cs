using AdminDashboard.Core.DBContext;
using AdminDashboard.Core.Entities.Business;
using AdminDashboard.Core.Interfaces;

namespace AdminDashboard.Core.Services
{
    public class LeaveRequestService : ILeaveRequest
    {
        private readonly ApplicationDbContext _context;

        public LeaveRequestService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task ChangeStatusToCancelAsync(int id)
        {
            var leaveRequest = _context.LeaveRequests.FirstOrDefault(x => x.Id == id);
            if (leaveRequest != null)
            {
                leaveRequest.Status = "Canceled";
            }
            await _context.SaveChangesAsync();
        }

        public async Task CreateLeaveRequestAsync(LeaveRequest leaveRequest)
        {
            await _context.LeaveRequests.AddAsync(leaveRequest);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<LeaveRequest>> FilterLeaveRequestsAsync(string filterBy, string filterValue)
        {
            switch (filterBy.ToLower())
            {
                case "status":
                    return _context.LeaveRequests.Where(lr => lr.Status == filterValue);
                case "employee":
                    return _context.LeaveRequests.Where(lr => lr.Employee.FullName.Contains(filterValue));
                default:
                    return _context.LeaveRequests;
            }
        }

        public async Task<LeaveRequest> GetLeaveRequestDetailsAsync(int id)
        {
            return _context.LeaveRequests.FirstOrDefault(x => x.Id == id);
        }

        public async Task<IEnumerable<LeaveRequest>> SortLeaveRequestsAsync(string sortBy)
        {
            switch (sortBy.ToLower())
            {
                case "status":
                    return _context.LeaveRequests.OrderBy(lr => lr.Status);
                case "employee":
                    return _context.LeaveRequests.OrderBy(lr => lr.Employee.FullName);
                case "startdate":
                    return _context.LeaveRequests.OrderBy(lr => lr.StartDate);
                case "enddate":
                    return _context.LeaveRequests.OrderBy(lr => lr.EndDate);
                default:
                    return _context.LeaveRequests.OrderBy(lr => lr.Id);
            }
        }

        public async Task UpdateLeaveRequestAsync(int id, LeaveRequest leaveRequest)
        {
            var existingLeaveRequest = _context.LeaveRequests.FirstOrDefault(lr => lr.Id == id);
            if (existingLeaveRequest != null)
            {
                existingLeaveRequest.EmployeeId = leaveRequest.EmployeeId;
                existingLeaveRequest.AbscenseReason = leaveRequest.AbscenseReason;
                existingLeaveRequest.StartDate = leaveRequest.StartDate;
                existingLeaveRequest.EndDate = leaveRequest.EndDate;
                existingLeaveRequest.Comment = leaveRequest.Comment;
                existingLeaveRequest.Status = leaveRequest.Status;
            }
            _context.SaveChangesAsync();
        }
    }
}
