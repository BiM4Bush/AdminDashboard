﻿namespace AdminDashboard.Core.Entities.Users
{
    public class Log : BaseEntity<int>
    {
        public string? UserName { get; set; }
        public string Description { get; set; }
    }
}
