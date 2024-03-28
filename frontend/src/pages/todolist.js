import '../stylesheets/todolistpagestyles.css';
import '../stylesheets/backgroundstyles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import checkmarkimage from '../images/checkmark.png';
import trashicon from '../images/trashicon.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
 
export default function Todolist() {
    const [todos, setTodos] = useState([]);
    const [containsEvents, setContainsEvents] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        let events = [];
        let tasks = [];

        // Fetch events and tasks from sessionStorage, if available
        const storedEvents = sessionStorage.getItem('Events');
        const storedTasks = sessionStorage.getItem('Tasks');

        console.log(storedEvents + "events part");
        console.log(storedTasks + "tasks part");

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
        const newTodos = [...todos];
        newTodos.splice(i, 1);
        setTodos(newTodos);
        sessionStorage.setItem('Events', JSON.stringify(newTodos));

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
                    <div className='list'>
                        {containsEvents && todos.map((value, index) => {
                            return <div key = {index} className='list-item'>
                                <div className='left-side'> 
                                    <img className='checkmark-image' src={checkmarkimage} />
                                    <div className='Assignment-section'>
                                        <p className='assignment-text'> {value.Assignment ? value.Assignment : value.name} </p>
                                        <p className='class-text'> {value.class} </p>
                                        <p className='date-text'>Due {value.DueDate} </p>
                                        <p className='time-text'>By: {value.Time} </p>
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



