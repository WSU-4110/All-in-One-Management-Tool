import '../stylesheets/addeventstyles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function Addevent() {
    const [getClass, setClass] = useState("");
    const [getAssignment, setAssignment] = useState("");
    const [getDueDate, setDueDate] = useState("");
    const [getDescription, setDescription] = useState("");

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

    function getEventInfo() {
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
    }

    return (
        <div className="home-outer">
            <div className="home-background" />
                <div className="home-inner">
                    <Header />
                    <div className='Addevent-mainbody'>
                        <div className = 'Addevent-title'>
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
                        </div>
                    </div>
                    <Footer />
                </div>
        </div>
    )
}