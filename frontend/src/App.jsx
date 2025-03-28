import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
