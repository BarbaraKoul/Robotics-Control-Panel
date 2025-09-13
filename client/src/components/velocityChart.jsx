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


const VelocityChart = () =>{
    const history = usePoseStore((state) => state.history)

    const lineChartData={
        labels: history.map((p) => new Date(p.timestamp).toLocaleTimeString()),
        datasets: [
      {
        label: "Linear Velocity",
        data: history.map((p) => p.linear_velocity),
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Angular Velocity",
        data: history.map((p) => p.angular_velocity),
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

export default VelocityChart