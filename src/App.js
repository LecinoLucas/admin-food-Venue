import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import CustomRoutes from "./components/CustoumRoutes";
import { LoadingProvider } from "./context/LoadingContexts";
import { RestaurantProvider } from "./context/RestauranteContext";

function App() {
  return (
    <LoadingProvider>
      <RestaurantProvider>
        <Router>
          <div className="App">
            <CustomRoutes />
          </div>
        </Router>
      </RestaurantProvider>
    </LoadingProvider>
  );
}

export default App;
