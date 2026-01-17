import Home from "./pages/home/Home"
import { Route, Routes} from "react-router-dom"
import Layout from "./Layout"
import Sobre from "./pages/sobre/Sobre"


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="sobre" element={<Sobre/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
