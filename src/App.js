import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Menu } from "./components/nav";
import { Home, Login, Register } from "./pages";
function App() {
  return (
    <BrowserRouter>
    {/* <Menu /> */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </BrowserRouter>
    // <div className="text-3xl font-bold underline">
    //   <h1>This is App Component</h1>
    // </div>
  );
}

export default App;
