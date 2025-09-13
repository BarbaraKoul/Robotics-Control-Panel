import { Line } from "react-chartjs-2"
import { usePoseStore } from "../store/usePoseStore"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


const XYChart = () =>{
    const history = usePoseStore((state) => state.history)

    const lineChartData={
        labels: history.map((p) => new Date(p.timestamp).toLocaleTimeString()),
        datasets: [
      {
        label: "X Position",
        data: history.map((p) => p.x),
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Y Position",
        data: history.map((p) => p.y),
        borderColor: "red",
        fill: false,
      }
    ]
  }

   const lineChartOptions = {
    responsive: true,
    animation: false,
    scales: {
      y: { beginAtZero: true },
    }
  }

    return(
        <div>
            <Line options={lineChartOptions} data={lineChartData}/>
        </div>
    )
}

export default XYChart