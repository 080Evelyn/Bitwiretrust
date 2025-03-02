import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import About from "../Pages/About";
import Register from "../Pages/Register";
import Authlayout from "../Authlayout";
import { Step } from "../types";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
    ],
  },

  {
    element: <Authlayout />,
    children: [
        { path: "register", element: <Register /> },
        { path: "get-started", element: <Register initialStep={Step.GET_STARTED} /> },
        
    ],
  },
]);
