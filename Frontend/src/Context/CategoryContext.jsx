import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [CategoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/category`,
          {
            withCredentials: true, // ✅ send JWT cookie
          }
        );
        setCategoryList(res.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchCategory();
  }, []);

  return (
    <CategoryContext.Provider value={{ CategoryList, setCategoryList }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
