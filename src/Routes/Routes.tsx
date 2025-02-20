import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import About from "../Pages/About";

export const router = createBrowserRouter ([
    {path:'/',
        element: <App />,
        children: [
            {path: '', element: <Home/>},
            {path: 'about', element: <About/>},
        ]
    }
])