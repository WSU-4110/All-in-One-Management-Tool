import React from "react";
import '../stylesheets/headerstyles.css'
import NotificationIcon from '../images/NotificationIcon.png';
import ProfilePicture from '../images/ProfilePicture.png';
import SideBar from '../images/SideBar.png';
import {Link} from 'react-router-dom'

const Header = () => {
    const notisCount = JSON.parse(sessionStorage.getItem('Tasks')).length;

    return (
        <header>
            <div className="flexbox-header">
                <div className="left-side">
                    <img className="Sidebar-Image" src={SideBar} alt="Sidebar navigation"/>
                    <p className="Header-Text">Student Planner</p>
                </div>
                        
                <div className="right-side">
                    <Link to="/notifications" className="header-link">
                        <img className="notification-icon" src={NotificationIcon} alt="Notifications"/>
                        <p className="icon-label">NOTIFICATION</p> {/* Label for Notification */}
                        <div className='stupid-red-dot'>{notisCount}</div>
                    </Link>
                    <Link to="/profile" className="header-link">
                        <img className="profile-picture" src={ProfilePicture} alt="User profile"/>
                        <p className="icon-label">PROFILE</p> {/* Label for Profile */}
                    </Link>
                </div>  
            </div>
        </header>
    )
}

export default Header;
