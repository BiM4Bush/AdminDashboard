namespace AdminDashboard.Core.Dtos.Auth
{
    public class LoginServiceResponseDto
    {
        public string NewToken { get; set; }

        //Return to front
        public UserInfoResult UserInfo { get; set; }
    }
}
