import React, { useState, useEffect } from "react";
import { SearchBar, Card, Image, NavBar, SpinLoading, Button } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import "../styles/ProductPage.scss";
import TabBarComponent from "./Tarbar";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { handleAddToCart } from "../components/ProductPageHandlers";

const ProductList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product data from API
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://localhost:5001/api/products");
        if (!response.ok) throw new Error("Failed to load product list");
        const data = await response.json();
  
        // Kiểm tra xem có $values không và chỉ cần lấy danh sách sản phẩm
        if (data && Array.isArray(data.$values)) {
          setProducts(data.$values); // Chỉ lưu trữ mảng $values vào state
        } else {
          console.error("Dữ liệu trả về không hợp lệ:", data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  

  // Filter products based on search input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="product-list">
      <NavBar onBack={() => navigate(-1)}>Product List</NavBar>

      {/* Search Bar */}
      <SearchBar
        placeholder="Search for products..."
        value={search}
        onChange={setSearch}
        className="search-bar"
      />

      {/* Product Display */}
      <div className="product-grid">
        {loading ? (
          <SpinLoading  size="large" />
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.productId} className="product-card">
              <Image
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.price.toLocaleString()} VND</p>
              </div>
              <p>Số lượng : {product.quantity}</p>
              <Button
              className="rent-button"
              onClick={() => handleAddToCart({productId : product.productId ,navigate})}
            >
              <ShoppingCartOutlined className="rent-icon" />
              Thuê ngay
            </Button>
            </Card>
          ))
        ) : (
          <p className="no-results">No products found</p>
        )}
      </div>

      <TabBarComponent />
    </div>
  );
};

export default ProductList;