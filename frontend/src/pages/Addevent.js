import '../stylesheets/addeventstyles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";

export default function Addevent() {
    const [getClass, setClass] = useState("");
    const [getAssignment, setAssignment] = useState("");
    const [getDueDate, setDueDate] = useState("");
    const [getDescription, setDescription] = useState("");
    const [validClass, setValidClass] = useState(true);
    const [validAssignment, setValidAssignment] = useState(true);
    const [validDueDate, setValidDueDate] = useState(true);

    const nav = useNavigate();

    function changeClass(e) {
        e.preventDefault();
        setClass(e.target.value);
    }

    function changeAssigment(e) {
        e.preventDefault();
        setAssignment(e.target.value);
    }

    function changeDueDate(e) {
        e.preventDefault();
        setDueDate(e.target.value);
    }

    function changeDescription(e) {
        e.preventDefault();
        setDescription(e.target.value);
    }

    function checkForEmpty() {
        if (getClass === "") {
            setValidClass(false);
        } else {
            setValidClass(true);
        }
        if (getAssignment === "") {
            setValidAssignment(false);
        } else {
            setValidAssignment(true);
        }
        if (getDueDate === "") {
            setValidDueDate(false);
        } else {
            setValidDueDate(true);
        }
        if (getClass === "" || getAssignment === "" || getDueDate === "") {
            return false;
        }
        return true;
    }

    async function getEventInfo(e) {
        e.preventDefault();
        if (checkForEmpty()) {
            let Info = JSON.parse(localStorage.getItem('eventInfo'));

            if (Info === null) {
                Info = [];
            }

            const newEvent = 
            {
                class: getClass,
                Assignment: getAssignment,
                DueDate: getDueDate,
                Description: getDescription,

            };
            
            Info.push(newEvent);
            localStorage.setItem('eventInfo', JSON.stringify(Info));

            console.log(Info);
            nav('/todolist');
        }
    }

    return (
        <div className="home-outer">
            <div className="home-background" />
                <div className="home-inner">
                    <Header />
                    <div className='Addevent-mainbody'>
                        <Form noValidate>
                        <h1
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>Add Event</h1>
                        <br></br>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label 
                            style={{
                                color: "white",
                            }}>Class: </Form.Label>
                            <Form.Control
                            type="input"
                            placeholder="Class"
                            value={getClass}
                            isInvalid={!validClass}
                            onChange={(u) => setClass(u.target.value)}/>
                            <Form.Control.Feedback type="invalid"
                                style={{
                                    color: "red",
                                    textShadow: "2px 2px 4px #000000",
                                }}>
                                Please enter a class
                            </Form.Control.Feedback>
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label 
                            style={{
                                color: "white",
                            }}>Assignment: </Form.Label>
                            <Form.Control
                            type="input"
                            placeholder="Assignment"
                            value={getAssignment}
                            isInvalid={!validAssignment}
                            onChange={(p) => setAssignment(p.target.value)}/>
                            <Form.Control.Feedback type="invalid"
                                style={{
                                    color: "red",
                                    textShadow: "2px 2px 4px #000000",
                                }}>
                                Please enter an assignment
                            </Form.Control.Feedback>
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label 
                            style={{
                                color: "white",
                            }}>Due Date: </Form.Label>
                            <Form.Control
                            type="date"
                            placeholder="Due Date"
                            value={getDueDate}
                            isInvalid={!validDueDate}
                            onChange={(p) => setDueDate(p.target.value)}/>
                            <Form.Control.Feedback type="invalid"
                                style={{
                                    color: "red",
                                    textShadow: "2px 2px 4px #000000",
                                }}>
                                Please enter a due date
                            </Form.Control.Feedback>
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label 
                            style={{
                                color: "white",
                            }}>Description: </Form.Label>
                            <Form.Control
                            type="input"
                            placeholder="Description"
                            value={getDescription}
                            onChange={(p) => setDescription(p.target.value)}/>
                        </Form.Group>
                        <p style={{
                            color: "white",
                            fontSize: "0.8em",
                            marginTop: "0.3em",
                        }}>*Description not required</p>
                        <br></br>
                        <Col
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Button variant="primary" type="submit"
                            className="mx-1" onClick={getEventInfo}>
                                Submit
                            </Button>
                        </Col>
                    </Form>







                        {/* <div className = 'Addevent-title'>
                            <p className = "Addevent-text">ADD EVENT</p>
                        </div>
                        <div className = "form-grid"> 
                            <div className = "form-inputbackground">
                                <div className = "Input-title">
                                    CREATE EVENT
                                </div>
                                <div className = "event-details-grid">
                                    <div className = "titleabove-input">
                                        Class
                                        <form>
                                        <input onChange = {changeClass} type="text" className="actual-box" placeholder="Add your class here" />
                                        </form>
                                    </div>
                                    <div className = "titleabove-input">
                                        Assignment type
                                        <form>
                                        <input onChange = {changeAssigment} type="text" className="actual-box" placeholder="Whats your assignment?" />
                                        </form>
                                    </div>
                                    <div className = "titleabove-input">
                                        Due date
                                        <form>
                                        <input onChange = {changeDueDate} type="date" className="actual-box-date" placeholder="Whens your assignment due?" />
                                        </form>
                                    </div>
                                    <div className = "titleabove-input">
                                        Description
                                        <form>
                                        <input onChange = {changeDescription} type="text" className="actual-box" placeholder="Add a description" />
                                        </form>
                                    </div>
                                </div>
                            <div className = "footer-Button">
                                <button onClick = {getEventInfo} className ="submit-button">
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    </div> */}
                </div>
                <Footer />
            </div>
        </div>
    )
}