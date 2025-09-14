import PosePanel from "./components/posePanel"
import VelocityChart from "./components/velocityChart"
import XYChart from "./components/xyChart"
import PathChart from "./components/pathChart"
import JoystickControl from "./components/joystick"
import "./graph.css"
import menu from "./images/menu.png"

const App = () => {
  return(
    <>
        <div className="menu">
          <img src={ menu }/>
        </div>
        <PosePanel/>
        <div className="dashboard">
          <VelocityChart/>
          <XYChart/>
          <PathChart/>
        </div>
        <JoystickControl/>
    </>
  )
}

export default App
