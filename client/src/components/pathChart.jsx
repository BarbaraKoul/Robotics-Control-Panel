import { useRef, useEffect } from "react"
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
    const chartRef = useRef(null)

    const points = history.map((p) => ({ x: p.x, y: p.y }))
    const lastPoint = history.length > 0 ? history[history.length - 1] : null

    const pathChartData = {
        datasets: [
            {
                label: "Trajectory",
                data: points,
                showLine: true,
                borderColor: "blue",
                backgroundColor: "rgba(0, 123, 255, 0.4)",
                pointRadius: 2,
                fill: false,
            },
            {
                label: "Current Pose",
                data: lastPoint ? [{ x: lastPoint.x, y: lastPoint.y }] : [],
                pointRadius: 6,
                backgroundColor: "red",
                pointStyle: "circle",
                showLine: false
            },
        ].filter(Boolean)
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "bottom" },
        },
        scales: {
            x: { 
                type: "linear", 
                position: "bottom", 
                min: 0, 
                max: 11,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            },
            y: { 
                type: "linear",  
                min: 0, 
                max: 11,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            },
        },
        animation: {
            duration: 0
        },
        plugins: [{
            id: 'draw_arrow',
            afterDraw: (chart) => {
                if (!lastPoint) return
                
                const ctx = chart.ctx;
                const meta = chart.getDatasetMeta(1)
                if (meta.data.length === 0) return
                
                const point = meta.data[0]
                const x = point.x
                const y = point.y
                
                ctx.save()
                ctx.translate(x, y)
                ctx.rotate(lastPoint.theta)
                
                ctx.beginPath()
                ctx.moveTo(0, -12)
                ctx.lineTo(8, 10)
                ctx.lineTo(-8, 10)
                ctx.closePath()
                ctx.fillStyle = "red"
                ctx.fill()
                
                ctx.restore()
            }
        }]
    }

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.update()
        }
    }, [lastPoint])

    return(
        <div className="chart">
             <Scatter 
                 ref={chartRef}
                 data={pathChartData} 
                 options={options} 
             />
        </div>
    )
}

export default PathChart