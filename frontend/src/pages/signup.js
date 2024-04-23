import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import '../stylesheets/backgroundstyles.css';

export function containsNumber(str) {
    return /\d/.test(str);
}

export function containsUpperCase(str) {
    return /[A-Z]/.test(str);
}

export function containsSpace(str) {
    return (!(/\s/.test(str)));
}

export function eightCharacters(str) {
    return (str.length >= 8);
}

export function fieldNotEmpty(str) {
    return (str !== '');
}

export function checkEmailValidity(userEmail) {
    const atIndex = userEmail.indexOf('@');
    const dotIndex = userEmail.lastIndexOf('.');
    if ((atIndex > 0) && (dotIndex > atIndex + 1) && (dotIndex < userEmail.length - 1)) {
        return true;
    }
    return false;
}

export function checkPasswordsMatch(userPassword1, userPassword2) {
    if (userPassword1 === userPassword2) {
        return true;
    }
    return false;
}



// function containsNumber(str) {
//     return /\d/.test(str);
// }

// function containsUpperCase(str) {
//     return /[A-Z]/.test(str);
// }

// function containsSpace(str) {
//     return (!(/\s/.test(str)));
// }

// function eightCharacters(str) {
//     return (str.length >= 8);
// }

// function fieldNotEmpty(str) {
//     return (str !== '');
// }

// function checkEmailValidity(userEmail) {
//     const atIndex = userEmail.indexOf('@');
//     const dotIndex = userEmail.lastIndexOf('.');
//     if ((atIndex > 0) && (dotIndex > atIndex + 1) && (dotIndex < userEmail.length - 1)) {
//         return true;
//     }
//     return false;
// }

// function checkPasswordsMatch(userPassword1, userPassword2) {
//     if (userPassword1 === userPassword2) {
//         return true;
//     }
//     return false;
// }

// module.exports = containsNumber;
// module.exports = containsSpace;
// module.exports = containsUpperCase;
// module.exports = eightCharacters;
// module.exports = fieldNotEmpty;
// module.exports = checkEmailValidity;
// module.exports = checkPasswordsMatch;

