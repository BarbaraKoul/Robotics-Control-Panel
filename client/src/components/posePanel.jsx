import React, { useEffect } from "react"
import { usePoseStore } from "../store/usePoseStore"

const PosePanel = () => {
  const { latestPose, history, connect } = usePoseStore()

  useEffect(() => {
    connect();
  }, [connect])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Latest Pose</h2>
      {latestPose ? (
        <div className="bg-gray-100 p-3 rounded-md">
          <p>X: {latestPose.x.toFixed(2)}</p>
          <p>Y: {latestPose.y.toFixed(2)}</p>
          <p>Θ: {latestPose.theta.toFixed(2)}</p>
          <p>Linear vel: {latestPose.linear_velocity.toFixed(2)}</p>
          <p>Angular vel: {latestPose.angular_velocity.toFixed(2)}</p>
        </div>
      ) : (
        <p>Waiting for ROS data...</p>
      )}

      <h2 className="text-xl font-bold mt-4 mb-2">History (last 50)</h2>
      <ul className="max-h-60 overflow-y-auto text-sm">
        {history.map((pose, i) => (
          <li key={i}>
            [{new Date(pose.timestamp).toLocaleTimeString()}] X:{pose.x.toFixed(2)} Y:{pose.y.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PosePanel
