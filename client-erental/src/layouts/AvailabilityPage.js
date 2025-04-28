import React, { useEffect, useState } from "react";
import { NavBar, Button, Card, Space } from "antd-mobile";
import { FilterOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import TabBarComponent from "./Tarbar";
import "../../src/styles/AvailabilityPage.scss";

const RentalAvailability = () => {
  const navigate = useNavigate();
  const [availableProducts, setAvailableProducts] = useState([]); // Lưu trữ các sản phẩm có trạng thái available

  useEffect(() => {
    fetch("https://localhost:5001/api/products")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.$values)) {
          // Lọc các sản phẩm có trạng thái "available"
          const filteredProducts = data.$values.filter(
            (product) => product.statusCode === "available"
          );
          setAvailableProducts(filteredProducts); // Cập nhật state với sản phẩm có trạng thái "available"
          console.log(filteredProducts);
        } else {
          console.error("Dữ liệu trả về không phải là mảng", data);
        }
      })
      .catch((err) => console.error("Lỗi khi tải sản phẩm:", err));
  }, []);

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
        <h3>Danh sách sản phẩm có sẵn</h3>
        {availableProducts.length === 0 ? (
          <p>Chưa có sản phẩm nào có sẵn.</p>
        ) : (
          <Space direction="vertical" block className="rental-list">
            {availableProducts.map((product) => (
              <Card
                key={product.productId} // Dùng productId làm key cho Card
                title={product.name}
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  marginBottom: "10px",
                }}
                onClick={() => navigate(`/product/${product.productId}`)} // Điều hướng tới trang chi tiết sản phẩm
              >
                <div className="rental-card">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="rental-img"
                  />
                  <div className="rental-info">
                    <p>
                      <strong>Giá:</strong> ${product.price}
                    </p>
                    <p>
                      <strong>Tình trạng:</strong> {product.statusCode}
                    </p>
                    <p>
                      <strong>Mô tả:</strong> {product.description}
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
