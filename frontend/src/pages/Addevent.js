import '../stylesheets/addeventstyles.css';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Form from 'react-bootstrap/Form.js';
import Button from 'react-bootstrap/Button.js';
import Col from "react-bootstrap/Col.js";
import Dropdown from 'react-bootstrap/Dropdown.js';
import DropdownButton from 'react-bootstrap/DropdownButton.js';

export default function Addevent() {
    const [getName, setName] = useState("");
    const [getDueDate, setDueDate] = useState("");
    const [getDescription, setDescription] = useState("");
    const [getLocation, setLocation] = useState("Select A Location");
    const [locations, setLocations] = useState([]);
    const [validName, setValidName] = useState(true);
    const [validDueDate, setValidDueDate] = useState(true);
    const navigate = useNavigate();

    function checkForEmpty() {
        if (getName === "") {
            setValidName(false);
        } else {
            setValidName(true);
        }
        if (getDueDate === "") {
            setValidDueDate(false);
        } else {
            setValidDueDate(true);
        }
        if (getName === "" || getDueDate === "") {
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
    //             name: getName,
    //             DueDate: getDueDate,
    //             Description: getDescription,

    //         };
            
    //         Info.push(newEvent);
    //         localStorage.setItem('eventInfo', JSON.stringify(Info));

    //         console.log(Info);
    //         navigate('/todolist');
    //     }
    // }

    // Function to list the locations in the session storage
    // into the locations array.
    const locationsList = () => {
        const locationsArray = sessionStorage["Locations"].split(',');
        console.log(locationsArray);
        for (var i = 0; i < locationsArray.length; i++) {
            if (locationsArray[i] !== ''
                && locationsArray[i] !== undefined) {
                    if(!locations.includes(locationsArray[i])){
                        locations.push(locationsArray[i]);
                    }
            }
        }
        console.log("locationsList: " + locations);
        return locations;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (checkForEmpty()) {
            if (getLocation === "Select A Location") {
                setLocation("None");
            }
            // const newEvent = {
            //     name: getName,
            //     DueDate: getDueDate,
            //     Description: getDescription,
            //     Location: getLocation,
            // };
            // const eventsList = [];
            // if (sessionStorage["Events"] === undefined || sessionStorage["Events"] === null || sessionStorage["Events"] === "") {
            //     eventsList.push(JSON.stringify(newEvent));
            //     // sessionStorage["Events"] = JSON.stringify(newEvent);
            // } else {
            //     for (var i = 0; i < JSON.parse(sessionStorage["Events"]).length; i++) {
            //         eventsList.push(JSON.parse(sessionStorage["Events"])[i]);
            //     }
            //     console.log(eventsList);
            //     // JSON.parse(sessionStorage["Events"])
            //     eventsList.push(newEvent);
            //     console.log(eventsList);
            //     // sessionStorage["Events"] = sessionStorage["Events"] + "," + JSON.stringify(newEvent);
            // }
            // sessionStorage.setItem('Events', JSON.stringify([...sessionStorage["Events"], newEvent]));

            let Info;
            try{
                Info = JSON.parse(sessionStorage.getItem('Events'));
            } catch {
                Info = []
            }

            // if (Info === null) {
            //     Info = [];
            // }

            const newEvent = {
                name: getName,
                DueDate: getDueDate,
                Description: getDescription,
                Location: getLocation,
            };
            
            Info.push(newEvent);
            sessionStorage.setItem('Events', JSON.stringify(Info));
            console.log(Info);

            // let locationsDB;
            let tasksDB;
            let eventsDB;
            // try {
            //     locationsDB = JSON.parse(sessionStorage["Locations"]);
            // } catch {
            //     locationsDB = [];
            // }
            // try {
            //     tasksDB = JSON.parse(sessionStorage["Tasks"]);
            // } catch {
            //     tasksDB = [];
            // }
            // try {
            //     eventsDB = JSON.parse(sessionStorage["Events"]);
            // } catch {
            //     eventsDB = [];
            // }
            
            tasksDB = sessionStorage["Tasks"];
            eventsDB = sessionStorage["Events"];
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
                            tasks: tasksDB,
                            events: eventsDB }),
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
                    <div className='Addevent-mainbody'
                        style={{
                            padding: "2em",
                        }}>
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
                            }}>Event Name: </Form.Label>
                            <Form.Control
                            type="input"
                            placeholder="Event Name"
                            value={getName}
                            isInvalid={!validName}
                            onChange={(u) => setName(u.target.value)}/>
                            <Form.Control.Feedback type="invalid"
                                style={{
                                    color: "red",
                                    textShadow: "2px 2px 4px #000000",
                                }}>
                                Please enter an event name
                            </Form.Control.Feedback>
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label 
                            style={{
                                color: "white",
                            }}>Date: </Form.Label>
                            <Form.Control
                            type="date"
                            placeholder="Date"
                            value={getDueDate}
                            isInvalid={!validDueDate}
                            onChange={(p) => setDueDate(p.target.value)}/>
                            <Form.Control.Feedback type="invalid"
                                style={{
                                    color: "red",
                                    textShadow: "2px 2px 4px #000000",
                                }}>
                                Please enter a date
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
                        <Form.Label 
                            style={{
                                color: "white",
                                textShadow: "2px 2px 4px #000000",
                            }}>Location: </Form.Label>
                        <DropdownButton title={getLocation}
                            style={{
                                marginTop: "-1em",
                                width: "100%",
                                }}>
                                {(locationsList() !== undefined)
                                    && (locations.length !== 0) && (
                                    <ul>
                                        {locations && locations.map
                                            && locations.map((location) => (
                                            <Dropdown.Item
                                                onClick={
                                                    () => setLocation(location)}
                                                >
                                                {location}
                                            </Dropdown.Item>
                                        ))}
                                    </ul>)}
                                    <Dropdown.Item
                                        onClick={() => setLocation("None")}
                                        style={{
                                            color: "red",
                                            width: "100%",
                                        }}>
                                            None
                                        </Dropdown.Item>
                        </DropdownButton>
                        <p style={{
                            color: "white",
                            fontSize: "0.8em",
                            marginTop: "0.3em",
                        }}>*Location not required</p>
                        <br></br>
                        <Col
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Button variant="primary" type="submit"
                            className="mx-1" onClick={(e) => handleSubmit(e)}>
                                Create Event
                            </Button>
                        </Col>
                    </Form>

                </div>
                <Footer />
            </div>
        </div>
    )
}