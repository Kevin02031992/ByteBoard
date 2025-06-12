import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Home  from "./pages/Home";
import  UserPage from "./pages/User";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
