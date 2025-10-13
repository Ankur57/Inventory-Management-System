import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// 1. Create the Context
const MetricsContext = createContext();

// Hook to easily use the context in any component
export const useMetrics = () => {
  return useContext(MetricsContext);
};

// 2. Create the Provider Component
export const MetricsProvider = ({ children }) => {
  const [metrics, setMetrics] = useState({
    totalProfit: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use your environment variable (VITE_BASE_URL)
  const BASE_URL = import.meta.env.VITE_BASE_URL; 

  useEffect(() => {
    const fetchMetrics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Define endpoints (assuming they are set up as per the previous step)
        const revenueEndpoint = `${BASE_URL}/user/totalrevenue`;
        const profitEndpoint = `${BASE_URL}/user/totalprofit`;

        // Run both API calls concurrently
        const [revenueResponse, profitResponse] = await Promise.all([
          axios.get(revenueEndpoint, { withCredentials: true }),
          axios.get(profitEndpoint, { withCredentials: true }),
        ]);

        setMetrics({
          totalRevenue: revenueResponse.data.totalRevenue,
          totalProfit: profitResponse.data.totalProfit,
        });

      } catch (err) {
        console.error("Failed to fetch dashboard metrics:", err);
        setError("Failed to load financial data.");
        setMetrics({ totalRevenue: 'N/A', totalProfit: 'N/A' }); // Set error state for display
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, [BASE_URL]);

  // The value provided to consuming components
  const contextValue = {
    metrics,
    isLoading,
    error,
    // You can add a function to refresh metrics here if needed
    // refreshMetrics: fetchMetrics 
  };

  return (
    <MetricsContext.Provider value={contextValue}>
      {children}
    </MetricsContext.Provider>
  );
};

export default MetricsProvider;