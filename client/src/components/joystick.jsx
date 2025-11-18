import React from 'react'
import { Joystick } from 'react-joystick-component'
import baseImage from '../images/joystick.png'
import dotImage from '../images/glowyDot.png'

function JoystickControl() {
  const handleMove = (event) => {
    const { x, y } = event
    const linear_velocity = y*3.0
    const angular_velocity = (-x) *3.0
    fetch('http://localhost:3000/api/cmd_vel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ linear_velocity, angular_velocity }),
    })
  }

  const handleStop = () => {
    fetch('http://localhost:3000/api/cmd_vel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ linear_velocity: 0, angular_velocity: 0 }),
    })
  }

  return (<>
  <div className='absolute bottom-50 right-52'>
    <div className='flex items-center space-x-2 bottom-50 right-60'>
      <img src={dotImage} className='w-4 h-4]'></img>
      <h2 className='text-center text-xl font-[Roboto] glowBlue'>Control Panel</h2>
    </div>
  </div>
  <div className='fixed right-10 bottom-10 bg-panel w-80 h-40 pt-4 pl-2 rounded-2xl'>
      <Joystick
        size={130}
        stickSize={50}
        baseImage={baseImage}
        stickImage={baseImage}
        move={handleMove}
        stop={handleStop}
      />
    </div>
  </>
  )
}

export default JoystickControl
