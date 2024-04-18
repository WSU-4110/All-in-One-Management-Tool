import '../stylesheets/todolistpagestyles.css';
import '../stylesheets/backgroundstyles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import checkmarkimage from '../images/checkmark.png';
import trashicon from '../images/trashicon.png';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
 
export default function Todolist() {
    const [todos, setTodos] = useState([]);
    const [containsEvents, setContainsEvents] = useState(true);
    const navigate = useNavigate();

    const verification = () => {
        try {
            if (sessionStorage['Username'] != null && sessionStorage['Username'] != "") {
                console.log("User Successfully Authenticated");
            } else {
                navigate("/login");
            }
        } catch {
            navigate("/login");
        }
    }

    verification();
    
    useEffect(() => {
        let events = [];
        let tasks = [];
        let storedEvents = '';
        let storedTasks = '';

        // Fetch events and tasks from sessionStorage, if available
        try {
            storedEvents = sessionStorage.getItem('Events');
            storedTasks = sessionStorage.getItem('Tasks');
        } catch {
            navigate('/login');
        }

        // console.log(storedEvents + "events part");
        // console.log(storedTasks + "tasks part");

        if (storedEvents) {
            events = JSON.parse(storedEvents);
        }
        
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        }
    
        if (events.length === 0 && tasks.length === 0) {
            setContainsEvents(false);
        } else {
            setTodos([...events, ...tasks]); // Combine events and tasks into one array
        }
    }, []);


    async function removeItem(i) {
        const newTodos = todos.filter((_, index) => index !== i);
        setTodos(newTodos);
        // const newTodos = todos.filter((_, index) => index !== i);
        // setTodos(newTodos);
        // todos.map((value, index) => {
        //     if (index === i) {
        //         if (value.Assignment) {
        //             sessionStorage.setItem('Tasks', JSON.stringify(value));
        //         } else {
        //             sessionStorage.setItem('Events', JSON.stringify(value));
        //         }
        //     }
        // });
        // sessionStorage.setItem('Events', JSON.stringify(newTodos));
        // const newTodos = [...todos];
        // newTodos.splice(i, 1);
        // setTodos(newTodos);
        // sessionStorage.setItem('Events', JSON.stringify(newTodos));

            // // Replaces existing user information in the database with new
            // // information entered by the user using the 'edit' server route.
            // try {
            //     const response = await fetch(
            //         `http://localhost:5050/record/edit`, {
            //         method: "PATCH",
            //         headers: {
            //             "Content-Type": "application/json",
            //     },
            //         body: JSON.stringify(
            //             { username: sessionStorage["Username"],
            //                 email: sessionStorage["Email"],
            //                 password: sessionStorage["Password"],
            //                 notifications: sessionStorage["Notifications"],
            //                 locations: sessionStorage["Locations"],
            //                 tasks: sessionStorage["Tasks"],
            //                 events: sessionStorage["Events"] }),
            //     });
            //     // Checks whether the fetch operation was successful.
            //     if (!response.ok) {
            //         throw new Error(`HTTP error! status: ${response.status}`);
            //     } else {
            //         console.log('Record modified successfully');
            //         navigate("/home");
            //     }
            // // Catches any errors that occur during the fetch operation.
            // } catch (error) {
            //     console.error(
            //         'A problem occurred with your fetch operation: ', error);
            // }
    }

    return (
        <div className='home-outer'>
            <div className='home-background'> Hello</div>
                <div className='home-inner'>
                    <Header />
                    <div className='todolist-grid'>
                        <div className ="title-div">
                            <p className = "title-text">
                                TO DO LIST 
                            </p>
                    </div>
                    <div className='list'
                        style={{
                            padding: "2em",
                        }}>
                        {containsEvents && todos.map((value, index) => {
                            return <div key = {index} className='list-item'>
                                <div className='left-side'> 
                                    <img className='checkmark-image' src={checkmarkimage} />
                                    <div className='Assignment-section'>
                                        <p className='assignment-text'> {value.Assignment ? value.Assignment : value.name} </p>
                                        <p className='class-text'> {value.class} </p>
                                        <p className='date-text'> {value.DueDate} </p>
                                    </div>
                                </div>

                                <div className='right-side'>
                                <button onClick={() => removeItem(index)}className='trash-button'>
                                    <img className='trash-icon' src={trashicon} />
                                    </button>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className='add-event-button'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    
                    }}>
                        <Button variant="primary" onClick={() => navigate('/addevent')}>Add Event</Button>
                    </div>
                </div>
            <Footer />
                
            </div>
        </div>
    )
}



