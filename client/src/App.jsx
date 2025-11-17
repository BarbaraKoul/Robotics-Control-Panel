import PosePanel from "./components/posePanel"
import VelocityChart from "./components/velocityChart"
import XYChart from "./components/xyChart"
import PathChart from "./components/pathChart"
import AlertBanner from "./components/AlertBanner"
import JoystickControl from "./components/joystick"
import menu from "./images/menu.png"

const App = () => {
  return(
    <>
        <div className="bg-panel w-40 h-screen fixed">
          <img className="size-6 shadow-xs mb-5 ml-1 mr-1 transition duration-300 hover:scale-[1.2]" src={ menu }/>
        </div>
        <PosePanel/>
        <AlertBanner/>
        <div className="grid grid-cols-[600px] grid-rows-[350px_350px_350px] gap-5 p-2.5 justify-center ml-[200px]">
          <VelocityChart/>
          <XYChart/>
          <PathChart/>
        </div>
        <JoystickControl/>
    </>
  )
}

export default App
