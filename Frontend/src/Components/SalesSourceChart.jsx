import ReactECharts from "echarts-for-react";

const SalesSourceChart = () => {
    const option = {
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
};
   return (
      <div className="chart-container">
        <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
      </div>
    );
}

export default SalesSourceChart
