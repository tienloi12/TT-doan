import React, { useEffect } from "react";
import { NavBar, Button, Card, Space } from "antd-mobile";
import { FilterOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { setOrders } from "../redux/actions/OrderActions";
import TabBarComponent from "./Tarbar";
import "../../src/styles/AvailabilityPage.scss";
import { useDispatch, useSelector } from "react-redux";

const RentalAvailability = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  useEffect(() => {
    fetch("https://localhost:5001/api/orders")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setOrders(data));
        console.log(data);
      })
      .catch((err) => console.error("Lỗi khi tải đơn hàng:", err));
  }, [dispatch]);

  const generateDates = (days) => {
    const dateList = [];
    const today = new Date();

    for (let i = 0; i < days; i++) {
      const newDate = new Date(today);
      newDate.setDate(today.getDate() + i);

      const dayName = newDate.toLocaleDateString("en-US", { weekday: "short" });
      const formattedDate = newDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
      });

      dateList.push({
        day: dayName,
        date: formattedDate,
        path: `/date-${formattedDate.replace("/", "-")}`,
      });
    }

    return dateList;
  };

  const dates = generateDates(7);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <NavBar onBack={() => navigate(-1)}>Rental Availability (#)</NavBar>

      <div className="filter-section">
        <Button className="filter-btn" shape="rounded">
          <FilterOutline /> {dates[0].date}
        </Button>
        <div className="date-columns">
          {dates.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="date"
              onClick={() => navigate(item.path)}
            >
              {item.day} {item.date}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flexGrow: 1, background: "#fff", padding: "10px" }}>
        <h3>Danh sách sản phẩm đã thuê</h3>
        {orders.length === 0 ? (
          <p>Chưa có sản phẩm nào được thuê.</p>
        ) : (
          <Space direction="vertical" block className="rental-list">
            {orders
              .filter((order) => order.status === "sẵn sàng")
              .map((order) => (
                <Card
                  key={order.orderId}
                  title={order.name}
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    marginBottom: "10px",
                  }}
                  onClick={() => navigate(`/order/${order.orderId}`)}
                >
                  <div className="rental-card">
                    <img
                      src={order.imageUrl}
                      alt={order.name}
                      className="rental-img"
                    />
                    <div className="rental-info">
                      <p>
                        <strong>Giá:</strong> ${order.price}
                      </p>
                      <p>
                        <strong>Tình trạng:</strong> {order.status}
                      </p>
                      <p>
                        Ngày thuê:{" "}
                        {order.rentals?.[0]?.startDate
                          ? new Date(
                              order.rentals[0].startDate
                            ).toLocaleDateString("vi-VN")
                          : "N/A"}{" "}
                        - Ngày trả:{" "}
                        {order.rentals?.[0]?.endDate
                          ? new Date(
                              order.rentals[0].endDate
                            ).toLocaleDateString("vi-VN")
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
          </Space>
        )}
      </div>

      <TabBarComponent />
    </div>
  );
};

export default RentalAvailability;
