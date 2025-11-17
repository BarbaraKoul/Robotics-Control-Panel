import React from 'react'
import {usePoseStore} from '../store/usePoseStore'

const AlertBanner = () => {
  const alerts = usePoseStore((state) => state.alerts)

  if (alerts.length === 0) return null;

  return (
    <div className="bg-alert sticky w-[400px] top-2.5 p-1.5 mb-5 left-[43%] z-2 shadow-lg text-center font-[Roboto] text-black font-bold text-2xl rounded-lg border-2 border-red ">
        <div className="scale-1.5 animate-warningAnimation">&#9888;&#65039;</div>
      {alerts.map((alert, idx) => (
        <p key={idx}>{alert}</p>
      ))}
    </div>
  )
}

export default AlertBanner
