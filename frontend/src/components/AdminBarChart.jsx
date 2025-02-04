import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ barData }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full overflow-auto">
      <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
        User Statistics Overview
      </h3>
      <div className="w-full h-64 md:h-96">
        <Bar
          data={barData}
          options={{ maintainAspectRatio: false, responsive: true }}
        />
      </div>
    </div>
  );
};

export default BarChart;
