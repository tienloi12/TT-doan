import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, DatePicker, NavBar, Toast } from "antd-mobile";
import { CalendarOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { handleRent } from "../components/RentHandlers";
import "../styles/RentPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { setRentItems } from "../redux/actions/RentalActions";
import { handleRemoveFromCart } from "../components/ProductPageHandlers";

const RentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rentItems = useSelector((state) => state.rentalStatus.rentItems);
  const user = useSelector((state) => state.login.user);
  const today = new Date();
  const [startDate] = useState(today); // Set ngày bắt đầu là hôm nay, không cần chỉnh sửa nữa
  const [endDate, setEndDate] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantity] = useState(1); // Initialize quantity with a default value of 1
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantityMap, setQuantityMap] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  console.log("userId", user.user.userId);
  console.log("rentItems trong Redux:", rentItems);
  const handleConfirm = (val) => {
    setEndDate(val);
    setShowDatePicker(false);
  };
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("rentItems")) || [];
    dispatch(setRentItems(cart));
  }, [dispatch]);

  useEffect(() => {
    if (!rentItems || rentItems.length === 0) {
      console.log("Giỏ hàng trống");
    } else {
      console.log("Giỏ hàng còn lại:", rentItems);
    }
  }, [rentItems]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetched = await Promise.all(
          rentItems.map((item) =>
            fetch(`https://localhost:5001/api/products/${item.productId}`).then(
              (res) => res.json()
            )
          )
        );
        setProducts(fetched);

        const initialQuantities = {};
        rentItems.forEach((item) => {
          initialQuantities[item.productId] = item.quantity || 1;
        });
        setQuantityMap(initialQuantities);
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err);
      }
    };
    if (Array.isArray(rentItems) && rentItems.length > 0) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [rentItems]);

  useEffect(() => {
    if (products && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Kiểm tra start và end hợp lệ
      if (isNaN(start) || isNaN(end)) return;

      const days = Math.max(
        1,
        Math.ceil((end - start) / (1000 * 60 * 60 * 24))
      );

      let total = 0;
      products.forEach((product) => {
        const quantity = quantityMap[product.productId] || 1;
        total += product.price * quantity * days;
      });
      setTotalPrice(total);
    }
  }, [products, startDate, endDate, quantityMap]);


  useEffect(() => {
    const updatedCart = rentItems.map((item) => ({
      ...item,
      quantity: quantityMap[item.productId] || 1,
    }));
    localStorage.setItem("rentItems", JSON.stringify(updatedCart));
  }, [quantityMap]);
  
  return (
    <div className="rent-container">
      <NavBar onBack={() => navigate("/product")}>Rental cart</NavBar>
      {products.length > 0 ? (
        products.map((product) => (
          <Card key={product.productId} className="rent-card horizontal-card">
            <div className="card-content">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="rent-image"
              />
              <div className="card-details">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>
                  <strong>Giá thuê:</strong> ${product.price} / ngày
                </p>
                <p>{product.quantity}</p>

                <div className="quantity-control">
                  <Button
                    shape="rounded"
                    size="mini"
                    onClick={() =>
                      setQuantityMap((prev) => ({
                        ...prev,
                        [product.productId]: Math.max(
                          1,
                          (prev[product.productId] || 1) - 1
                        ),
                      }))
                    }
                  >
                    -
                  </Button>

                  <span>{quantityMap[product.productId] || 1}</span>

                  <Button
                    shape="rounded"
                    size="mini"
                    onClick={() =>
                      setQuantityMap((prev) => ({
                        ...prev,
                        [product.productId]: (prev[product.productId] || 1) + 1,
                      }))
                    }
                  >
                    +
                  </Button>
                </div>

                <Button
                  color="danger"
                  fill="outline"
                  size="mini"
                  onClick={() =>
                    handleRemoveFromCart(
                      product.productId,
                      dispatch,
                      setRentItems
                    )
                  }
                >
                  Xóa khỏi giỏ
                </Button>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div className="empty-cart-message">Giỏ hàng trống</div>
      )}
      <div className="date-picker-group">
        <div>Ngày bắt đầu: {startDate.toLocaleDateString()}</div>
        <Button onClick={() => setShowDatePicker(true)}>
          <CalendarOutlined />
        </Button>

        <DatePicker
          visible={showDatePicker}
          precision="day"
          value={endDate}
          min={startDate}
          onConfirm={handleConfirm}
        >
          {(value) => (
            <div>
              Ngày kết thúc: {value ? value.toLocaleDateString() : "Chọn ngày"}
            </div>
          )}
        </DatePicker>
      </div>

      <p>
        <strong>Tổng tiền:</strong> ${totalPrice}
      </p>
      <Button
        className="rent-button"
        color="primary"
        onClick={() => {
          if (products.length === 0) {
            Toast.show({ content: "Vui lòng chọn sản phẩm", duration: 2000 });
            return;
          }
          if (!endDate) {
            Toast.show({ content: "Vui lòng chọn ngày thuê!", duration: 2000 });
            return;
          }

          navigate("/payment", {
            state: {
              totalPrice,
              products,
              startDate,
              endDate,
              quantityMap,
            },
          }); // Điều hướng đến trang PaymentPage
        }}
      >
        Tiến hành thanh toán
      </Button>
      <Button
        className="rent-button"
        onClick={() =>
          handleRent({
            userId: user.user.userId,
            products,
            startDate,
            endDate,
            navigate,
            quantity,
            dispatch,
            totalPrice,
            quantityMap,
          })
        }
      >
        <ShoppingCartOutlined className="rent-icon" />
        Xác nhận thuê tất cả
      </Button>
    </div>
  );
};

export default RentPage;
