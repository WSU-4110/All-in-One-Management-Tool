import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Settings from "./pages/settings";
import Profile from "./pages/profile";
import Notifications from "./pages/notifications";
import Calender from "./pages/calender";
import Todolist from "./pages/todolist";
import Header from './components/header';
import Footer from './components/Footer';
import './stylesheets/backgroundstyles.css'

function App() {
  return (
    <div class ="home-background">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element = {<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/calendar" element={<Calender />} />
          <Route path="/todolist" element={<Todolist />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  )
}

export default App;
