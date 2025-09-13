import PosePanel from "./components/posePanel"
import VelocityChart from "./components/velocityChart"
import XYChart from "./components/xyChart"
import "./graph.css"

const App = () => {
  return(
    <>
        <PosePanel/>
        <div className="dashboard">
          <VelocityChart/>
          <XYChart/>
        </div>
    </>
  )
}

export default App
