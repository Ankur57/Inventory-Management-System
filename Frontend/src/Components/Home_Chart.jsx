import ReactECharts from "echarts-for-react";
import { useContext, useEffect } from "react";
import { InventoryContext } from "../Context/InventoryContext";
import axios from "axios";

// Helper function to transform the data
const transformDataForChart = (products) => {
  // We add a check here to ensure 'products' is actually an array before mapping
  if (!Array.isArray(products)) {
    console.error("Chart data is not an array:", products);
    return []; 
  }
  
  return products.map((product) => ({
    // Use product?.quantity to prevent error if an item in the array is null/undefined
    value: product?.quantity || 0,
    name: product?.name || 'No Product'
  }));
};

const Home_Chart = () => {
  const { inventoryList, setInventoryList } = useContext(InventoryContext);

  // 1. Fetch data and update the context
  const fetchedData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/product`,
        {
          withCredentials: true, // ✅ send JWT cookie
        }
      );
      
      
      // ----------------------------------------------------
      // 🔥 CRITICAL FIX: Access the array of products from the response object.
      // ----------------------------------------------------
      if (res.data) {
          // Assuming your response is { success: true, products: [...] }
          setInventoryList(res.data);
      } else if (Array.isArray(res.data)) {
          // Fallback if the API returns a raw array, though less common
          setInventoryList(res.data);
      } else {
          console.warn("API response structure is unexpected:", res.data);
          setInventoryList([]);
      }

    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchedData();
  }, []);

  // 2. Transform the fetched data
  // The 'name is not defined' error was likely coming from here when inventoryList 
  // was an object and not an array.
  const chartData = transformDataForChart(inventoryList);
  const safeChartData = Array.isArray(chartData) ? chartData : [];

  // 3. Define the ECharts option, using the transformed data
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
      data: safeChartData.map(item => item.name),
    },
    series: [
      {
        name: "Product Inventory Quantity",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
            formatter: '{b}: {c}',
          },
        },
        labelLine: {
          show: false,
        },
        data: safeChartData.length > 0 ? safeChartData : [{ value: 0, name: "No Product" }], 
      },
    ],
  };

  return (
    <div className="chart-container">
      {inventoryList.length > 0 ? (
        <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
      ) : (
        <p>Loading chart data or no products found...</p>
      )}
    </div>
  );
};

export default Home_Chart;