import { create } from 'zustand'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

export const usePoseStore = create((set) => ({
  latestPose: null,
  history: [],
  alerts: [],

  connect: () => {
    socket.on('pose_update', (data) => {
      set((state) => {
        const newHistory = [data, ...state.history].slice(0, 30)

        const newAlerts = []
        if (data.linear_velocity > 2.0) {
          newAlerts.push('Too fast!')
        }
        if (data.angular_velocity > 1.0) {
          newAlerts.push('Turning too sharp!')
        }
        if (data.x < 1.5 || data.x > 10.5 || data.y < 1.5 || data.y > 10.5) {
          newAlerts.push('Approaching wall boundary!')
        }

        return {
          latestPose: data,
          history: newHistory,
          alerts: newAlerts,
        }
      })
    })
  },
}))
