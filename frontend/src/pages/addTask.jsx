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
    const [getTime, setTime] = useState("");
    const [getDescription, setDescription] = useState("");
    const [validClass, setValidClass] = useState(true);
    const [validAssignment, setValidAssignment] = useState(true);
    const [validDueDate, setValidDueDate] = useState(true);
    const [validTime, setValidTime] = useState(true);
    const navigate = useNavigate();

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
        if (getTime === "") {
            setValidTime(false);
        } else {
            setValidTime(true);
        }
        if (getClass === "" || getAssignment === "" || getDueDate === "" || getTime === "") {
            return false;
        }
        return true;
    }

    // async function getEventInfo(e) {
    //     e.preventDefault();
    //     if (checkForEmpty()) {
    //         let Info = JSON.parse(localStorage.getItem('eventInfo'));

    //         if (Info === null) {
    //             Info = [];
    //         }

    //         const newEvent = 
    //         {
    //             class: getClass,
    //             Assignment: getAssignment,
    //             DueDate: getDueDate,
    //             Description: getDescription,

    //         };
            
    //         Info.push(newEvent);
    //         localStorage.setItem('eventInfo', JSON.stringify(Info));

    //         console.log(Info);
    //         navigate('/todolist');
    //     }
    // }

    async function handleSubmit(e) {
        e.preventDefault();
        if (checkForEmpty()) {
            const newTask = {
                class: getClass,
                Assignment: getAssignment,
                DueDate: getDueDate,
                Time: getTime,
                Description: getDescription,
            };
            if (sessionStorage["Tasks"] === undefined || sessionStorage["Tasks"] === null || sessionStorage["Tasks"] === "") {
                sessionStorage["Tasks"] = JSON.stringify(newTask);
            } else {
                sessionStorage["Tasks"] = sessionStorage["Tasks"] + "," + JSON.stringify(newTask);
            }
            // sessionStorage.setItem('Tasks', JSON.stringify(...sessionStorage['Tasks'], newTask));

            // Replaces existing user information in the database with new
            // information entered by the user using the 'edit' server route.
            try {
                const response = await fetch(
                    `http://localhost:5050/record/edit`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                },
                    body: JSON.stringify(
                        { username: sessionStorage["Username"],
                            email: sessionStorage["Email"],
                            password: sessionStorage["Password"],
                            notifications: sessionStorage["Notifications"],
                            locations: sessionStorage["Locations"],
                            tasks: sessionStorage["Tasks"],
                            events: sessionStorage["Events"] }),
                });
                // Checks whether the fetch operation was successful.
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    console.log('Record modified successfully');
                    navigate("/home");
                }
            // Catches any errors that occur during the fetch operation.
            } catch (error) {
                console.error(
                    'A problem occurred with your fetch operation: ', error);
            }
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
                        }}>Add Task</h1>
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
                            }}>Deadline Date: </Form.Label>
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
                                Please enter a deadline date
                            </Form.Control.Feedback>
                        </Form.Group>
                        <br></br>
                        <Form.Label 
                            style={{
                                color: "white",
                                textShadow: "2px 2px 4px #000000",
                            }}>Deadline Time:
                        </Form.Label>
                        <Form.Control
                        isInvalid={!validTime}
                        type="time"
                        placeholder="Time"
                        value={getTime}
                        onChange={(p) => setTime(p.target.value)}/>
                        <Form.Control.Feedback type="invalid"
                            style={{
                                color: "red",
                                textShadow: "2px 2px 4px #000000",
                            }}>
                            Please enter a deadline time
                        </Form.Control.Feedback>
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
                        <Col
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Button variant="primary" type="submit"
                            className="mx-1" onClick={(e) => handleSubmit(e)}>
                                Create Task
                            </Button>
                        </Col>
                    </Form>
                </div>
                <Footer />
            </div>
        </div>
    )
}