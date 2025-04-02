import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card} from "antd-mobile";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { handleRent } from "../components/RentHandlers";
import "../styles/RentPage.scss"; 
import { useSelector } from "react-redux";

const RentPage = () => {
  const { productId } = useParams(); // Lấy productId từ URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const userId = useSelector((state) => state.login.user.userId);

  useEffect(() => {
    fetch(`https://localhost:5001/api/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Lỗi khi tải sản phẩm:", err));
  }, [productId]);

  if (!product) {
    return <p>Đang tải thông tin sản phẩm...</p>;
  }
  return (
    <div className="rent-container">
      <Card className="rent-card">
        <img src={product.imageUrl} alt={product.name} className="rent-image" />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p><strong>Giá thuê:</strong> ${product.price} / ngày</p>

        <Button className="rent-button" onClick={() => handleRent({ userId, product, navigate })}>
          <ShoppingCartOutlined className="rent-icon" />
          Xác nhận thuê
        </Button>
      </Card>
    </div>
  );
};

export default RentPage;
