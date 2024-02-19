import React from 'react';
import {Link} from 'react-router-dom'
import '../stylesheets/footerstyles.css'
import CalenderLogo from '../images/CalanderButtonLogo.png';
import HomeLogo from '../images/HomeLogo.png';
import SettingsLogo from '../images/SettingsLogo.png';
import ToDoListLogo from '../images/ToDoListLogo.png';

const Footer = () => {
    return (
        <footer>
            <div className="footer-section">
                <div className="First-Section">
                    <Link to ="/home" className="footer-link">
                        <img className ="Home-Image" src={HomeLogo} alt="Home-Logo"/>
                        <p className="Footer-Text">HOME</p>
                    </Link>
                </div>
                <div className="Second-Section">
                    <Link to ="/calendar" className="footer-link">
                        <img className ="Calander-Image" src={CalenderLogo} alt="Calender-Logo"/>
                        <p className="Footer-Text">CALENDER</p>
                    </Link>
                </div>
                    
                <div className="Third-Section">
                    <Link to="/todolist" className="footer-link">
                        <img className ="ToDoList-Image" src={ToDoListLogo} alt="To-Do-List-Logo"/>
                        <p className="Footer-Text">TO-DO-LIST</p>
                    </Link>
                </div>
                
                <div className="Fourth-Section">
                    <Link to="/settings" className="footer-link">
                        <img className ="Settings-Image" src={SettingsLogo} alt="Home-Logo"/>
                        <p className="Footer-Text">SETTINGS</p>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;