import React from "react";
import { Button, Card, List, Toast } from "antd-mobile";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/BillPage.scss";

const BillPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    userName,
    paymentId,
    totalPrice,
    quantityMap = {},
    products = [],
    fetchedProducts = [],
  } = location.state || {};

  console.log("BillPage location state:", location.state);
  if (!paymentId || !userName || products.length === 0) {
    Toast.show({ content: "Thiếu dữ liệu hóa đơn", duration: 2000 });
    return null;
  }

  return (
    <div className="bill-container">
      <Card title="HÓA ĐƠN THANH TOÁN" className="header-card">
        <div>
          <strong>Tên người dùng:</strong> {userName}
        </div>
        <div>
          <strong>Mã thanh toán:</strong> {paymentId}
        </div>
        <div>
          <strong>Ngày lập:</strong> {new Date().toLocaleDateString()}
        </div>
      </Card>

      <Card title="Danh sách sản phẩm">
        <List>
          {fetchedProducts.map((item, index) => {
            // Lấy quantity từ cartProducts dựa trên productId
            const quantity = quantityMap[item.productId] || 1; // Hoặc bạn có thể lấy quantity từ cartProducts nếu bạn có thông tin đó
            return (
              <List.Item key={index}>
                <div>
                  <div className="product-name">{item.name}</div>
                  <div>Số lượng: {quantity}</div>
                  <div>
                    Giá:{" "}
                    {item.price ? item.price.toLocaleString() : "Chưa có giá"} đ
                  </div>
                </div>
              </List.Item>
            );
          })}
        </List>
      </Card>

      <Card>
        <div className="total-price">
          Tổng tiền: {totalPrice.toLocaleString()} đ
        </div>
      </Card>

      <Button className="print-button" onClick={() => window.print()}>
        In hóa đơn
      </Button>
      <Button className="back-button" onClick={() => navigate("/dashboard")}>
        Back to Home
      </Button>
    </div>
  );
};

export default BillPage;
