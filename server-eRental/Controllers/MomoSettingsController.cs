using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System;
using server_eRental.Models.Momo;

[Route("api/[controller]")]
[ApiController]
public class MomoPaymentController : ControllerBase
{
    private readonly MomoOption _momoOption;

    public MomoPaymentController(IOptions<MomoOption> momoOption)
    {
        _momoOption = momoOption.Value;
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreatePayment([FromBody] MomoExecuteResponse request)
    {
        string orderId = DateTime.Now.Ticks.ToString();
        string requestId = Guid.NewGuid().ToString();
        string amount = request.Amount.ToString();

        string rawHash = $"accessKey={_momoOption.AccessKey}&amount={amount}&extraData=&ipnUrl={_momoOption.NotifyUrl}&orderId={orderId}&orderInfo=Thanh toán hóa đơn&partnerCode={_momoOption.PartnerCode}&redirectUrl={_momoOption.ReturnUrl}&requestId={requestId}&requestType=captureWallet";

        string signature;
        using (var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(_momoOption.SecretKey)))
        {
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(rawHash));
            signature = BitConverter.ToString(hash).Replace("-", "").ToLower();
        }

        var paymentData = new
        {
            partnerCode = _momoOption.PartnerCode,
            accessKey = _momoOption.AccessKey,
            requestId,
            amount,
            orderId,
            orderInfo = "Thanh toán hóa đơn",
            redirectUrl = _momoOption.ReturnUrl,
            ipnUrl = _momoOption.NotifyUrl,
            extraData = "",
            requestType = "captureWallet",
            signature,
            lang = "vi"
        };

        using var client = new HttpClient();
        var httpResponse = await client.PostAsync(
            _momoOption.MomoApiUrl,
            new StringContent(JsonConvert.SerializeObject(paymentData), Encoding.UTF8, "application/json")
        );

        var responseContent = await httpResponse.Content.ReadAsStringAsync();

        if (!httpResponse.IsSuccessStatusCode)
        {
            return BadRequest(new
            {
                message = "Không gọi được đến MoMo API",
                status = httpResponse.StatusCode,
                response = responseContent
            });
        }

        var momoResponse = JsonConvert.DeserializeObject<MomoCreatePaymentResponse>(responseContent);

        if (momoResponse != null && !string.IsNullOrEmpty(momoResponse.PayUrl))
        {
            return Ok(new { payUrl = momoResponse.PayUrl });
        }

        return BadRequest(new
        {
            message = "Không nhận được URL thanh toán từ MoMo",
            response = responseContent
        });
    }
    [HttpGet("return")]
    public IActionResult Return([FromQuery] string resultCode, [FromQuery] string orderId)
    {
        string baseUrl = "http://localhost:3000/";

        // Kiểm tra mã kết quả giao dịch
        if (resultCode == "0")
        {
            // Thanh toán thành công, chuyển hướng đến trang Bill
            return Redirect($"{baseUrl}payment?status=success&orderId={orderId}");
        }
        else
        {
            // Thanh toán thất bại, quay lại trang Payment
            return Redirect($"{baseUrl}payment?status=fail&orderId={orderId}");
        }
    }

    [HttpPost("notify")]
    public IActionResult Notify([FromBody] object payload)
    {
        return Ok();
    }
}
