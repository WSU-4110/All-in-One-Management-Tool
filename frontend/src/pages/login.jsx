import React, { useState } from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../stylesheets/backgroundstyles.css';

async function setSessionVariables(username, password){
    sessionStorage['Username'] = username;
    sessionStorage['Password'] = password;
}

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifiedUsername, setVerifiedUsername] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [verifiedPassword, setVerifiedPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(username);
        console.log(password);
        var data = {}
        var goodUsername = verifyUsername();
        var goodPassword = verifyPassword();

        if (verifyUsername() && verifyPassword()) {
            data = {
                username: username,
                password: password
            }
            setSessionVariables(username, password);
            console.log('Username:', data.username)
            console.log('password:', data.password)
            navigate('/home');
            return;
        }
    }

    function verifyUsername() {
        if (username === '') {
            setVerifiedUsername(true);
            setUsernameError('Please enter a username');
            return false;
        }
        if ((!(username.includes('@'))) && (!(username.includes('.'))) && (username.includes(' '))
            && (!(username.endsWith('.com') || username.endsWith('.net')
            || username.endsWith('.org') || username.endsWith('.edu')
            || username.endsWith('.gov')))) {
            setVerifiedUsername(true);
            setUsernameError('Please enter a valid username');
            return false;
        } else {
            setVerifiedUsername(false);
            setUsernameError('');
            return true;
        }
    }

    function verifyPassword() {
        if (password === '') {
            setVerifiedPassword(true);
            setPasswordError('Please enter a password');
            return false;
        } else {
            setVerifiedPassword(false);
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
                    isInvalid={verifiedUsername}
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
                    isInvalid={verifiedPassword}
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
                <Col
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Button variant="primary" type="submit"
                    className="mx-1" onClick={handleSubmit}>
                        Login
                    </Button>
                    <Link to="/signup" className="mx-1">
                        <Button variant="primary">Sign Up</Button>
                    </Link>
                </Col>

            </Form>
        </div>
    </div>
    )
}

export default Login;