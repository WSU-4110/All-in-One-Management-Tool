import React, { useState } from 'react';
import '../stylesheets/profilepagestyles.css';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
    const [userProfile, setUserProfile] = useState({
        username: "example_user",
        email: "example@example.com",
        university: "Example University",
        major: "Computer Science",
        age: 30,
        location: "Example City"
    });
    const [isEditMode, setIsEditMode] = useState(false);

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const handleInputChange = (e) => {
        setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
    };

    const saveProfileChanges = () => {
        // Logic to save changes
        setIsEditMode(false);
    };

    return (
        <div className='home-background'>
            <Header />
            <h1 className="profile-title">Profile</h1>
            <div className='profile-container'>
                {isEditMode ? (
                    <form>
                        <div className="input-group">
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username" value={userProfile.username} onChange={handleInputChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={userProfile.email} onChange={handleInputChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="university">University:</label>
                            <input type="text" id="university" name="university" value={userProfile.university} onChange={handleInputChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="major">Major:</label>
                            <input type="text" id="major" name="major" value={userProfile.major} onChange={handleInputChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="age">Age:</label>
                            <input type="number" id="age" name="age" value={userProfile.age} onChange={handleInputChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="location">Location:</label>
                            <input type="text" id="location" name="location" value={userProfile.location} onChange={handleInputChange} />
                        </div>
                        <button type="button" onClick={saveProfileChanges}>Save Changes</button>
                        <button type="button" onClick={toggleEditMode}>Cancel</button>
                    </form>
                ) : (
                    <div>
                        <p>Username: {userProfile.username}</p>
                        <p>Email: {userProfile.email}</p>
                        <p>University: {userProfile.university}</p>
                        <p>Major: {userProfile.major}</p>
                        <p>Age: {userProfile.age}</p>
                        <p>Location: {userProfile.location}</p>
                        <button onClick={toggleEditMode}>Edit Profile</button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
