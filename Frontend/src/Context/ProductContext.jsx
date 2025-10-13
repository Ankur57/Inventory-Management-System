import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [ProductList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/product`,
          {
            withCredentials: true, // ✅ send JWT cookie
          }
        );
        setProductList(res.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <ProductContext.Provider value={{ ProductList, setProductList }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
