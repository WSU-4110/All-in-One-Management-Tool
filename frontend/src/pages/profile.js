import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const serverURL = "http://localhost:5050"; // Server URL

export default function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state?.userData; 

    useEffect(() => {
        if (!userData) {
            navigate('/login');
        } else {
            // Optionally, fetch additional user data from the server here if needed
        }
    }, [userData, navigate]);

    const [userProfile, setUserProfile] = useState({
        username: userData?.username || "",
        email: userData?.email || "",
        // Add more fields as needed
    });

    const [isEditMode, setIsEditMode] = useState(false);

    const handleInputChange = (e) => {
        setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
    };

    const saveProfileChanges = async () => {
        try {
            const response = await fetch(`${serverURL}/updateProfile/${userData.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userProfile)
            });
            if (response.ok) {
                alert("Profile updated successfully!");
            } else {
                alert("Error updating profile.");
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
        setIsEditMode(false);
    };

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    return (
        <div className='home-outer'>
            <div className='home-background' />
            <div className='home-inner'>
                <Header />
                <h1 className="profile-title">Profile</h1>
                <div className='profile-container'>
                    {isEditMode ? (
                        <form>
                            {/* Input fields for editable profile information */}
                            <div className="input-group">
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" name="username" value={userProfile.username} onChange={handleInputChange} />
                            </div>
                            {/* Add more input fields as needed */}
                            <button type="button" onClick={saveProfileChanges}>Save Changes</button>
                            <button type="button" onClick={toggleEditMode}>Cancel</button>
                        </form>
                    ) : (
                        <div>
                            <p>Username: {userProfile.username}</p>
                            {/* Display other user details */}
                            <button onClick={toggleEditMode}>Edit Profile</button>
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </div>
    );
}



