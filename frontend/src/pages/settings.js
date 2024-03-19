import React, { useState } from 'react';
import '../stylesheets/settingspagestyles.css';
import '../stylesheets/backgroundstyles.css';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Settings() {
    const [showChangePassword, setShowChangePassword] = useState(false);

    const settingsOptions = [
        { id: 1, title: "Change Password", component: showChangePassword && <ChangePassword /> },
        { id: 2, title: "Notification Preferences" },
        { id: 3, title: "Theme Settings" },
        { id: 4, title: "Language Preferences" }
    ];

    const handleToggleChangePassword = () => {
        setShowChangePassword(!showChangePassword);
    };

    return (
        <div className='home-outer'>
            <div className='home-background' />
                <div className='home-inner'>
                <Header />
                <h1 className="settings-title">Settings</h1>
                <div className='settings-container'>
                <div className="settings-options">
                    {settingsOptions.map(option => (
                        <button key={option.id} className="settings-button" onClick={option.title === "Change Password" ? handleToggleChangePassword : null}>
                            {option.title}
                        </button>
                    ))}
                </div>
                {showChangePassword && <ChangePassword />}
                <button className="logout-button">Logout</button>
                </div>
                <Footer />
            </div>
        </div>
    );
}

function ChangePassword() {
    return (
        <div className="change-password">
            {/* Your change password UI goes here */}
            <h2>Change Password</h2>
            <div >
            <form className='change-password-form'>
                <label htmlFor="current-password">Current Password</label>
                <input type="password" id="current-password" required />
                <label htmlFor="new-password">New Password</label>
                <input type="password" id="new-password" required />
                <label htmlFor="confirm-password">Confirm New Password</label>
                <input type="password" id="confirm-password" required />
                <button type="submit" className=''>Change Password</button>
            </form>
            </div>
        </div>
    );
}

