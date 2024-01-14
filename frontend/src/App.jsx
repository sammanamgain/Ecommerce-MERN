import Footer from "./Components/layout/Footer/Footer";
import Header from "./Components/layout/Header/Header";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Components/Home/Home";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
