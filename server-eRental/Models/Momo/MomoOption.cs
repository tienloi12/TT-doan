namespace server_eRental.Models.Momo
{
    public class MomoOption
    {
        public string PartnerCode { get; set; }
        public string AccessKey { get; set; }
        public string SecretKey { get; set; }
        public string ReturnUrl { get; set; }
        public string NotifyUrl { get; set; }
        public string MomoApiUrl { get; set; }
        public string RequestType { get; set; }
    }
}