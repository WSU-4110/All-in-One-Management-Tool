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
        if (username === '' && password === '') {
            setVerifiedUsername(true);
            setVerifiedPassword(true);
            setUsernameError('Please enter a username');
            setPasswordError('Please enter a password');
            return;
        } else if (username === '') {
            setVerifiedUsername(true);
            setUsernameError('Please enter a username');
            return;
        } else if (password === '') {
            setVerifiedPassword(true);
            setPasswordError('Please enter a password');
            return;
        } else {
            setSessionVariables(username, password);
            console.log('Username:', username)
            console.log('password:', password)
            navigate('/home');
            return;
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
                    <Link to="/signup" className="NavButtons">
                        <Button variant="primary">Sign Up</Button>
                    </Link>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Login
                    </Button>
                </Col>

            </Form>
        </div>
    </div>
    )
}

export default Login;