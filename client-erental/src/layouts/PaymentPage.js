import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, NavBar, Divider, Toast } from "antd-mobile";
import { useSelector } from "react-redux";
import { CheckCircleOutline } from "antd-mobile-icons";
import "../styles/PaymentPage.scss";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalPrice, products, startDate, endDate, quantityMap } = location.state || {};
  const user = useSelector((state) => state.login.user);
 
 

  const handlePayment = () => {
    Toast.show({ content: "Thanh toán thành công!", icon: "success" });
    navigate("/rent");
  };

  return (
    <div className="payment-container">
      <NavBar onBack={() => navigate("/rent")}>Xác nhận thanh toán</NavBar>

      <div className="payment-info">
        <h3>Thông tin thuê</h3>
        <p><strong>Khách hàng:</strong> {user?.user?.username}</p>
        <p><strong>Ngày bắt đầu:</strong> {startDate.toLocaleDateString()}</p>
        <p><strong>Ngày kết thúc:</strong> {endDate ? new Date(endDate).toLocaleDateString() : "Chưa chọn"}</p>
      </div>

      <Divider>Danh sách sản phẩm</Divider>

      {products.length > 0 ? products.map((item) => (
        <Card key={item.productId} className="payment-card">
          <div className="product-summary">
            <span>Tên sản phẩm: {item.name}</span>
            <span>Số lượng: {quantityMap[item.productId] || 1}</span>
          </div>
        </Card>
      )) : (
        <div className="empty-payment">Không có sản phẩm nào.</div>
      )}

      <Divider />
      <div className="total-section">
        <strong>Tổng thanh toán:</strong> ${totalPrice || 0}
      </div>

      <Button
        block
        color="primary"
        size="large"
        icon={<CheckCircleOutline />}
        className="confirm-button"
        onClick={handlePayment}
      >
        Xác nhận thanh toán
      </Button>
    </div>
  );
};

export default PaymentPage;
