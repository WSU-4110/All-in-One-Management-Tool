import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../stylesheets/backgroundstyles.css';

export const SignUp = (props) => {
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [terms, setTerms] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPassordError] = useState('');
    const [verifiedUsername, setVerifiedUsername] = useState(false);
    const [verifiedPassword, setVerifiedPassword] = useState(false);
    const [verifiedTerms, setVerifiedTerms] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(username);
        console.log(password1);
        if (!terms) { 
            setVerifiedTerms(true);
        } else {
            setVerifiedTerms(false);
        }
        var data = {};
        if (checkPassword()){
            console.log(data)
            if (data['AccountCreate'] == "True"){
                navigate('/login');
            }
            else {
                setUsernameError('Username already in use. Select new username.');
                setVerifiedUsername(true);
            }
        }
        else {
            setPassordError('Invalid Password. Please enter a new password.');
            setVerifiedPassword(true);
        }
    }

    function checkPassword() {
        if ((checkPasswordsMatch())
            && (checkPasswordLength())
            && (terms))
            {
            console.log(username);
            console.log(password1);
            return true
        }
        return false
    }

    function checkPasswordsMatch() {
        if (password1 !== password2) {
            setVerifiedPassword(true);
            return false;
        }
        return true;
    }

    function checkPasswordLength() {
        if (password1.length > 7) {
            return true;
        }
        setVerifiedPassword(true);
        setPassordError('Password too short');
        return false;
    }
    
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
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label 
                        style={{
                            color: "white",
                            textShadow: "2px 2px 4px #000000",
                        }}>Username: </Form.Label>
                        <Form.Control
                            isInvalid={verifiedUsername}
                            type="username"
                            placeholder="Username"
                            value={username}
                            onChange={(u) => setUsername(u.target.value)}/>
                        <Form.Control.Feedback type="invalid"
                        style={{
                            color: "white",
                            textShadow: "2px 2px 4px #000000",
                        }}>
                            {usernameError}
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
                            isInvalid={verifiedPassword}
                            type="password"
                            placeholder="Password"
                            value={password1}
                            onChange={(p) => setPassword1(p.target.value)}/>
                        <Form.Control.Feedback type="invalid"
                        style={{
                            color: "white",
                            textShadow: "2px 2px 4px #000000",
                        }}>
                            {passwordError}
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
                            isInvalid={verifiedPassword}
                            type="password"
                            placeholder="Password"
                            value={password2}
                            onChange={(p) => setPassword2(p.target.value)}/>
                        <Form.Control.Feedback type="invalid"
                        style={{
                            color: "white",
                            textShadow: "2px 2px 4px #000000",
                        }}>
                            {passwordError}
                        </Form.Control.Feedback>
                        <h4 style={{
                            width: '300px',
                        }}>Password must be at least
                             8 characters long, contain a capital letter,
                              a number, and have no spaces.</h4>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                        type="checkbox"
                        isInvalid={verifiedTerms}
                        label="I agree to the terms and conditions"
                        value={terms}
                        onChange={() => setTerms(!terms)}
                        style={{width: '280px', color: 'white', textShadow: '2px 2px 4px #000000'}}
                        />
                        <br></br>
                        <Form.Control.Feedback type="invalid"  
                        style={{
                            color: "white",
                            textShadow: "2px 2px 4px #FF0000",
                        }}>
                            You must agree to the terms and conditions
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br></br>
                    <Col
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Link to="/" className="NavButtons">
                            <Button variant="primary">Back</Button>
                        </Link>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Sign Up
                        </Button>
                    </Col>
                </Form>
            </div>
        </div>
    )
}

export default SignUp;