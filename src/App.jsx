import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Pastes from "./components/Pastes";
import { RouterProvider } from "react-router";
import "./App.css";
import { Toaster } from "react-hot-toast";
import ViewPaste from "./components/ViewPaste";

const route = createBrowserRouter([
    {
        path: "/",
        element: 
            <div>
                <Navbar />
                <Home />
            </div>
    },

    {
        path: "/pastes",
        element: 
            <div>
                <Navbar />
                <Pastes />
            </div>
    },

    {
        path: "/pastes/:id",
        element: 
            <div>
                <Navbar />
                <ViewPaste />
            </div>
    }
]);

function App() {
    return (
        <div className="h-[100vh]" >
            <RouterProvider router={route} />
            <Toaster />
        </div>
    )
}

export default App