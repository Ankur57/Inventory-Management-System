import ReactECharts from "echarts-for-react";
import { useContext } from "react";
// ❌ REMOVE: import { InventoryContext } from "../Context/InventoryContext";
// ✅ IMPORT: Use the correct CategoryContext
import { CategoryContext } from "../Context/CategoryContext";

// Helper function to transform the data
const transformDataForChart = (dataArray) => {
  
  if (!Array.isArray(dataArray)) {
    console.error("Chart data is not an array:", dataArray);
    return []; 
  }
  
  // Use 'item' for clarity inside the map callback
  return dataArray.map((item) => ({
    // Ensure property names (quantity, name) match your API response
    value: item?.quantity || 0,
    name: item?.name || 'No category'
  }));
};

const CategoryChart = () => {
  
  // ✅ 1. Use the CategoryContext and destructure the CategoryList
  const { CategoryList} = useContext(CategoryContext);
  
  // 🛑 REMOVED: fetchedData function and useEffect hook. 
  // The data is now fetched once in CategoryContext.jsx

  // 2. Transform the fetched data (which comes directly from the context)
  const chartData = transformDataForChart(CategoryList);
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
        name: "Category Inventory Quantity",
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
        // Use the safe data array
        data: safeChartData.length > 0 ? safeChartData : [{ value: 0, name: "No category" }], 
      },
    ],
  };
  
  return (
    <div className="chart-container">
      {
        // ✅ Check CategoryList length for conditional rendering
        CategoryList.length > 0 ? (
          <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
        ) : (
          <p>Loading chart data or no categories found...</p> // Updated message
        )
      }
    </div>
  );
};

export default CategoryChart;