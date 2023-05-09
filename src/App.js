import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import CustomRoutes from "./components/CustoumRoutes";

function App() {
  return (
    <Router>
      <div className="App">
        <CustomRoutes />
      </div>
    </Router>
  );
}

export default App;
