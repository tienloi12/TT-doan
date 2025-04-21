using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using server_eRental.Models.Momo;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System;  // Thêm dòng này để sử dụng Guid và BitConverter

namespace server_eRental.Services.Momo
{
    public class MomoService : IMomoService
    {
        private readonly MomoOption _options;
        private readonly HttpClient _httpClient;

        public MomoService(IOptions<MomoOption> options)
        {
            _options = options.Value;
            _httpClient = new HttpClient();
        }

        public async Task<MomoExecuteResponse> CreatePaymentAsync(MomoExecuteResponse request)
        {
            string requestId = Guid.NewGuid().ToString();  // Sử dụng Guid từ System
            string orderId = request.OrderId;
            int amount = request.Amount;

            // Tạo chuỗi raw data để ký chữ ký (signature)
            string rawHash = $"accessKey={_options.AccessKey}&amount={amount}&extraData=&ipnUrl={_options.NotifyUrl}&orderId={orderId}&orderInfo={request.OrderInfo}&partnerCode={_options.PartnerCode}&redirectUrl={_options.ReturnUrl}&requestId={requestId}&requestType=captureWallet";
            // Tạo chữ ký (signature) bằng HMAC SHA256
            string signature = CreateSignature(rawHash, _options.SecretKey);

            var payload = new
            {
                partnerCode = _options.PartnerCode,
                accessKey = _options.AccessKey,
                requestId = requestId,
                amount = amount,
                orderId = orderId,
                orderInfo = request.OrderInfo,
                redirectUrl = _options.ReturnUrl,
                ipnUrl = _options.NotifyUrl,
                lang = "vi",
                requestType = "captureWallet",
                extraData = "",
                signature = signature
            };

            // Gửi yêu cầu HTTP POST tới MoMo API
            var content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync(_options.MomoApiUrl, content); 

            var responseBody = await response.Content.ReadAsStringAsync();
            var momoResponse = JsonConvert.DeserializeObject<MomoCreatePaymentResponse>(responseBody);

            // Trả về đối tượng MomoExecuteResponse với các thông tin cần thiết
            return new MomoExecuteResponse
            {
                OrderId = momoResponse.OrderId,
                Amount = request.Amount,  // Hoặc lấy dữ liệu cần thiết từ MomoCreatePaymentResponse
                OrderInfo = momoResponse.Message // Hoặc điều chỉnh tùy theo nhu cầu
            };
        }

        // Phương thức tạo chữ ký (signature) bằng HMAC SHA256
        private string CreateSignature(string rawData, string secretKey)
        {
            var encoding = new System.Text.UTF8Encoding();
            byte[] keyByte = encoding.GetBytes(secretKey);
            byte[] messageBytes = encoding.GetBytes(rawData);

            using (var hmacsha256 = new System.Security.Cryptography.HMACSHA256(keyByte))
            {
                byte[] hashmessage = hmacsha256.ComputeHash(messageBytes);
                return BitConverter.ToString(hashmessage).Replace("-", "").ToLower();  // Thêm System namespace
            }
        }
    }
}
