import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Recolectaruser from "./components/Recolectaruser";
import Analizardataset from "./components/Analizardataset";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recolectaruser" element={<Recolectaruser />} />
        <Route path="/analizardataset" element={<Analizardataset />} />
      </Routes>
    </BrowserRouter>
  </div>
);