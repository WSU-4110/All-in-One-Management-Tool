import { BrowserRouter, Routes, Route } from "react-router-dom";
import Init from "./pages/init";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Settings from "./pages/settings";
import Profile from "./pages/profile";
import Notifications from "./pages/notifications";
import Calender from "./pages/calender";
import Todolist from "./pages/todolist";

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
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/calendar" element={<Calender />} />
          <Route path="/todolist" element={<Todolist />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
