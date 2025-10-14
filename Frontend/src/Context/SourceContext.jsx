import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const SourceContext = createContext();

const SourceProvider = ({ children }) => {
  const [SourceList, setSourceList] = useState([]);

  useEffect(() => {
    const fetchSource = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/source`,
          {
            withCredentials: true, // ✅ send JWT cookie
          }
        );
        
        setSourceList(res.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchSource();
  }, []);

  return (
    <SourceContext.Provider value={{ SourceList, setSourceList }}>
      {children}
    </SourceContext.Provider>
  );
};

export default SourceProvider;
