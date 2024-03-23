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
    const nav = useNavigate();

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
                        type="time"
                        placeholder="Time"
                        value={getTime}
                        onChange={(p) => setTime(p.target.value)}/>
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
                            className="mx-1" onClick={getEventInfo}>
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