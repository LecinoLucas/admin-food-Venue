import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import CustomRoutes from "./components/CustoumRoutes";
import { LoadingProvider } from "./context/LoadingContexts";

function App() {
  return (
    <LoadingProvider>
      <Router>
        <div className="App">
          <CustomRoutes />
        </div>
      </Router>
    </LoadingProvider>
  );
}

export default App;
