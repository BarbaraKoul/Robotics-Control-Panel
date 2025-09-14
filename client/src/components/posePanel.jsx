import React, { useEffect } from "react"
import { usePoseStore } from "../store/usePoseStore"
import "./panel.css"

const PosePanel = () => {
  const { latestPose, history, connect } = usePoseStore()

  useEffect(() => {
    connect();
  }, [connect])

  return (
    <div>
      <h2 className="latestTitle">Data</h2>
      {latestPose ? (
        <div className="data">
          <p>X: {latestPose.x.toFixed(2)}</p>
          <p>Y: {latestPose.y.toFixed(2)}</p>
          <p>Θ: {latestPose.theta.toFixed(2)}</p>
          <p>Linear vel: {latestPose.linear_velocity.toFixed(2)}</p>
          <p>Angular vel: {latestPose.angular_velocity.toFixed(2)}</p>
        </div>
      ) : (
        <p className="waiting">Waiting for ROS data...</p>
      )}

      <h2 className="titleHistory">History (last 30)</h2>
      <div>
        {latestPose ?(
      <ul>
        {history.map((pose, i) => (
          <li key={i}>
            [{new Date(pose.timestamp).toLocaleTimeString()}] X:{pose.x.toFixed(2)} Y:{pose.y.toFixed(2)}
          </li>
        ))}
      </ul>) : (
        <div></div>
      )}
      </div>
    </div>
  )
}

export default PosePanel