// export const SignUp = (props) => {
function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    // const [terms, setTerms] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [emailError] = useState('');
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

    // this.containsNumber = function(str) {
    //     return /\d/.test(str);
    // }
    
    // this.containsUpperCase = function(str) {
    //     return /[A-Z]/.test(str);
    // }
    
    // function containsSpace(str) {
    //     return (!(/\s/.test(str)));
    // }
    
    // function eightCharacters(str) {
    //     return (str.length >= 8);
    // }
    
    // function fieldNotEmpty(str) {
    //     return (str !== '');
    // }
    
    // function checkEmailValidity(userEmail) {
    //     const atIndex = userEmail.indexOf('@');
    //     const dotIndex = userEmail.lastIndexOf('.');
    //     if ((atIndex > 0) && (dotIndex > atIndex + 1) && (dotIndex < userEmail.length - 1)) {
    //         return true;
    //     }
    //     return false;
    // }
    
    // function checkPasswordsMatch(userPassword1, userPassword2) {
    //     if (userPassword1 === userPassword2) {
    //         return true;
    //     }
    //     return false;
    // }
    
    // module.exports = containsNumber;
    // module.exports = containsSpace;
    // module.exports = containsUpperCase;
    // module.exports = eightCharacters;
    // module.exports = fieldNotEmpty;
    // module.exports = checkEmailValidity;
    // module.exports = checkPasswordsMatch;

    // Function to handle the submit button
    async function handleSubmit(e) {
        e.preventDefault();
        console.log(username);
        console.log(email);
        console.log(password1);
        setVerificationAlert(false);
        setAlertError('');

        // If all fields are valid, then create a new record
        if (checkPassword(username, password1, password2) && checkEmailValidity(email)){
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
                    notifications: "all", locations: [], tasks: [], events: []}),
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
    
    // // Function to check if email is valid
    // function checkEmailValidity(userEmail) {
    //     const atIndex = userEmail.indexOf('@');
    //     const dotIndex = userEmail.lastIndexOf('.');
    //     if ((atIndex > 0) && (dotIndex > atIndex + 1) && (dotIndex < userEmail.length - 1)) {
    //         setVerifiedEmail(true);
    //         return true;
    //     } else {
    //         setVerifiedEmail(false);
    //         setEmailError('Please enter a valid email');
    //         return false;
    //     }
    // }

    // Function to check if password is valid
    function checkPassword(userUsername, userPassword1, userPassword2) {
        if (fieldsNotEmpty(userUsername, userPassword1, userPassword2)) {
            if (checkPasswordsMatch(userPassword1, userPassword2)) {
                setVerifiedPassword(true);
                if (checkPasswordComplexity(userPassword1)) {
                    return true
                }
            } else {
                setVerifiedPassword(false);
                setPassword1Error("Passwords do not match");
                setPassword2Error("Passwords do not match");                
            }
        }
        return false;
        // if (!checkFieldsNotEmpty(userUsername, userPassword1, userPassword2)) {
        //     fail = true;
        // }
        // if (verifiedPassword && checkPasswordsMatch(userPassword1, userPassword2)) {
        //     // if (checkPasswordComplexity(userPassword1)) {
        //     //     if (!fail) {
        //     //         return true;
        //     //     }
        //     // }
        // }
        // return false;
    }

    function fieldsNotEmpty(userUsername, userPassword1, userPassword2) {
        var fail = false;
        if (fieldNotEmpty(userUsername)) {
            fail = true;
            setVerifiedUsername(false);
            setUsernameError('Please enter a username');
        } else {
            setVerifiedUsername(true);
        }
        if (fieldNotEmpty(userPassword1)) {
            fail = true;
            setVerifiedPassword(false);
            setPassword1Error('Please enter a password');
        } else {
            setVerifiedPassword(true);
        }
        if (fieldNotEmpty(userPassword2)) {
            fail = true;
            setVerifiedPassword(false);
            setPassword2Error('Please confirm your password');
        } else {
            setVerifiedPassword(true);
        }
        if (fail) {
            return false;
        }
        return true;
    }
    // // Function to check if fields are not empty
    // function checkFieldsNotEmpty(userUsername, userPassword1, userPassword2) {
    //     // Function to check if username is not empty
    //     function checkUsernameNotEmpty() {
    //         if (userUsername === '') {
    //             setVerifiedUsername(false);
    //             setUsernameError('Please enter a username');
    //             return false;
    //         }
    //         setVerifiedUsername(true);
    //         return true;
    //     }
    //     // Function to check if password1 is not empty
    //     function checkPassword1NotEmpty() {
    //         if (userPassword1 === '') {
    //             setVerifiedPassword(false);
    //             setPassword1Error('Please enter a password');
    //             return false;
    //         }
    //         setVerifiedPassword(true);
    //         return true;
    //     }
    //     // Function to check if password2 is not empty
    //     function checkPassword2NotEmpty() {
    //         if (userPassword2 === '' && userPassword1 === '') {
    //             setVerifiedPassword(false);
    //             setPassword2Error('Please enter a password');
    //             return false;
    //         } else if (userPassword2 === '') {
    //             setVerifiedPassword(false);
    //             setPassword2Error('Please confirm your password');
    //             return false;
    //         }
    //         setVerifiedPassword(true);
    //         return true;
    //     }
    //     // Checks to see if username, password1, and password2 are not empty
    //     var usernameValid = checkUsernameNotEmpty();
    //     var password1Valid = checkPassword1NotEmpty();
    //     var password2Valid = checkPassword2NotEmpty();
    //     if (usernameValid && password1Valid && password2Valid) {
    //         return true;
    //     }
    //     return false;
    // }

    // // Function to check if passwords match
    // function checkPasswordsMatch(userPassword1, userPassword2) {
    //     if (userPassword1 !== userPassword2) {
    //         setVerifiedPassword(false);
    //         setPassword1Error('Passwords do not match');
    //         setPassword2Error('Passwords do not match');
    //         return false;
    //     }
    //     setVerifiedPassword(true);
    //     return true;
    // }

    // Function to check if password complies with password requirements
    
    function checkPasswordComplexity(userPassword) {
        var fail = false;
        if (!containsNumber(userPassword)) {
            fail = true;
            setVerifiedPassword(false);
            setPassword1Error('Password must contain a number');
            setPassword2Error('Password must contain a number');
        }
        if (!containsUpperCase(userPassword)) {
            fail = true;
            setVerifiedPassword(false);
            setPassword1Error('Password must contain an uppercase letter');
            setPassword2Error('Password must contain an uppercase letter');
        }
        if (!containsSpace(userPassword)) {
            fail = true;
            setVerifiedPassword(false);
            setPassword1Error('Password must not contain spaces');
            setPassword2Error('Password must not contain spaces');
        }
        if (!eightCharacters(userPassword)) {
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

    // // Function to check if password complies with password requirements
    // function checkPasswordComplexity(userPassword) {
    //     var hasNumber = /\d/;
    //     var hasUpper = /[A-Z]/;
    //     var fail = false;
    //     console.log(userPassword);
    //     if (!hasNumber.test(userPassword)) {
    //         fail = true;
    //         setVerifiedPassword(false);
    //         setPassword1Error('Password must contain a number');
    //         setPassword2Error('Password must contain a number');
    //     }
    //     if (!hasUpper.test(userPassword)) {
    //         fail = true;
    //         setVerifiedPassword(false);
    //         setPassword1Error('Password must contain an uppercase letter');
    //         setPassword2Error('Password must contain an uppercase letter');
    //     }
    //     if (userPassword.includes(' ')) {
    //         fail = true;
    //         setVerifiedPassword(false);
    //         setPassword1Error('Password must not contain spaces');
    //         setPassword2Error('Password must not contain spaces');
    //     }
    //     if (userPassword.length < 8) {
    //         fail = true;
    //         setVerifiedPassword(false);
    //         setPassword1Error('Password must be at least 8 characters long');
    //         setPassword2Error('Password must be at least 8 characters long');
    //     }
    //     if (!fail) {
    //         setVerifiedPassword(true);
    //         return true;
    //     }
    //     return false;
    // }

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