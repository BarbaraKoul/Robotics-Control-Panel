import React from "react"
import { Joystick } from "react-joystick-component"
import "./joystick.css"

function JoystickControl() {
  const handleMove = (event) => {
    const { x, y } = event
    const linear_velocity = y / 50
    const angular_velocity = -x / 50
    fetch("http://localhost:3000/api/cmd_vel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linear_velocity, angular_velocity }),
    })
  }

  const handleStop = () => {
    fetch("http://localhost:3000/api/cmd_vel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linear_velocity: 0, angular_velocity: 0 }),
    })
  }

  return (
    <div className="joystick">
      <h2 className="title">Joystick</h2>
      <Joystick
        size={150}
        baseColor="rgba(210, 206, 206, 1)"
        stickColor="rgb(175,228,227)"
        move={handleMove}
        stop={handleStop}
      />
    </div>
  )
}

export default JoystickControl
