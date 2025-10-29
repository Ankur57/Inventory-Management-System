import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const InventoryContext = createContext();
axios.defaults.withCredentials = true;

const InventoryProvider = ({ children }) => {
  const [inventoryList, setInventoryList] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/inventory`,
          {
            withCredentials: true, // ✅ send JWT cookie
          }
        );
        setInventoryList(res.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <InventoryContext.Provider value={{ inventoryList, setInventoryList }}>
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
