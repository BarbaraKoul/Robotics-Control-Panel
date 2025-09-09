import { create } from "zustand"
import { io } from "socket.io-client"

const socket = io("http://localhost:5000")

export const usePoseStore = create((set) => ({
  latestPose: null,
  history: [],
  connect: () => {
    socket.on("pose_update", (data) => {
      set((state) => ({
        latestPose: data,
        history: [data, ...state.history].slice(0,30),
      }))
    })
  },
}))
