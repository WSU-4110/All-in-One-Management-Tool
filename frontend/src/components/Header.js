import React from "react";
import '../stylesheets/headerstyles.css'
import NoficicationIcon from '../images/NotificationIcon.png';
import ProfilePicture from '../images/ProfilePicture.png';
import SideBar from '../images/SideBar.png';
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <div className="flexbox-header">
                <div className="left-side">
                    <img className = "Sidebar-Image" src={SideBar} alt="sidebar"/>
                    <p className="Header-Text">Student Planner</p>
                </div>
                        
                <div className="right-side">
                <Link to ="/notifications" className="header-link">
                    <img className ="notification-icon" src={NoficicationIcon} alt="Notification-Icon" />
                </Link>
                <Link to ="/profile" className="header-link">
                    <img className = "profile-picture" src={ProfilePicture} alt="Profile-Picture" />
                </Link>
                </div>  
            </div>
        </header>
    )
}

export default Header;
