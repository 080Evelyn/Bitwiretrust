import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer";

import ScrollToTop from "./Components/ScrollToTop";

const App = () => {
  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />
      <div className="mt-24 md:mt-14">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default App;
