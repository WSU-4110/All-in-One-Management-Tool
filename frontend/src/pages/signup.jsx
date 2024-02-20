import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Navbar from "../components/Navbar";

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
                props.history.push('/login');
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
        <div>
            <Navbar text="All-In-One Managment Tool"/>
            <div
            style={{
                width: '30%',
                margin: 'auto',
            }} className='center-hor-ver'>
                <Form noValidate>
                    <h1>Sign Up</h1>
                    <br></br>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            isInvalid={verifiedUsername}
                            type="username"
                            placeholder="Username"
                            value={username}
                            onChange={(u) => setUsername(u.target.value)}/>
                        <Form.Control.Feedback type="invalid">
                            {usernameError}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="formBasicPassword1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            isInvalid={verifiedPassword}
                            type="password"
                            placeholder="Password"
                            value={password1}
                            onChange={(p) => setPassword1(p.target.value)}/>
                        <Form.Control.Feedback type="invalid">
                            {passwordError}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="formBasicPassword2">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            isInvalid={verifiedPassword}
                            type="password"
                            placeholder="Password"
                            value={password2}
                            onChange={(p) => setPassword2(p.target.value)}/>
                        <Form.Control.Feedback type="invalid">
                            {passwordError}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="formPasswordRequirements">
                        <Form.Control
                            as='textarea'
                            rows={2}
                            size="sm"
                            defaultValue="Password must be at least
                             8 characters long, contain a capital letter,
                              a number, and have no spaces."
                            readOnly
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                        type="checkbox"
                        isInvalid={verifiedTerms}
                        label="I agree to the terms and conditions"
                        value={terms}
                        onChange={() => setTerms(!terms)}
                        style={{width: '280px'}}
                        />
                        <Form.Control.Feedback type="invalid">
                            You must agree to the terms and conditions
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br></br>
                    <Col>
                        <Button variant="primary" type="submit" onClick={() => props.history.push('/login')}>
                            Back
                        </Button>
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