import React, { useEffect } from "react"
import { usePoseStore } from "../store/usePoseStore"

const PosePanel = () => {
  const { latestPose, history, connect } = usePoseStore()

  useEffect(() => {
    connect();
  }, [connect])

  return (
    <div>
      <h2 className="bg-black fixed top-11 right-2.5 w-[150px] h-[50px] p-[13px] text-center font-[Roboto] rounded-t-lg mb-0 shadow-lg text-2xl glowBlue">Data</h2>
      {latestPose ? (
        <div className="fixed right-[13px] top-[83px] bg-panel font-[Roboto] w-[150px] p-[13px] mt-0 shadow-lg glowBlue">
          <p>X: {latestPose.x.toFixed(2)}</p>
          <p>Y: {latestPose.y.toFixed(2)}</p>
          <p>Θ: {latestPose.theta.toFixed(2)}</p>
          <p>Linear vel: {latestPose.linear_velocity.toFixed(2)}</p>
          <p>Angular vel: {latestPose.angular_velocity.toFixed(2)}</p>
        </div>
      ) : (
        <p className="fixed right-2.5 top-[94px] font-[Roboto] text-sm bg-panel w-[150px] h-[50] p-[13px] pt-[22px] text-center shadow-lg glowBlue">Waiting for ROS data...</p>
      )}

      <h2 className="fixed left-[170px] top-11 w-[250px] h-[50px] font-[Roboto] bg-black text-2xl text-center p-[13px] rounded-t-lg shadow-lg glowBlue">History (last 30)</h2>
      <div>
        {latestPose ?(
      <ul className="fixed top-[84px] left-[123px] font-[Roboto] w-[276px] bg-base1 text-center m-0 list-none pb-[7px] pt-[7px] pr-[0.2px] pl-[0.2px] shadow-lg">
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
