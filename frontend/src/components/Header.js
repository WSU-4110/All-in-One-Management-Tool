import React from "react";
import '../stylesheets/headerstyles.css'
import NoficicationIcon from '../images/NotificationIcon.png';
import ProfilePicture from '../images/ProfilePicture.png';
import SideBar from '../images/SideBar.png';
import {Link} from 'react-router-dom'


const Header = () => {
    let notisCount;
    let notiPref = sessionStorage.getItem('Notifications');
    
    try {
        notisCount = JSON.parse(sessionStorage.getItem('Tasks')).length;
    } catch {
        notisCount = 0;
    }

    return (
        <header>
            <div className="flexbox-header">
                <div className="left-side">
                    <p className="Header-Text">Student Planner</p>
                </div>
                        
                <div className="right-side">
                <Link to ="/notifications" className="header-link">
                    <img className ="notification-icon" src={NoficicationIcon} alt="Notification-Icon" />
                    <p className="icon-label">NOTIFICATION</p> {/* Label for Notification */}
                    {notisCount != 0 && <div className='stupid-red-dot'>{notisCount}</div>}

                </Link>
                <Link to ="/profile" className="header-link">
                    <img className = "profile-picture" src={ProfilePicture} alt="Profile-Picture" />
                    <p className="icon-label">PROFILE</p> {/* Label for Profile */}
                </Link>
                </div>  
            </div>
        </header>
    )
}

export default Header;
