

export const handleAddToCart = async ({productId, navigate}) => {
    const existingCart = JSON.parse(localStorage.getItem("rentItems")) || [];
    if (!existingCart.find(item => item.productId === productId)) {
      existingCart.push({ productId, quantity: 1 });
      localStorage.setItem("rentItems", JSON.stringify(existingCart));
    }
    navigate("/rent"); // điều hướng đến trang giỏ hàng
  };
  export const handleRemoveFromCart = (productId, dispatch, setRentItems) => {
    const currentCart = JSON.parse(localStorage.getItem("rentItems")) || [];
    
    // Lọc bỏ sản phẩm cần xóa
    const updatedCart = currentCart.filter(item => item.productId !== productId);
  
    // Kiểm tra nếu giỏ hàng trống, tránh lỗi trong Redux
    if (updatedCart.length === 0) {
      dispatch(setRentItems([])); 
    }
  
    // Cập nhật lại localStorage với giỏ hàng đã xóa
    localStorage.setItem("rentItems", JSON.stringify(updatedCart));
  
    dispatch(setRentItems(updatedCart));
  };