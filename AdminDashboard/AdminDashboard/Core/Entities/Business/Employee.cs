using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminDashboard.Core.Entities.Business
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string FullName { get; set; }
        
        [Required]
        public string Subdivision { get; set; }

        [Required]
        public string Position { get; set; }

        [Required]
        public string Status { get; set; }

        [ForeignKey("PeoplePartner")]
        public int? PeoplePartnerId { get; set; }
        public Employee PeoplePartner { get; set; }

        public decimal OutOfOfficeBalance { get; set; }

        public byte[] Photo {  get; set; }

    }
}
