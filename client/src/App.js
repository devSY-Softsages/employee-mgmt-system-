import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/home";
import Jsonisawesome from "./components/json";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/json" element={<Jsonisawesome />} />
      </Routes>
    </Router>
  );
}

export default App;
