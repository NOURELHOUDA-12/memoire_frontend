import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from './App'
import ReactDOM from "react-dom/client";
import Dashboard from './page/dashboard/Dashboard'
import Tiques from "./pages2/Tiques/Tiques";
import PieChart from "./page/pieChart/PieChart";
import BarChart from "./page/barChart/BarChart";
import Geography from "./page/geography/Geography";
import LineChart from "./page/lineChart/LineChart";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Dashboard />} />
      <Route path="Tiques" element={<Tiques />} />
      {/* <Route path="pie" element={<PieChart />} /> */}
      <Route path="bar" element={<BarChart />} />
      <Route path="line" element={<LineChart />} />
      {/* <Route path="geography" element={<Geography />} /> */}

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);