import '../stylesheets/homepagestyles.css';
import CreateEventLogo from '../images/CreateEventLogo.png';
import CalenderButtonLogo from '../images/CalanderButtonLogo.png';
import SettingsButtonLogo from '../images/SettingsButtonLogo.png';
import ToDoListButtonLogo from '../images/ToDoListButtonLogo.png';

import {Link} from 'react-router-dom'

export default function Home() {
    return (
        <div className=''>
            <main>
                <div className="main-body-grid">
                    <div className="Home-div">
                        <p className="Home-divtext">HOME</p>
                    </div>

                    <div className="nav-buttons">
                     <div className="Button-4Attributes">
                            <Link to="/addevent" className="Createevent-Integration">
                               <span className="CreateEvent-ButtonImage">
                                    <img className ="CreateEvent-ButtonImageActual"
                                    src={CreateEventLogo} alt="Logo"/>
                                </span> 
                                    ADD EVENT
                                    
                            </Link>
                        </div>

                        <div className="Button-1Attributes">
                            <Link to="/calendar" className="Calendar-Integration">
                                <span className="Calendar-ButtonImage">
                                    <img className ="Calendar-ButtonImageActual"
                                    src={CalenderButtonLogo} alt="CalendarButtonLogo"/>
                                </span> 
                                    CALENDAR
                            </Link>
                        </div>

                        <div className="Button-2Attributes">
                            <Link to = "/todolist" className="ToDoList-Integration">
                                <span className="ToDoList-ButtonImage">
                                    <img className ="ToDoList-ButtonImageActual"
                                    src={ToDoListButtonLogo} alt="ToDoListLogo"/>
                                </span> 
                                TO DO LIST
                            </Link>
                        </div>


                        <div className="Button-3Attributes">
                            <Link to ="/settings" className="Settings-Integration">
                                <span className="Settings-ButtonImage">
                                    <img className ="Settings-ButtonImageActual"
                                    src={SettingsButtonLogo} alt="ToDoListLogo"/>
                                </span> 
                                SETTINGS
                            </Link>
                        </div>

                    </div>
                </div>


            </main>
    </div>
    )
}