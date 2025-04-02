import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderDetail } from "../redux/actions/OrderActions"; // Action để lưu chi tiết đơn hàng
import { useNavigate, useParams } from "react-router-dom";
import { Card, NavBar, Space } from "antd-mobile";
import "../styles/OrderDetail.scss"; // Import file SCSS
import { MoreOutlined } from "@ant-design/icons";

const OrderDetail = () => {
  const navigate = useNavigate();
  const { orderId } = useParams(); // Lấy orderId từ URL
  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.orders.orderDetail);

  useEffect(() => {
    // Lấy dữ liệu chi tiết đơn thuê từ API
    fetch(`https://localhost:5001/api/orders/${orderId}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setOrderDetail(data)); // Lưu chi tiết đơn thuê vào Redux store
      })
      .catch((err) => console.error("Lỗi khi tải chi tiết đơn thuê:", err));
  }, [orderId, dispatch]);

  if (!orderDetail) {
    return <p className="loading-message">Đang tải dữ liệu...</p>;
  }

  return (
    <div className="order-detail-container">
      <NavBar
        onBack={() => navigate(-1)}
      >
        Rental Detail
      </NavBar>
      <div className="order-detail-header">
        <h3>Chi tiết đơn thuê: {orderDetail.name}</h3>
      </div>

      <Card className="order-detail-card">
        <div className="rental-info">
          <p>
            <strong>Mô tả:</strong> {orderDetail.description}
          </p>
          <p>
            <strong>Giá:</strong> ${orderDetail.price}
          </p>
          <p>
            <strong>Tình trạng:</strong> {orderDetail.status}
          </p>
          <p>
            <strong>Ngày thuê:</strong>
            {orderDetail.rentals &&
            orderDetail.rentals[0] &&
            orderDetail.rentals[0].startDate
              ? new Date(orderDetail.rentals[0].startDate).toLocaleDateString(
                  "vi-VN"
                )
              : "N/A"}
          </p>
          <p>
            <strong>Ngày trả:</strong>
            {orderDetail.rentals &&
            orderDetail.rentals[0] &&
            orderDetail.rentals[0].endDate
              ? new Date(orderDetail.rentals[0].endDate).toLocaleDateString(
                  "vi-VN"
                )
              : "N/A"}
          </p>
        </div>
      </Card>

      <Space direction="vertical" block>
        {/* Hiển thị thông tin thanh toán nếu có */}
        <div className="payment-info">
          <strong>Thông tin thanh toán:</strong>
          <ul>
            {orderDetail.rentals[0]?.payments.map((payment, index) => (
              <li key={index}>
                Thanh toán số tiền ${payment.amount} vào{" "}
                {new Date(payment.date).toLocaleDateString("vi-VN")}
              </li>
            ))}
          </ul>
        </div>
      </Space>
    </div>
  );
};

export default OrderDetail;
