export const fetchProducts = () => async (dispatch) => {
    try {
      dispatch({ type: 'PRODUCTS_REQUEST' });
  
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
  
      const data = await response.json();
  
      dispatch({
        type: 'PRODUCTS_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'PRODUCTS_FAIL',
        payload: error.message,
      });
    }
  };
  
  export const searchProducts = (query) => async (dispatch) => {
    try {
      dispatch({ type: 'PRODUCTS_REQUEST' });
  
      const response = await fetch(`http://localhost:5000/api/products/search?query=${query}`);
      if (!response.ok) throw new Error('Failed to search products');
  
      const data = await response.json();
  
      dispatch({
        type: 'PRODUCTS_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'PRODUCTS_FAIL',
        payload: error.message,
      });
    }
  };
  