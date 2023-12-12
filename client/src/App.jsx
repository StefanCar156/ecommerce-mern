import "./styles/App.css"
import RoutesComponent from "./router/routes"
import Sidebar from "./components/Sidebar/Sidebar"
import Navbar from "./components/Navbar/Navbar"

function App() {
  return (
    <div id="app">
      <RoutesComponent />
    </div>
  )
}

export default App
