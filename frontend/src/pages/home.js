import React, { useState} from 'react';
import {Link} from 'react-router-dom';
import ContactForm from './contactForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConfigureProfile from '../modals/configureProfile';
import ContactModal from '../modals/contactModal';
import CreateEventLogo from '../images/CreateEventLogo.png';
import CalenderButtonLogo from '../images/CalanderButtonLogo.png';
import SettingsButtonLogo from '../images/SettingsButtonLogo.png';
import ToDoListButtonLogo from '../images/ToDoListButtonLogo.png';
import contactUsLogo from '../images/ContactUsLogo.png';
import '../stylesheets/homepagestyles.css';
import '../stylesheets/backgroundstyles.css';

export default function Home() {
    const [showContactForm, setShowContactForm] = useState(false);
    const [profileConfigured, setProfileConfigured] = useState(true);
    const handleContactButtonClick = () => {
        setShowContactForm(!showContactForm);
    };

    // Check if the user has configured their profile, if they have not
    // it will display the configure profile modal.
    if (sessionStorage["Locations"] === "") {
        setProfileConfigured(false);
    }

    console.log(sessionStorage["Username"]);
    console.log(sessionStorage["Password"]);
    console.log(sessionStorage["Email"]);
    console.log(sessionStorage["Notifications"]);
    console.log(sessionStorage["Locations"]);
    console.log(sessionStorage["Tasks"]);
    console.log(sessionStorage["Events"]);

    return (
        <div className='home-outer'>
            <div className='home-background'/>
                <div className='home-inner'>
                    <Header />
                    {(!profileConfigured) && (<ConfigureProfile />)}
                    {showContactForm && <ContactModal />}
                    <main>
                        <div className="Home-div">
                            <p className="Home-divtext">HOME</p>
                        </div>
                        <div className="main-body-grid">
                            <div className="button-attributes">
                            <span className="CreateEvent-ButtonImage">
                                    <img className ="CreateEvent-ButtonImageActual"
                                    src={CreateEventLogo} alt="Create Event Button"/>
                                </span> 
                                <Link to="/addevent" className="link-style">
                                
                                        ADD EVENT
                                        
                                </Link>
                            </div>

                            <div className="button-attributes">
                                <span className="Calendar-ButtonImage">
                                    <img className ="Calendar-ButtonImageActual"
                                    src={CalenderButtonLogo} alt="Calendar Button"/>
                                </span> 
                                <Link to="/calendar" className="link-style">

                                        CALENDAR
                                </Link>
                            </div>

                            <div className="button-attributes">
                                <span className="ToDoList-ButtonImage">
                                    <img className ="ToDoList-ButtonImageActual"
                                    src={ToDoListButtonLogo} alt="To-Do List"/>
                                </span> 
                                <Link to = "/todolist" className="link-style">

                                    TO DO LIST
                                </Link>
                            </div>

                            <div className="button-attributes">
                                <span className="Settings-ButtonImage">
                                    <img className ="Settings-ButtonImageActual"
                                    src={SettingsButtonLogo} alt="Settings Button"/>
                                </span> 
                                <Link to ="/settings" className="link-style">

                                    SETTINGS
                                </Link>
                            </div>

                        </div>
                        <div className='contact-us-section'>
                            <button className="contact-button" onClick={handleContactButtonClick}>
                                <img className = "contactUs-image" src={contactUsLogo} alt="Contact Us Button" /> Contact Us
                            </button>
                            {/* {showContactForm && <ContactForm />} */}
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
    )
}