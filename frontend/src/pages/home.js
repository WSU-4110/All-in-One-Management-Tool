import React, { useState} from 'react';
import '../stylesheets/homepagestyles.css';
import CreateEventLogo from '../images/CreateEventLogo.png';
import '../stylesheets/backgroundstyles.css';
import CalenderButtonLogo from '../images/CalanderButtonLogo.png';
import SettingsButtonLogo from '../images/SettingsButtonLogo.png';
import ToDoListButtonLogo from '../images/ToDoListButtonLogo.png';
import contactUsLogo from '../images/ContactUsLogo.png';
import Header from '../components/Header';
import Footer from '../components/Footer';


import {Link} from 'react-router-dom'
import ContactForm from './contactForm';

export default function Home() {
    const [showContactForm, setShowContactForm] = useState(false);
    const handleContactButtonClick = () => {
        setShowContactForm(!showContactForm);
    };

    return (
        <div className='home-outer'>
            <div className='home-background'/>
            <div className='home-inner'>
            <Header />
            <main>
                    <div className="Home-div">
                        <p className="Home-divtext">HOME</p>
                    </div>
                    <div className="main-body-grid">
                 
                     <div className="button-attributes">
                     <span className="CreateEvent-ButtonImage">
                                    <img className ="CreateEvent-ButtonImageActual"
                                    src={CreateEventLogo} alt="Logo"/>
                                </span> 
                            <Link to="/addevent" className="link-style">
                             
                                    ADD EVENT
                                    
                            </Link>
                        </div>

                        <div className="button-attributes">
                        <span className="Calendar-ButtonImage">
                                    <img className ="Calendar-ButtonImageActual"
                                    src={CalenderButtonLogo} alt="CalendarButtonLogo"/>
                                </span> 
                            <Link to="/calendar" className="link-style">
                               
                                    CALENDAR
                            </Link>
                        </div>

                        <div className="button-attributes">
                        <span className="ToDoList-ButtonImage">
                                    <img className ="ToDoList-ButtonImageActual"
                                    src={ToDoListButtonLogo} alt="ToDoListLogo"/>
                                </span> 
                            <Link to = "/todolist" className="link-style">
                               
                                TO DO LIST
                            </Link>
                        </div>


                        <div className="button-attributes">
                        <span className="Settings-ButtonImage">
                                    <img className ="Settings-ButtonImageActual"
                                    src={SettingsButtonLogo} alt="ToDoListLogo"/>
                                </span> 
                            <Link to ="/settings" className="link-style">
                               
                                SETTINGS
                            </Link>
                            
                      
                    </div>
                    </div>
                    <div className='contact-us-section'>
                        <button className="contact-button" onClick={handleContactButtonClick}>
                            <img className = "contactUs-image" src={contactUsLogo} /> Contact Us
                        </button>
                        {showContactForm && <ContactForm />}
                    </div>
                
            </main>
         
            <Footer />
            
            </div>
    </div>
    )
}