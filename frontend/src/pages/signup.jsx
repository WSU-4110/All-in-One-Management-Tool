import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import '../stylesheets/backgroundstyles.css';

export const SignUp = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    // const [terms, setTerms] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password1Error, setPassword1Error] = useState('');
    const [password2Error, setPassword2Error] = useState('');
    const [verifiedUsername, setVerifiedUsername] = useState(true);
    const [verifiedEmail, setVerifiedEmail] = useState(true);
    const [verifiedPassword, setVerifiedPassword] = useState(true);
    // const [verifiedTerms, setVerifiedTerms] = useState(false);
    // Variable in charge of displaying the terms alert.
    // const [termsAlert, setTermsAlert] = useState(false);
    // Variable in charge of displaying the verification alert.
    const [verificationAlert, setVerificationAlert] = useState(false);
    // Variable in charge of displaying the error message.
    const [alertError, setAlertError] = useState('');
    const navigate = useNavigate();

    // UseEffect to check if fields are not empty
    useEffect(() => {
        if (username !== '') {
            setVerifiedUsername(true);
        }
        if (email !== '') {
            setVerifiedEmail(true);
        }
        if (password1 !== '') {
            setVerifiedPassword(true);
        }
        if (password2 !== '') {
            setVerifiedPassword(true);
        }
    }, [username, email, password1, password2]);

    // Function to handle the submit button
    async function handleSubmit(e) {
        e.preventDefault();
        console.log(username);
        console.log(email);
        console.log(password1);
        setVerificationAlert(false);
        setAlertError('');

        // If all fields are valid, then create a new record
        if (checkPassword() && checkEmailValidity()){
            // if (terms) {

            // Fetches the records from the database
            const response = await fetch(`http://localhost:5050/record`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });
            // Checks whether the fetch operation was successful.
            if (!response.ok) {
                setVerificationAlert(true);
                const message = `An error has occurred: ${response.statusText}`;
                setAlertError(message);
                console.log(message)
                return;
            }
            // Checks the database to see if the username is available.
            const record = await response.json();
            for (let i = 0; i < record.length; i++) {
                if (record[i].username === username) {
                    setVerificationAlert(true);
                    setAlertError(`Profile with username ${username} already exists`);
                    console.log(`Profile with username ${username} already exists`);
                    return;
                }
            }
            // Checks the database to see if the email is available.
            for (let i = 0; i < record.length; i++) {
                if (record[i].email === email) {
                    setVerificationAlert(true);
                    setAlertError(`Profile with email ${email} already exists`);
                    console.log(`Profile with email ${email} already exists`);
                    return;
                }
            }
            // Adds the record to the database.
            try {
                const response = await fetch(`http://localhost:5050/record/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    { username: username, email: email, password: password1,
                    notifications: "all", locations: "", tasks: "", events: ""}),
                });
                // Checks whether the fetch operation was successful.
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    console.log('Record added successfully');
                    navigate("/login");
                }
            // Catches any errors that may occur.
            } catch (error) {
                console.error('A problem occurred with your fetch operation: ', error);
            }
            // } else {
            //     setVerifiedTerms(false);
            //     setTermsAlert(true);
            // }
        }
        else {
            setVerifiedPassword(false);
        }
    }
    
    // Function to check if email is valid
    function checkEmailValidity() {
        const atIndex = email.indexOf('@');
        const dotIndex = email.lastIndexOf('.');
        if ((atIndex > 0) && (dotIndex > atIndex + 1) && (dotIndex < email.length - 1)) {
            setVerifiedEmail(true);
            return true;
        } else {
            setVerifiedEmail(false);
            setEmailError('Please enter a valid email');
            return false;
        }
    }

    // Function to check if password is valid
    function checkPassword() {
        var fail = false;
        if (!checkFieldsNotEmpty()) {
            fail = true;
        }
        if (verifiedPassword && checkPasswordsMatch()) {
            if (checkPasswordComplexity()) {
                if (!fail) {
                    return true;
                }
            }
        }
        return false;
    }

    // Function to check if fields are not empty
    function checkFieldsNotEmpty() {
        // Function to check if username is not empty
        function checkUsernameNotEmpty() {
            if (username === '') {
                setVerifiedUsername(false);
                setUsernameError('Please enter a username');
                return false;
            }
            setVerifiedUsername(true);
            return true;
        }
        // Function to check if password1 is not empty
        function checkPassword1NotEmpty() {
            if (password1 === '') {
                setVerifiedPassword(false);
                setPassword1Error('Please enter a password');
                return false;
            }
            setVerifiedPassword(true);
            return true;
        }
        // Function to check if password2 is not empty
        function checkPassword2NotEmpty() {
            if (password2 === '' && password1 === '') {
                setVerifiedPassword(false);
                setPassword2Error('Please enter a password');
                return false;
            } else if (password2 === '') {
                setVerifiedPassword(false);
                setPassword2Error('Please confirm your password');
                return false;
            }
            setVerifiedPassword(true);
            return true;
        }
        // Checks to see if username, password1, and password2 are not empty
        var usernameValid = checkUsernameNotEmpty();
        var password1Valid = checkPassword1NotEmpty();
        var password2Valid = checkPassword2NotEmpty();
        if (usernameValid && password1Valid && password2Valid) {
            return true;
        }
        return false;
    }

    // Function to check if passwords match
    function checkPasswordsMatch() {
        if (password1 !== password2) {
            setVerifiedPassword(false);
            setPassword1Error('Passwords do not match');
            setPassword2Error('Passwords do not match');
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
        console.log(password1);
        // Check if password contains a number
        if (!hasNumber.test(password1)) {
            fail = true;
            setVerifiedPassword(false);
            setPassword1Error('Password must contain a number');
            setPassword2Error('Password must contain a number');
        }
        // Check if password contains an uppercase letter
        if (!hasUpper.test(password1)) {
            fail = true;
            setVerifiedPassword(false);
            setPassword1Error('Password must contain an uppercase letter');
            setPassword2Error('Password must contain an uppercase letter');
        }
        // Check if password contains a space
        if (password1.includes(' ')) {
            fail = true;
            setVerifiedPassword(false);
            setPassword1Error('Password must not contain spaces');
            setPassword2Error('Password must not contain spaces');
        }
        // Check if password is at least 8 characters long
        if (password1.length < 8) {
            fail = true;
            setVerifiedPassword(false);
            setPassword1Error('Password must be at least 8 characters long');
            setPassword2Error('Password must be at least 8 characters long');
        }
        // If password passes all checks, set verifiedPassword to true
        if (!fail) {
            setVerifiedPassword(true);
            return true;
        }
        return false;
    }

    // // Function to set the terms and conditions checkbox
    // function setCheckedTerms() {
    //     setTerms(!terms);
    //     setVerifiedTerms(!verifiedTerms);
    // }
    
    return(
        <div className="init-background">
            <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            className=''>
                <Form noValidate>
                    <h1
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>Sign Up</h1>
                    <br></br>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label 
                        style={{
                            color: "white",
                            textShadow: "2px 2px 4px #000000",
                        }}>Username: </Form.Label>
                        <Form.Control
                            isInvalid={!verifiedUsername}
                            type="username"
                            placeholder="Username"
                            value={username}
                            onChange={(u) => setUsername(u.target.value)}/>
                        <Form.Control.Feedback type="invalid"
                        style={{
                            color: "white",
                            textShadow: "2px 2px 4px #FF0000",
                        }}>
                            {usernameError}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label 
                        style={{
                            color: "white",
                            textShadow: "2px 2px 4px #000000",
                        }}>Email: </Form.Label>
                        <Form.Control
                            isInvalid={!verifiedEmail}
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                        <Form.Control.Feedback type="invalid"
                        style={{
                            color: "white",
                            textShadow: "2px 2px 4px #FF0000",
                        }}>
                            {emailError}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="formBasicPassword1">
                        <Form.Label 
                        style={{
                            color: "white",
                            textShadow: "2px 2px 4px #000000",
                        }}>Password: </Form.Label>
                        <Form.Control
                            isInvalid={!verifiedPassword}
                            type="password"
                            placeholder="Password"
                            value={password1}
                            onChange={(p) => setPassword1(p.target.value)}/>
                        <Form.Control.Feedback type="invalid"
                        style={{
                            color: "white",
                            textShadow: "2px 2px 4px #FF0000",
                        }}>
                            {password1Error}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="formBasicPassword2">
                        <Form.Label 
                        style={{
                            color: "white",
                            textShadow: "2px 2px 4px #000000",
                        }}>Confirm Password: </Form.Label>
                        <Form.Control
                            isInvalid={!verifiedPassword}
                            type="password"
                            placeholder="Password"
                            value={password2}
                            onChange={(p) => setPassword2(p.target.value)}/>
                        <Form.Control.Feedback type="invalid"
                        style={{
                            color: "white",
                            textShadow: "2px 2px 4px #FF0000",
                        }}>
                            {password2Error}
                        </Form.Control.Feedback>
                        <p style={{
                            width: '300px',
                            fontSize: '0.85em',
                            marginTop: '0.5em',
                            color: "white",
                        }}>Password must be at least
                             8 characters long, contain a capital letter,
                              a number, and have no spaces.</p>
                    </Form.Group>
                    {/* <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                        type="checkbox"
                        isInvalid={!verifiedTerms}
                        label="I agree to the terms and conditions"
                        value={terms}
                        onChange={() => setCheckedTerms()}
                        style={{width: '280px', color: 'white',
                        textShadow: '2px 2px 4px #000000'}}
                        />
                        <br></br>
                        <Alert show={termsAlert} variant="danger"
                        style={{
                            // textShadow: "2px 2px 4px #FF0000",
                            color: "red",
                        }}>
                            You must agree to the terms and conditions
                        </Alert>
                    </Form.Group> */}
                    <Alert show={verificationAlert} variant="danger"
                    style={{
                        // textShadow: "2px 2px 4px #FF0000",
                        color: "red",
                    }}>
                        {alertError}
                    </Alert>
                    <Col
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {/* <Link to="/" className='mx-1'>
                            <Button variant="primary">Back</Button>
                        </Link> */}
                        <Button variant="primary" type="button"
                        onClick={() => navigate('/')} className="mx-1">
                            Back
                        </Button>
                        <Button variant="primary" type="submit"
                        onClick={handleSubmit} className="mx-1">
                            Sign Up
                        </Button>
                    </Col>
                </Form>
            </div>
        </div>
    )
}

export default SignUp;