import React, { useState } from "react"
import { Link , useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import '../stylesheets/backgroundstyles.css';

function fieldNotEmpty(str) {
    return (str !== "");
}

function containsSpace(str) {
    return ((/\s/.test(str)));
}

module.exports = fieldNotEmpty;
module.exports = containsSpace;

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifiedUsername, setVerifiedUsername] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [verifiedPassword, setVerifiedPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertError, setAlertError] = useState('');
    const navigate = useNavigate();
    
    async function handleSubmit(e) {
        e.preventDefault();
        console.log(username);
        console.log(password);
        setAlertVisible(false);
        setAlertError('');
        let accountData;

        if (verifyUsername() && verifyPassword()) {
            const response = await fetch(`http://localhost:5050/record`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });
            if (!response.ok) {
                setAlertVisible(true);
                const message = `An error has occurred: ${response.statusText}`;
                setAlertError(message);
                console.log(message)
                return;
            }
            // Looks for the user's account information in the database using the username the user provided.
            const record = await response.json();
            for (let i = 0; i < record.length; i++) {
                if (record[i].username === username) {
                    accountData = record[i];
                    break;
                }
            }

            console.log(accountData);
            if (accountData === undefined) {
                setAlertVisible(true);
                setAlertError(`Profile with username ${username} not found`);
                console.log(`Profile with username ${username} not found`);
                return;
            }
            if (accountData.password === password) {
                setAlertVisible(false);
                setAlertError('');
                console.log("Login successful");
                navigate("/home");
            } else {
                setAlertVisible(true);
                setAlertError("Incorrect username or password.");
                console.log("Incorrect username or password");
            }
            return;
        }
    }

    function verifyUsername() {
        if (!fieldNotEmpty()) {
            setVerifiedUsername(false);
            setUsernameError('Please enter a username');
            return false;
        }
        if (containsSpace()) {
            setVerifiedUsername(false);
            setUsernameError('Please enter a valid username');
            return false;
        }
        setVerifiedUsername(true);
        setUsernameError('');
        return true;
    }

    // function verifyEmail() {
    //     if (email === '') {
    //         setVerifiedEmail(true);
    //         setEmailError('Please enter a email');
    //         return false;
    //     }
    //     if ((!(email.includes('@'))) && (!(email.includes('.'))) && (email.includes(' '))
    //         && (!(email.endsWith('.com') || email.endsWith('.net')
    //         || email.endsWith('.org') || email.endsWith('.edu')
    //         || email.endsWith('.gov')))) {
    //         setVerifiedEmail(true);
    //         setEmailError('Please enter a valid email');
    //         return false;
    //     } else {
    //         setVerifiedEmail(false);
    //         setEmailError('');
    //         return true;
    //     }
    // }

    function verifyPassword() {
        if (!fieldNotEmpty()) {
            setVerifiedPassword(false);
            setPasswordError('Please enter a password');
            return false;
        } else {
            setVerifiedPassword(true);
            setPasswordError('');
            return true;
        }
    }
    
    return(
        <div className='init-background'>
            <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Form noValidate>
                    <h1
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>Login</h1>
                    <br></br>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label 
                        style={{
                            color: "white",
                            textShadow: "2px 2px 4px #000000",
                        }}>Username: </Form.Label>
                        <Form.Control
                        type="username"
                        placeholder="Username"
                        value={username}
                        isInvalid={!verifiedUsername}
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
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label 
                        style={{
                            color: "white",
                            textShadow: "2px 2px 4px #000000",
                        }}>Password: </Form.Label>
                        <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        isInvalid={!verifiedPassword}
                        onChange={(p) => setPassword(p.target.value)}/>
                        <Form.Control.Feedback type="invalid"
                            style={{
                                color: "white",
                                textShadow: "2px 2px 4px #FF0000",
                            }}>
                            {passwordError}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br></br>
                    <Alert show={alertVisible} variant="danger"
                    style={{
                        width: "300px",
                        display: "block",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "red"
                    }}>
                        {alertError}
                        <br></br>
                    </Alert>
                    <Col
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Link to="/signup" className="mx-1">
                            <Button variant="primary">Sign Up</Button>
                        </Link>
                        <Button variant="primary" type="submit"
                        className="mx-1" onClick={handleSubmit}>
                            Login
                        </Button>
                    </Col>
                </Form>
            </div>
        </div>
    )
}

export default Login;