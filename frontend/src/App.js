import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Init from "./pages/init.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.js";
import Home from "./pages/home.js";
import Settings from "./pages/settings.js";
import Profile from "./pages/profile.js";
import Notifications from "./pages/notifications.js";
import Calender from "./pages/calender.js";
import Todolist from "./pages/todolist.js";
import Addevent from "./pages/Addevent.js";
import AddTask from "./pages/addTask.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element = {<Init />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addevent" element={<Addevent />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/calendar" element={<Calender />} />
          <Route path="/todolist" element={<Todolist />} />
          <Route path="/addTask" element={<AddTask />} />
        </Routes>
      </BrowserRouter>
      <Outlet />
    </div>
  )
}

export default App;
