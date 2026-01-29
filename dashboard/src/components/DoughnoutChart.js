import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data }) => {
  const defaultData = {
    labels: [
      "INFY",
      "ONGC",
      "TCS",
      "KPITTECH",
      "QUICKHEAL",
      "WIPRO",
      "M&M",
      "RELIANCE",
      "HUL",
    ],
    datasets: [
      {
        label: "Holdings",
        data: [
          1555.45, 116.8, 3194.8, 1332.25, 308.55, 2311.0, 1559.6, 2112.4,
          512.4,
        ],
        backgroundColor: [
          "#FF6B6B",
          "#4ECDC4",
          "#FFE66D",
          "#95E1D3",
          "#C7CEEA",
          "#FFB7B2",
          "#FF9999",
          "#66D9EF",
          "#A8E6CF",
        ],
        borderColor: [
          "#FF5252",
          "#2CBFAD",
          "#FFC929",
          "#78CCC8",
          "#B8B8F0",
          "#FF8A80",
          "#FF6666",
          "#4AB8E6",
          "#5DD9C1",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <Doughnut
      data={data || defaultData}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 15,
              font: {
                size: 11,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.label + ": ₹" + context.parsed;
              },
            },
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
