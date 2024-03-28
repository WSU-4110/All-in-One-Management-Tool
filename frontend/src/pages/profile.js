import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
// import Footer from '../components/Footer';
import Header from '../components/Header';
import Expire from '../components/Expire';
import '../stylesheets/profilepagestyles.css';

export default function Profile() {
    // const [userProfile, setUserProfile] = useState({
    //     username: "example_user",
    //     email: "example@example.com",
    //     university: "Example University",
    //     major: "Computer Science",
    //     age: 30,
    //     location: "Example City"
    // });
    const [isEditMode, setIsEditMode] = useState(false);

    const toggleEditMode = () => {
            setIsEditMode(!isEditMode);
    };

    // const handleInputChange = (e) => {
    //     setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
    // };

    // const saveProfileChanges = () => {
    //     // Logic to save changes
    //     setIsEditMode(false);
    // };

    const [username, setUsername] = useState(sessionStorage.getItem("Username"));
    const [email, setEmail] = useState(sessionStorage.getItem("Email"));

    const [fullName, setFullName] = useState('');
    const [contactNumber, setContactNumber] = useState('');


    const [newPasswordBool, setNewPasswordBool] = useState(false);
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [newPassword1Error, setNewPassword1Error] = useState('');
    const [newPassword2Error, setNewPassword2Error] = useState('');
    const [verifiedPassword, setVerifiedPassword] = useState(true);
    const [notifications, setNotifications] = useState(localStorage.getItem("Notifications"));
    const [locations, setLocations] = useState([]);
    // Variable storing the location selected in the location dropdown button.
    const [selectedLocation, setSelectedLocation] = useState(
        'Select A Location');
    // Variable storing whether the user is adding a new location.
    const [newLocation, setNewLocation] = useState(false);
    // Variable storing the location to add.
    const [addLocation, setAddLocation] = useState('');
    // Variable storing whether the location is valid.
    const [validLocation, setValidLocation] = useState(true);
    const [validLocationMessage, setValidLocationMessage] = useState('');
    // Variable storing whether the location was successfully added
    // or deleted.
    const [locationSuccess, setLocationSuccess] = useState(false);
    // Variable storing the message to display in success alert.
    const [successMessage, setSuccessMessage] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    // Variable needed to force the alert to re-render.
    const [key, setKey] = useState(0);
    const navigate = useNavigate();

    /*useEffect(() => {
        const storedFullName = localStorage.getItem('FullName');
        const storedContactNumber = localStorage.getItem('ContactNumber');

        if (storedFullName) {
            setFullName(storedFullName);
        }
        if (storedContactNumber) {
            setContactNumber(storedContactNumber);
        }
    }, []);*/

    const disabledStyle = {
        opacity: 0.5, // Adjust this as needed for visibility
        backgroundColor: "#e9ecef" // Grey out color
    };
    



    /* Function to handle changes in the full name input field
    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };*/

    /* Update the full name value in session storage
    const updateFullNameInStorage = (newFullName) => {
        sessionStorage["FullName"] = newFullName;
    }; */

    // Function to check whether the location being added is valid.
    const validateLocation = (e) => {
        setAddLocation(e);
        if (e === '') {
            setValidLocation(false);
            setValidLocationMessage("Location field cannot be empty");
            return false;
        }
        setValidLocation(true);
        setValidLocationMessage('');
        for (var i = 0; i < locations.length; i++) {
            if (locations[i] === e) {
                setValidLocation(false);
                setValidLocationMessage("Location already exists");
                return false;
            }
        }
        setValidLocation(true);
        setValidLocationMessage('');
        return true;
    }

    // Function to submit the location to be added.
    const submitLocation = () => {
        if (validateLocation(addLocation)) {
            setLocations([...locations, addLocation]);
            setAddLocation('');
            setNewLocation(false);
            setSelectedLocation("Select A Location");
            setLocationSuccess(true);
            setSuccessMessage("Location successfully added!");
            setKey(key+1);
        }
    }

    // Function to change the selected location in the dropdown button.
    const changeSelectedLocation = (e) => {
        setSelectedLocation(e);
        setNewLocation(false);
        setAddLocation("");
    }

    // Function to delete the selected location.
    const deleteLocation = () => {
        setLocations(locations.filter(
            (location) => location !== selectedLocation));
        sessionStorage["Locations"] = locations.filter(
            (location) => location !== selectedLocation);
        setSelectedLocation('Select A Location');
        setLocationSuccess(true);
        setSuccessMessage("Location successfully deleted!");
        setKey(key+1);
    }

    // Function to add a new location.
    const addNewLocation = () => {
        setNewLocation(true);
        setAddLocation('');
        setSelectedLocation('Select A Location');
        setValidLocation(true);
        setValidLocationMessage('');
    }

    const logout = () => {
        sessionStorage["Username"] = '';
        sessionStorage["Password"] = '';
        sessionStorage["Email"] = '';
        sessionStorage["Notifications"] = '';
        sessionStorage["Locations"] = [];
        sessionStorage["Tasks"] = [];
        sessionStorage["Events"] = [];
        navigate("/");
    }

    // Function to check if password is valid
    function checkPassword() {
        setVerifiedPassword(true);
        var fail = false;
        if (!checkFieldsNotEmpty()) {
            fail = true;
        }
        if (verifiedPassword && checkPasswordsMatch()) {
            if (checkPasswordComplexity()) {
                if (checkSamePassword()) {
                    if (!fail) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    // Function to check if fields are not empty
    function checkFieldsNotEmpty() {
        // Function to check if newPassword1 is not empty
        function checkPassword1NotEmpty() {
            if (newPassword1 === '') {
                setVerifiedPassword(false);
                setNewPassword1Error('Please enter a password');
                return false;
            }
            setVerifiedPassword(true);
            return true;
        }
        // Function to check if newPassword2 is not empty
        function checkPassword2NotEmpty() {
            if (newPassword2 === '' && newPassword1 === '') {
                setVerifiedPassword(false);
                setNewPassword2Error('Please enter a password');
                return false;
            } else if (newPassword2 === '') {
                setVerifiedPassword(false);
                setNewPassword2Error('Please confirm your password');
                return false;
            }
            setVerifiedPassword(true);
            return true;
        }
        var password1Valid = checkPassword1NotEmpty();
        var password2Valid = checkPassword2NotEmpty();
        if (password1Valid && password2Valid) {
            return true;
        }
        return false;
    }

    // Function to check if passwords match
    function checkPasswordsMatch() {
        if (newPassword1 !== newPassword2) {
            setVerifiedPassword(false);
            setNewPassword1Error('Passwords do not match');
            setNewPassword2Error('Passwords do not match');
            return false;
        }
        setVerifiedPassword(true);
        return true;
    }

    function checkSamePassword() {
        if (newPassword1 === sessionStorage["Password"]) {
            setVerifiedPassword(false);
            setNewPassword1Error('New password cannot be old password');
            setNewPassword2Error('New password cannot be old password');
            return false;
        }
        setVerifiedPassword(true);
        return true;
    }


    // Function to check if password complies with password requirements
    function checkPasswordComplexity() {
        var hasNumber = /\d/;
        var hasUpper = /[A-Z]/;
        var fail = false;
        console.log(newPassword1);
        // Check if password contains a number
        if (!hasNumber.test(newPassword1)) {
            fail = true;
            setVerifiedPassword(false);
            setNewPassword1Error('Password must contain a number');
            setNewPassword2Error('Password must contain a number');
        }
        // Check if password contains an uppercase letter
        if (!hasUpper.test(newPassword1)) {
            fail = true;
            setVerifiedPassword(false);
            setNewPassword1Error('Password must contain an uppercase letter');
            setNewPassword2Error('Password must contain an uppercase letter');
        }
        // Check if password contains a space
        if (newPassword1.includes(' ')) {
            fail = true;
            setVerifiedPassword(false);
            setNewPassword1Error('Password must not contain spaces');
            setNewPassword2Error('Password must not contain spaces');
        }
        // Check if password is at least 8 characters long
        if (newPassword1.length < 8) {
            fail = true;
            setVerifiedPassword(false);
            setNewPassword1Error('Password must be at least 8 characters long');
            setNewPassword2Error('Password must be at least 8 characters long');
        }
        // If password passes all checks, set verifiedPassword to true
        if (!fail) {
            setVerifiedPassword(true);
            return true;
        }
        return false;
    }

    // Function to discard changes to the password
    const discardChanges = () => {
        setNewPassword1('');
        setNewPassword2('');
        setNewPasswordBool(false);
    }

    async function saveChanges() {
        if (checkPassword()) {
            sessionStorage.setItem("Password", newPassword1);
            console.log(newPassword1);
            console.log(sessionStorage["Password"]);
            try {
                const profileData = {
                    username: username,
                    email: email,
                    password: newPassword1,
                    notifications: sessionStorage["Notifications"],
                    locations: sessionStorage["Locations"],
                    tasks: sessionStorage["Tasks"],
                    events: sessionStorage["Events"],
                    //fullName: fullName, // Include full name
                    //contactNumber: contactNumber, // Include contact number
                };
                const response = await fetch(
                    `http://localhost:5050/record/edit`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                },
                body: JSON.stringify(profileData) // Use profileData here
            });
                // Checks whether the fetch operation was successful.
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    console.log('Record modified successfully');
                    setNewPassword1('');
                    setNewPassword2('');
                    setNewPasswordBool(false);
                    setPasswordSuccess(true);
                    setKey(key + 1);

                    localStorage.setItem('FullName', fullName);
                    localStorage.setItem('ContactNumber', contactNumber);
               }
            // Catches any errors that occur during the fetch operation.
            } catch (error) {
                console.error(
                    'A problem occurred with your fetch operation: ', error);
            }
        }
    }

    // Function to list the locations in the session storage
    // into the locations array.
    const locationsList = () => {
        const locationsArray = sessionStorage["Locations"].split(',');
        console.log(locationsArray);
        for (var i = 0; i < locationsArray.length; i++) {
            if (locationsArray[i] !== ''
                && locationsArray[i] !== undefined) {
                    if(!locations.includes(locationsArray[i])){
                        locations.push(locationsArray[i]);
                    }
            }
        }
        console.log("locationsList: " + locations);
        return locations;
    }
    console.log(sessionStorage["Locations"]);
    console.log(locations);

    // Function to handle the submission of the form.
    async function handleSubmit(e) {
        e.preventDefault();
        localStorage.setItem("Notifications", notifications);
        localStorage.setItem("Locations", JSON.stringify(locations));
        localStorage.setItem('FullName', fullName);
        localStorage.setItem('ContactNumber', contactNumber);

    
        // Creating FormData to handle file upload along with other data
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', sessionStorage["Password"]);
        formData.append('notifications', notifications);
        formData.append('locations', JSON.stringify(locations)); // Convert array to string
        formData.append('tasks', sessionStorage["Tasks"]);
        formData.append('events', sessionStorage["Events"]);
        formData.append('fullName', fullName);
        formData.append('contactNumber', contactNumber);
    
    
        try {
            const response = await fetch(`http://localhost:5050/record/edit`, {
                method: "PATCH",
                body: formData // Send FormData
                // Note: Don't set 'Content-Type' header when sending FormData
            });
    
            // Checks whether the fetch operation was successful.
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                console.log('Record modified successfully');
                navigate("/home");
            }
        } catch (error) {
            console.error('A problem occurred with your fetch operation: ', error);
        }
    }

   
    

    return (
        <div className='home-outer'>
            <div className='home-background' />
            <div className='home-inner'>
                <Header />
                <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Form noValidate onSubmit={handleSubmit}>
                        <br></br>
                        <h1
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        Hello, {username}
                    </h1>


                        <Form.Group controlId="formBasicUsername">
                            <Form.Label 
                            style={{
                                color: "white",
                                textShadow: "2px 2px 4px #000000",
                            }}>Username: </Form.Label>
                            <Form.Control
                                type="username"
                                placeholder={username}
                                disabled
                                readOnly
                                style={{
                                    opacity: 0.5,
                                }}/>
                        </Form.Group>
                        <br></br>

                    
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label 
                            style={{
                                color: "white",
                                textShadow: "2px 2px 4px #000000",
                            }}>Email: </Form.Label>
                            <Form.Control
                                type="username"
                                placeholder={email}
                                disabled
                                readOnly
                                style={{
                                    opacity: 0.5,
                                }}/>
                        </Form.Group>
                        <br></br>
                        
                        <Form.Group controlId="formBasicNotifications">
                            <Form.Label 
                            style={{
                                color: "white",
                                textShadow: "2px 2px 4px #000000",
                            }}>Notifications: </Form.Label>
                            <Form.Select
                                value={notifications}
                                onChange={
                                    (u) => setNotifications(u.target.value)}
                                disabled={!isEditMode}
                                style={!isEditMode ? disabledStyle : {}}
                                >
                                <option value="none">
                                    Receive no notifications for all events
                                </option>
                                <option value="weekOf">
                                    Receive notifications a week before a deadline
                                </option>
                                <option value="dayOf">
                                    Receive notifications on the day of a deadline
                                </option>
                                <option value="12hours">
                                    Receive notifications 12 hours before a deadline
                                </option>
                                <option value="6hours">
                                    Receive notifications 6 hours before a deadline
                                </option>
                                <option value="1hours">
                                    Receive notifications 1 hours before a deadline
                                </option>
                                <option value="all">
                                    Receive notifications for all events
                                </option>
                            </Form.Select>
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId="formBasicLocations">
                            <Form.Label 
                            style={{
                                color: "white",
                                textShadow: "2px 2px 4px #000000",
                            }}>Locations: </Form.Label>
                            <DropdownButton title={selectedLocation} disabled = {!isEditMode}
                            style={{
                                marginTop: "-1em",
                                width: "100%",
                                }}>
                                {(locationsList() !== undefined)
                                    && (locations.length !== 0) && (
                                    <ul>
                                        {locations && locations.map
                                            && locations.map((location) => (
                                            <Dropdown.Item
                                                onClick={
                                                    () => changeSelectedLocation(location)}
                                                >
                                                {location}
                                            </Dropdown.Item>
                                        ))}
                                    </ul>)}
                                <Dropdown.Item onClick={() => addNewLocation()}
                                style={{
                                    color: "green",
                                    width: "100%",
                                }}>
                                    Add new location
                                </Dropdown.Item>
                                {/* <option value="">Select a location</option>
                                <option value="home">Home</option>
                                <option value="school">School</option>
                                <option value="work">Work</option>
                                <option value="other">Other</option> */}
                            </DropdownButton>
                        </Form.Group>

                        {(newLocation) && (
                            <Form.Group controlId="formBasicAddLocation">
                                <br></br>
                                <Form.Label 
                                style={{
                                    color: "white",
                                    textShadow: "2px 2px 4px #000000",
                                }}>Add Location: </Form.Label>
                                    <Form.Control
                                        isInvalid={!validLocation}
                                        type="username"
                                        placeholder="Enter a new location"
                                        value={addLocation}
                                        onChange={
                                            (u) => validateLocation(u.target.value)}
                                        />
                                    <Form.Control.Feedback type="invalid"
                                        style={{
                                            color: "white",
                                            textShadow: "2px 2px 4px #FF0000",
                                        }}>
                                        {validLocationMessage}
                                    </Form.Control.Feedback>
                                    <Button variant="primary"
                                        onClick={
                                            (u) => submitLocation(u.target.value)}
                                    >
                                        Add Location
                                    </Button>
                            </Form.Group>
                        )}

                        {(selectedLocation !== 'Select A Location') && (
                            <Form.Group controlId="formBasicRemoveLocation">
                                <br></br>
                                <Button variant="danger"
                                    onClick={() => deleteLocation()}
                                >
                                    Remove Location
                                </Button>
                            </Form.Group>
                        )}

                        <br></br>
                        <Expire delay="4000" key={key}>
                            <Alert show={locationSuccess} variant='success'>
                                {successMessage}
                            </Alert>
                        </Expire>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {isEditMode ? (
                                <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Button variant="secondary" className="mx-1" onClick={toggleEditMode}>
                                        Discard Changes
                                    </Button>
                                    <Button variant="primary" type="submit" className="mx-1">
                                        Save Changes
                                    </Button>
                                </Col>
                            ) : (
                                <Button variant="primary" className="mx-1" onClick={toggleEditMode}> 
                                    Edit Profile
                                </Button>
                            )}
                        </div>

                    <br></br>

                       

                        <Form.Group controlId="formBasicNewPassword">
                            {!newPasswordBool && (
                                <Form.Group controlId="formBasicNewPasswordButton"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Button variant='primary' type='button'
                                    className='mx-1' onClick={() => setNewPasswordBool(!newPasswordBool)}>
                                        Change Password
                                    </Button>
                                </Form.Group>
                            )}
                            {newPasswordBool && (
                                <Form.Group controlId='formBasicChangePassword'>
                                    <Form.Label 
                                    style={{
                                        color: "white",
                                        textShadow: "2px 2px 4px #000000",
                                    }}>New Password: </Form.Label>
                                    <Form.Control
                                        isInvalid={!verifiedPassword}
                                        type="password"
                                        placeholder="Password"
                                        value={newPassword1}
                                        onChange={(p) => setNewPassword1(p.target.value)}/>
                                    <Form.Control.Feedback type="invalid"
                                    style={{
                                        color: "white",
                                        textShadow: "2px 2px 4px #FF0000",
                                    }}>
                                        {newPassword1Error}
                                    </Form.Control.Feedback>
                                    <br></br>
                                    <Form.Label 
                                    style={{
                                        color: "white",
                                        textShadow: "2px 2px 4px #000000",
                                    }}>Confirm New Password: </Form.Label>
                                    <Form.Control
                                        isInvalid={!verifiedPassword}
                                        type="password"
                                        placeholder="Password"
                                        value={newPassword2}
                                        onChange={(p) => setNewPassword2(p.target.value)}/>
                                    <Form.Control.Feedback type="invalid"
                                    style={{
                                        color: "white",
                                        textShadow: "2px 2px 4px #FF0000",
                                    }}>
                                        {newPassword2Error}
                                    </Form.Control.Feedback>
                                    <p style={{
                                        width: '300px',
                                        fontSize: '0.85em',
                                        marginTop: '0.5em',
                                        color: "white",
                                    }}>Password must be at least
                                        8 characters long, contain a capital letter,
                                        a number, and have no spaces.</p>
                                    <Form.Group controlId='formBasicPasswordButtons'
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Button variant='secondary' type='button'
                                        className='mx-1' onClick={() => discardChanges()}>
                                            Discard Changes
                                        </Button>
                                        <Button variant='primary' type='button'
                                        className='mx-1' onClick={() => saveChanges()}>
                                            Save Changes
                                        </Button>
                                    </Form.Group>
                                </Form.Group>
                            )}
                            <Expire delay="4000" key={key}>
                                <br></br>
                                <Alert show={passwordSuccess} variant='success'>
                                    Password successfully changed!
                                </Alert>
                            </Expire>
                        </Form.Group>
                        <br></br>

                        
                        <Col
                        style={{
                            display: "flex",
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Button variant='danger' type='submit'
                            className='mx-1' onClick={() => logout()}>
                                Logout
                            </Button>
                        </Col>
                    </Form>
                </div>
                {/* <Footer/> */}
            </div>
        </div>
    );




    // return (
    //     <div className='home-outer'>
    //         <div className='home-background' />
    //         <div className='home-inner'>
    //         <Header />
    //         <h1 className="profile-title">Profile</h1>
    //         <div className='profile-container'>
    //             {isEditMode ? (
    //                 <form>
    //                     <div className="input-group">
    //                         <label htmlFor="username">Username:</label>
    //                         <input type="text" id="username" name="username" value={userProfile.username} onChange={handleInputChange} />
    //                     </div>
    //                     <div className="input-group">
    //                         <label htmlFor="email">Email:</label>
    //                         <input type="email" id="email" name="email" value={userProfile.email} onChange={handleInputChange} />
    //                     </div>
    //                     <div className="input-group">
    //                         <label htmlFor="university">University:</label>
    //                         <input type="text" id="university" name="university" value={userProfile.university} onChange={handleInputChange} />
    //                     </div>
    //                     <div className="input-group">
    //                         <label htmlFor="major">Major:</label>
    //                         <input type="text" id="major" name="major" value={userProfile.major} onChange={handleInputChange} />
    //                     </div>
    //                     <div className="input-group">
    //                         <label htmlFor="age">Age:</label>
    //                         <input type="number" id="age" name="age" value={userProfile.age} onChange={handleInputChange} />
    //                     </div>
    //                     <div className="input-group">
    //                         <label htmlFor="location">Location:</label>
    //                         <input type="text" id="location" name="location" value={userProfile.location} onChange={handleInputChange} />
    //                     </div>
    //                     <button type="button" onClick={saveProfileChanges}>Save Changes</button>
    //                     <button type="button" onClick={toggleEditMode}>Cancel</button>
    //                 </form>
    //             ) : (
    //                 <div>
    //                     <p>Username: {userProfile.username}</p>
    //                     <p>Email: {userProfile.email}</p>
    //                     <p>University: {userProfile.university}</p>
    //                     <p>Major: {userProfile.major}</p>
    //                     <p>Age: {userProfile.age}</p>
    //                     <p>Location: {userProfile.location}</p>
    //                     <button onClick={toggleEditMode}>Edit Profile</button>
    //                 </div>
    //             )}
    //         </div>
    //         <Footer />
    //         </div>
    //     </div>
    // );
}
