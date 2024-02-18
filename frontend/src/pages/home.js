import '../stylesheets/homepagestyles.css';
import CalenderButtonLogo from '../images/CalanderButtonLogo.png';
import CalenderLogo from '../images/CalanderButtonLogo.png';
import HomeLogo from '../images/HomeLogo.png';
import NoficicationIcon from '../images/NotificationIcon.png';
import ProfilePicture from '../images/ProfilePicture.png';
import SettingsButtonLogo from '../images/SettingsButtonLogo.png';
import SettingsLogo from '../images/SettingsLogo.png';
import SideBar from '../images/SideBar.png';
import ToDoListButtonLogo from '../images/ToDoListButtonLogo.png';
import ToDoListLogo from '../images/ToDoListLogo.png';

export default function Home() {
    return (
        <div className='home-background'>
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

            <main>
                <div className="main-body-grid">
                    <div className="Home-div">
                        <p className="Home-divtext">HOME</p>
                    </div>
                    <div className="nav-buttons">
                        <div className="Button-1Attributes">
                            <button className="Calander-Integration">
                                <span className="Calander-ButtonImage">
                                    <img className ="Calander-ButtonImageActual"
                                    src={CalenderButtonLogo} alt="CalanderButtonLogo"/>
                                </span> 
                                    CALANDER
                            </button>
                        </div>

                        <div className="Button-2Attributes">
                            <button className="ToDoList-Integration">
                                <span className="ToDoList-ButtonImage">
                                    <img className ="ToDoList-ButtonImageActual"
                                    src={ToDoListButtonLogo} alt="ToDoListLogo"/>
                                </span> 
                                TO DO LIST
                            </button>
                        </div>


                        <div className="Button-3Attributes">
                            <button className="Settings-Integration">
                                <span className="Settings-ButtonImage">
                                    <img className ="Settings-ButtonImageActual"
                                    src={SettingsButtonLogo} alt="ToDoListLogo"/>
                                </span> 
                                SETTINGS
                            </button>
                        </div>

                    </div>
                </div>


            </main>

            <footer>
                <div className="footer-section">
                    <div className="First-Section">
                        <img className ="Home-Image" src={HomeLogo} alt="Home-Logo"/>
                        <p className="Footer-Text">HOME</p>
                    </div>
                    <div className="Second-Section">
                        <img className ="Calander-Image" src={CalenderLogo} alt="Calender-Logo"/>
                        <p className="Footer-Text">CALENDER</p>
                    </div>
                        
                    <div className="Third-Section">
                        <img className ="ToDoList-Image" src={ToDoListLogo} alt="To-Do-List-Logo"/>
                        <p className="Footer-Text">TO-DO-LIST</p>
                    </div>
                    
                    <div className="Fourth-Section">
                        <img className ="Settings-Image" src={SettingsLogo} alt="Home-Logo"/>
                        <p className="Footer-Text">SETTINGS</p>
                    </div>
                </div>
            </footer>
    </div>
    )
}