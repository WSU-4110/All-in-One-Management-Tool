import React from "react";
import '../stylesheets/headerstyles.css'
import NoficicationIcon from '../images/NotificationIcon.png';
import ProfilePicture from '../images/ProfilePicture.png';
import SideBar from '../images/SideBar.png';
// links will be added soon

const Header = () => {
    return (
        <header>
            <div className="flexbox-header">
                <div className="left-side">
                    <img className = "Sidebar-Image" src={SideBar} alt="sidebar"/>
                    <p className="Header-Text">Student Planner</p>
                </div>
                        
                <div className="right-side">
                    <img className ="notification-icon" src={NoficicationIcon} alt="Notification-Icon" />
                    <img className = "profile-picture" src={ProfilePicture} alt="Profile-Picture" />
                </div>  
            </div>
        </header>
    )
}

export default Header;