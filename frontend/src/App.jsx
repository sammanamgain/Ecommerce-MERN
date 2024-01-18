import Footer from "./Components/layout/Footer/Footer";
import Header from "./Components/layout/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Productdetails from "./Components/Product/Productdetails"; 4
import './App.css'
function App() {
  return (
    <BrowserRouter className="Browserouter">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Product/:id' element={<Productdetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
