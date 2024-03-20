import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Init from "./pages/init";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Settings from "./pages/settings";
import Profile from "./pages/profile";
import Notifications from "./pages/notifications";
import Calender from "./pages/calender";
import Todolist from "./pages/todolist";
import Addevent from "./pages/Addevent";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Init />,
      },
    ],
  },
  {
    path: "/login",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/signup",
    element: <App />,
    children: [
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/home",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/addevent",
    element: <App />,
    children: [
      {
        path: "/addevent",
        element: <Addevent />,
      },
    ],
  },
  {
    path: "/settings",
    element: <App />,
    children: [
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/profile",
    element: <App />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/notifications",
    element: <App />,
    children: [
      {
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "/calendar",
    element: <App />,
    children: [
      {
        path: "/calendar",
        element: <Calender />,
      },
    ],
  },
  {
    path: "/todolist",
    element: <App />,
    children: [
      {
        path: "/todolist",
        element: <Todolist />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);