import ReactECharts from "echarts-for-react";
import axios from "axios";
import { useState, useEffect } from "react";


const Chart1 = () => {
    const [chartData, setChartData] = useState({ months: [], sales: [] });
    const [isLoading, setIsLoading] = useState(true);

    // Define the canonical list of all 12 months
    const ALL_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/sales-per-month`, {
                    withCredentials: true, // ✅ send JWT cookie
                });

                const salesData = response.data; // The array from the backend

                // 1. Create a map for quick lookup: { 'Jan': 3000, 'Feb': 1110, ... }
                const salesMap = salesData.reduce((acc, item) => {
                    acc[item.month] = item.totalSales;
                    return acc;
                }, {});

                // 2. Pad the data: Iterate over ALL_MONTHS and populate the sales array
                const finalMonths = ALL_MONTHS;
                const finalSales = ALL_MONTHS.map(month => {
                    // Check if the month exists in the fetched data (salesMap)
                    // If it exists, use the totalSales value; otherwise, use 0.
                    return salesMap[month] || 0;
                });

                // 3. Update the state with the complete 12-month data
                setChartData({ months: finalMonths, sales: finalSales });
                setIsLoading(false);

            } catch (error) {
                console.error("Error fetching sales data:", error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const option = {
        title: {
          text: 'Total Sales Per Month'
        },
        tooltip: {
            trigger: 'axis',
            formatter: (params) => {
                const item = params[0];
                return `${item.name}<br/>Sales: ${item.value.toLocaleString()}`;
            }
        },
        xAxis: {
            type: 'category',
            // Use the complete 12-month array
            data: chartData.months
        },
        yAxis: {
            type: 'value',
            name: 'Total Sales',
            axisLabel: {
                formatter: (value) => `${value.toLocaleString()}`
            }
        },
        series: [
            {
                name: 'Total Sales',
                // Use the padded sales data (with 0 for missing months)
                data: chartData.sales,
                type: 'line',
                smooth: true,
                areaStyle: {}
            }
        ]
    };

    if (isLoading) {
        return <div style={{ height: "400px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading sales data...</div>;
    }

    return (
        <div className="chart-container">
            <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
        </div>
    )
}

export default Chart1;