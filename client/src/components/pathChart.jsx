import { useMemo } from "react"
import { Scatter } from "react-chartjs-2"
import { usePoseStore } from "../store/usePoseStore"
import "./diagrams.css"

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

const PathChart = () => {
    const history = usePoseStore((state) => state.history)

    const points = history.map((p) => ({ x: p.x, y: p.y }))

    const lastPoint = history.length > 0 ? [history[history.length - 1]] : []

    const arrowImg = useMemo(() => {
    if (!last) return null

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = 40
    canvas.height = 40

    ctx.translate(20, 20)
    ctx.rotate(last.theta)
    ctx.beginPath();
    ctx.moveTo(0, -12)
    ctx.lineTo(8, 10)
    ctx.lineTo(-8, 10)
    ctx.closePath()
    ctx.fillStyle = "red"
    ctx.fill()

    const img = new Image()
    img.src = canvas.toDataURL()
    return img
  }, [last?.theta])

    const pathChartData = {
        datasets: [
        {
            label: "Trajectory",
            data: points,
            showLine: true,
            borderColor: "blue",
            backgroundColor: "rgba(0, 123, 255, 0.4)"
        },
        {
            label: "Current Pose",
            data: lastPoint.map((p) => ({ x: p.x, y: p.y })),
            pointRadius: 6,
            pointStyle: arrowImg || "circle",
            backgroundColor: "red"
        },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend: { position: "bottom" },
    },
        scales: {
            x: { type: "linear", position: "bottom" },
            y: { type: "linear" },
        },
    }


    return(
        <div className="chart">
             <Scatter data={pathChartData} options={options} />
        </div>
    )
}

export default PathChart