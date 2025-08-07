import React from "react";
import ReactApexChart from "react-apexcharts";

interface Props {
  data: number[];
  categories: string[];
}

const RightCard: React.FC<Props> = ({ data, categories }) => {
  const chartData = {
    series: [
      {
        name: "Username Length",
        data,
      },
    ],
    options: {
      chart: {
        type: "line" as const,
      },
      xaxis: {
        categories,
      },
      title: {
        text: "Username Length - Line Chart",
      },
    },
  };

  return (
    <div className="h-100">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={300}
      />
    </div>
  );
};

export default RightCard;
