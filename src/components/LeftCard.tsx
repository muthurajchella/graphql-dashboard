import React from "react";
import ReactApexChart from "react-apexcharts";

interface Props {
  data: number[];
  categories: string[];
}

const LeftCard: React.FC<Props> = ({ data, categories }) => {
  const chartData = {
    series: [
      {
        name: "User ID",
        data,
      },
    ],
    options: {
      chart: {
        type: "bar" as const,
      },
      xaxis: {
        categories,
      },
      title: {
        text: "User IDs - Bar Chart",
      },
    },
  };

  return (
    <div className="h-100">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default LeftCard;
