import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthProvider from "./providers/AuthProvider";
import MyAddedVisa from "./components/private/MyAddedVisa";
import PrivateRoute from "./routes/PrivateRoute";
import AddVisa from "./components/private/AddVisa";
import Footer from "./components/Footer";
import Visas from "./components/Visas";
import { Toaster } from "react-hot-toast";
import NotFound from "./components/NotFound";
import MyVisaApplication from "./components/private/MyVisaApplication";
import VisaDetails from "./components/private/VisaDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "visas",
        element: <Visas />,
      },
      {
        path: "my-added-visas",
        element: (
          <PrivateRoute>
            <MyAddedVisa />
          </PrivateRoute>
        ),
      },
      {
        path: "add-visa",
        element: (
          <PrivateRoute>
            <AddVisa />
          </PrivateRoute>
        ),
      },
      
      {
        path: "visa-details",
        element: (
          <PrivateRoute>
            <VisaDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "footer",
        element: <Footer />,
      },
      {
        path: "*",
        element: <NotFound></NotFound>, 
      },
      {
        path: "my-visa-applications",
        element: (
          <PrivateRoute>
            <MyVisaApplication></MyVisaApplication>
          </PrivateRoute>
        ),
      },
     
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
