import ReactECharts from "echarts-for-react";
import { useContext } from "react";
import { SourceContext } from "../Context/SourceContext"; // Adjust path if needed

const SalesSourceChart = () => {
  const { SourceList } = useContext(SourceContext);

  const validSources = SourceList.filter(source => source !== undefined);
  const sourceNames = validSources.map((source) => source.name);
  const salesData = validSources.map((source) => {
    // Assuming 'sales' is the correct property for sales data
    return source.sales || 0;
  });

  // Calculate a dynamic width for the chart to ensure bars don't get too cramped.
  // Use a minimum width (e.g., 80px) per bar.
  const MIN_BAR_WIDTH = 80;
  const MIN_CHART_WIDTH = 600; // Minimum scrollable width on small screens
  const calculatedWidth = sourceNames.length * MIN_BAR_WIDTH;
  
  // Set the chart width to the max of the calculated width and the minimum scrollable width, 
  // or simply '100%' if it's less than the minimum needed for scrolling.
  const chartWidth = calculatedWidth > MIN_CHART_WIDTH 
      ? `${calculatedWidth}px` 
      : '100%';


  const option = {
    title: {
      text: 'Sales by Source',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: sourceNames,
      axisLabel: {
         // Rotate labels if there are more than 5 sources for better readability
         rotate: sourceNames.length > 5 ? 45 : 0, 
         interval: 0, // Show all labels
      },
      name: 'Source Name'
    },
    yAxis: {
      type: 'value',
      name: 'Sales'
    },
    series: [
      {
        name: 'Sales',
        data: salesData,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ],
    grid: {
        containLabel: true // Important for ensuring labels aren't cut off
    }
  };

  return (
    <div className="chart-container">
      {SourceList.length > 0 ? (
          <ReactECharts 
              option={option} 
              // Set the ECharts style width to the calculated dynamic width
              style={{ height: "400px", width: chartWidth }} 
          />
      ) : (
          <p>Loading sales data or no data available...</p>
      )}
    </div>
  );
};

export default SalesSourceChart;