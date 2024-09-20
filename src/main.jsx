import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from './App'
import ReactDOM from "react-dom/client";
import Dashboard from './page/Dashbord/Dashboard'
import Tiques from "./page/Tiques/Tiques";
import PieChart  from "./page/PieChart/PieChart";
import BarChart from "./page/BarChart/BarChart";
import Geography from "./page/Geography/Geography";
import LineChart from "./page/LineChart/LineChart";
import MachineLearning from './page/MachineLearning/MachineLearning'
import Tick_detection from './page/Tick_classification/detection'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Dashboard />} />
      <Route path="Tiques" element={<Tiques />} />
      <Route path="pie" element={<PieChart />} />
      <Route path="bar" element={<BarChart />} />
      <Route path="line" element={<LineChart />} />
      <Route path="geography" element={<Geography />} />
      <Route path="MachineLearning" element={<MachineLearning />} />
       <Route path="Tick_detection" element={<Tick_detection />} /> 

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);