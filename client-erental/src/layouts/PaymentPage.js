import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, NavBar, Divider, Toast } from "antd-mobile";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleOutline } from "antd-mobile-icons";
import "../styles/PaymentPage.scss";
import {
  handleMoMoReturn,
  handlePayment,
  handlePaymentWithMomo,
} from "../components/PaymentPageHandlers";

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.login.user);

  // Sử dụng useMemo để giữ cartProducts cố định
  const cartProducts = useMemo(() => {
    return JSON.parse(localStorage.getItem("cartProducts")) || [];
  }, []);

  const rentalDates = useMemo(() => {
    return JSON.parse(localStorage.getItem("rentalDates")) || {
      startDate: null,
      endDate: null,
    };
  }, []);
  const quantityMap = useMemo(() => {
    const map = {};
    cartProducts.forEach((item) => {
      map[item.productId] = item.quantity;
    });
    return map;
  }, [cartProducts]);

  const {
    rentalId,
    orderId,
    totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0,
    startDate = rentalDates.startDate,
    endDate = rentalDates.endDate,
  } = location.state || {};

  const [fetchedProducts, setFetchedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetched = await Promise.all(
          cartProducts.map((item) =>
            fetch(`http://localhost:5000/api/products/${item.productId}`).then((res) =>
              res.json()
            )
          )
        );
        setFetchedProducts(fetched);
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err);
      }
    };

    fetchProducts();
  }, [cartProducts]);

  console.log("Fetched products:", fetchedProducts);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const resultCode = params.get("resultCode");
    const returnedOrderId = params.get("orderId");

    if (resultCode && returnedOrderId) {
      handleMoMoReturn(resultCode, returnedOrderId, navigate);
    }
  }, [location]);

  const handlePaymentWithMomoClick = async () => {
    try {
      await handlePaymentWithMomo({
        totalPrice,
        products: cartProducts,
        startDate,
        endDate,
        quantityMap,
        navigate,
        user,
        rentalId,
        orderId,
      });
    } catch (error) {
      Toast.show({
        content: "Thanh toán MoMo thất bại!",
        duration: 2000,
      });
    }
  };

  return (
    <div className="payment-container">
      <NavBar onBack={() => navigate("/rent")}>Xác nhận thanh toán</NavBar>

      <div className="payment-info">
        <h3>Thông tin thuê</h3>
        <p>
          <strong>Khách hàng:</strong> {user?.user?.username}
        </p>
        <p>
          <strong>Ngày bắt đầu:</strong>{" "}
          {startDate ? new Date(startDate).toLocaleDateString() : "Chưa chọn"}
        </p>
        <p>
          <strong>Ngày kết thúc:</strong>{" "}
          {endDate ? new Date(endDate).toLocaleDateString() : "Chưa chọn"}
        </p>
      </div>

      <Divider>Danh sách sản phẩm</Divider>
      {fetchedProducts && fetchedProducts.length > 0 ? (
        fetchedProducts.map((item) => (
          <Card key={item.productId} className="payment-card">
            <div className="product-summary">
              <span>Tên sản phẩm: {item.name}</span>
              <span>Số lượng: {quantityMap[item.productId] || 1}</span>
            </div>
          </Card>
        ))
      ) : (
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
        onClick={() =>
          handlePayment({
            userId: user.user.userId,
            products: cartProducts,
            startDate,
            endDate,
            navigate,
            quantityMap,
            dispatch,
            totalPrice,
            user,
            orderId,
            rentalId,
            fetchedProducts,
          })
        }
      >
        Xác nhận
      </Button>
      <Button
        block
        color="primary"
        size="large"
        className="confirm-button momo-button"
        onClick={handlePaymentWithMomoClick}
      >
        Thanh toán qua MoMo
      </Button>
    </div>
  );
};

export default PaymentPage;
