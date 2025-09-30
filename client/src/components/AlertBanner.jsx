import React from 'react'
import {usePoseStore} from '../store/usePoseStore'
import './alert.css'

const AlertBanner = () => {
  const alerts = usePoseStore((state) => state.alerts)

  if (alerts.length === 0) return null;

  return (
    <div className="alert">
        <div className="emoji">&#9888;&#65039;</div>
      {alerts.map((alert, idx) => (
        <p key={idx}>{alert}</p>
      ))}
    </div>
  )
}

export default AlertBanner
