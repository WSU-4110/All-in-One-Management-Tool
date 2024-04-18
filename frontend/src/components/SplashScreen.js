import React from "react";
import '../stylesheets/splashscreen.css'
import splashImage from '../images/splash.png'

const SplashScreen = () => {
    return (
      <div className="splash-screen">
            <h1 style={{ color: 'black', fontSize: '3rem' }}>Welcome!</h1>
            <img src={splashImage} alt="Splash" />
            <h2 style={{ color: 'black', fontSize: '3rem' }}>All in One Management Tool</h2>
            <h3>Designed by Andrew Lambert, Carter Rock, Faiza Lasker, Istiaque Hossain, Omar Almasri, Uvejs Gerguri</h3>
        </div>
    );
  };

  export default SplashScreen;