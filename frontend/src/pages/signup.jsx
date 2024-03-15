import React, { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../stylesheets/backgroundstyles.css';

export const SignUp = (props) => {
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [terms, setTerms] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [password1Error, setPassword1Error] = useState('');
    const [password2Error, setPassword2Error] = useState('');
    const [verifiedUsername, setVerifiedUsername] = useState(true);
    const [verifiedPassword, setVerifiedPassword] = useState(true);
    const [verifiedTerms, setVerifiedTerms] = useState(false);
    const [alert, setAlert] = useState(false);
    const navigate = useNavigate();
    
    function errormsg(endmsg) {
        this.endmsg = endmsg;
    }
    errormsg.prototype.toString1 = function (){
        return 'Passwords' + this.endmsg;
    }
    errormsg.prototype.toString2 = function (){
        return 'Password must' + this.endmsg;
    }

    useEffect(() => {
        if (username !== '') {
            setVerifiedUsername(true);
        }
        if (password1 !== '') {
            setVerifiedPassword(true);
        }
        if (password2 !== '') {
            setVerifiedPassword(true);
        }
    }, [username, password1, password2]);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(username);
        console.log(password1);
        var data = {};
        if (checkPassword()){
            if (terms) {
                console.log(data)
                navigate('/login');
                // if (data['AccountCreate'] == "True"){
                //     navigate('/login');
                // }
                // else {
                //     setVerifiedUsername(false);
                //     setUsernameError('Username already in use. Select new username.');
                // }
            } else {
                setVerifiedTerms(false);
                setAlert(true);
            }
        }
        else {
            setVerifiedPassword(false);
        }
    }

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

    function checkFieldsNotEmpty() {

        function checkUsernameNotEmpty() {
            if (username === '') {
                setVerifiedUsername(false);
                setUsernameError('Please enter a username');
                return false;
            }
            setVerifiedUsername(true);
            return true;
        }

        function checkPassword1NotEmpty() {
            if (password1 === '') {
                setVerifiedPassword(false);
                setPassword1Error('Please enter a password');
                return false;
            }
            setVerifiedPassword(true);
            return true;
        }

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

        var usernameValid = checkUsernameNotEmpty();
        var password1Valid = checkPassword1NotEmpty();
        var password2Valid = checkPassword2NotEmpty();

        if (usernameValid && password1Valid && password2Valid) {
            return true;
        }
        return false;
    }

    function checkPasswordsMatch() {
        let match = new errormsg(' do not match');

        if (password1 !== password2) {
            setVerifiedPassword(false);
            setPassword1Error(match.toString1());
            setPassword2Error(match.toString1());
            return false;
        }
        setVerifiedPassword(true);
        return true;
    }

    function checkPasswordComplexity() {
        var hasNumber = /\d/;
        var hasUpper = /[A-Z]/;
        var fail = false;
        let number = new errormsg(' contain a number');
        if (!hasNumber.test(password1)) {
            fail = true;
            setVerifiedPassword(false);
            setPassword1Error(number.toString2());
            setPassword2Error(number.toString2());
        }

        let uppercase = new errormsg(' contain an uppercase letter');

        if (!hasUpper.test(password1)) {
            fail = true;
            setVerifiedPassword(false);
            setPassword1Error(uppercase.toString2());
            setPassword2Error(uppercase.toString2());
        }

        let spaces = new errormsg(' not contain spaces');

        if (password1.includes(' ')) {
            fail = true;
            setVerifiedPassword(false);
            setPassword1Error(spaces.toString2());
            setPassword2Error(spaces.toString2());
        }

        let length = new errormsg(' be at least 8 characters long');

        if (password1.length < 8) {
            fail = true;
            setVerifiedPassword(false);
            setPassword1Error(length.toString2());
            setPassword2Error(length.toString2());
        }
        if (!fail) {
            setVerifiedPassword(true);
            return true;
        }
        return false;
    }


    function setCheckedTerms() {
        setTerms(!terms);
        setVerifiedTerms(!verifiedTerms);
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
                        }}>Password must be at least
                             8 characters long, contain a capital letter,
                              a number, and have no spaces.</p>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
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
                        <Alert show={alert} variant="danger"
                        style={{
                            textShadow: "2px 2px 4px #FF0000",
                        }}>
                            You must agree to the terms and conditions
                        </Alert>
                    </Form.Group>
                    <Col
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Link to="/" className='mx-1'>
                            <Button variant="primary">Back</Button>
                        </Link>
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