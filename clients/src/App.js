import "./App.css";
import AddUser from "./compoents/AddUser";
import Details from "./compoents/Details";
import EditUser from "./compoents/EditUser";
import Home from "./compoents/Home";
import Navbar from "./compoents/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/edituser/:id" element={<EditUser />} />
          <Route path="/detail/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
