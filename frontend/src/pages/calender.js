import React, { useState, useEffect } from 'react';
import '../stylesheets/calenderpagestyles.css';
import '../stylesheets/backgroundstyles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const generateCalendarDays = (year, month) => {
    const days = [];
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null); 
    }
    
    let date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    
    return days;
  };

export default function Calendar() {
    const [Classtoevent, setClasstoevent] = useState('');
    const [Assigmenttoevent, setAssignmenttoevent] = useState('');
    const [Duedatetoevent, setDuedatetoevent] = useState('');
    const [isEventVisible, setisEventVisible] = useState(0);
    const [Descriptiontoevent, setDescriptiontoevent] = useState('');
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [calendarDays, setCalendarDays] = useState(generateCalendarDays(currentYear, currentMonth));

    const isToday = (someDate) => {
        const today = new Date();
        return someDate.getDate() === today.getDate() &&
               someDate.getMonth() === today.getMonth() &&
               someDate.getFullYear() === today.getFullYear();
      };

    const goToNextMonth = () => {
        let newMonth;
        let newYear;
        
        if (currentMonth === 11) {
            newMonth = 0;
            newYear = currentYear + 1;
        } else {
            newMonth = currentMonth + 1;
            newYear = currentYear;
        }
        
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
        setCalendarDays(generateCalendarDays(newYear, newMonth));
    };

    const goToPreviousMonth = () => {
        let newMonth;
        let newYear;
        
        if (currentMonth === 0) {
            newMonth = 11;
            newYear = currentYear - 1;
        } else {
            newMonth = currentMonth - 1;
            newYear = currentYear;
        }
        
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
        setCalendarDays(generateCalendarDays(newYear, newMonth));
    };


    function checkForEvent(day) {
        const events = sessionStorage.getItem('Events') ? JSON.parse(sessionStorage.getItem('Events')) : [];
        
        return events.some(event => {
            const eventDate = new Date(event.DueDate);
            return eventDate.getDate() === (day.getDate() - 1) &&
                   eventDate.getMonth() === day.getMonth() &&
                   eventDate.getFullYear() === day.getFullYear();
        });
    }

    function addEventDetails(day) {
        const events = sessionStorage.getItem('Events') ? JSON.parse(sessionStorage.getItem('Events')) : [];
        
        const eventForDay = events.find(event => {
            const eventDate = new Date(event.DueDate);
            return eventDate.getDate() === (day.getDate() - 1) &&
                   eventDate.getMonth() === day.getMonth() &&
                   eventDate.getFullYear() === day.getFullYear();
        });

        if (eventForDay) {
            setClasstoevent(eventForDay.name); 
            setAssignmenttoevent(eventForDay.Location); 
            setDuedatetoevent(eventForDay.DueDate);
            setDescriptiontoevent(eventForDay.Description);
            setisEventVisible(1);
        }
    }

    useEffect(() => {
        setCalendarDays(generateCalendarDays(currentYear, currentMonth));
    }, [currentYear, currentMonth]);
    
    const firstDate = calendarDays.find(day => day instanceof Date);
    let monthName = ' ';

    if (firstDate) {
        monthName = firstDate.toLocaleString('default', { month: 'long' });
    }

    return (
        <div className='home-outer'>
            <div className='home-background' />
            <div className='home-inner'>
                <Header />
                <div className="mainbody-grid">
                    <div className="title-div">
                        <p className="title-text">CALENDAR</p>
                    </div>
                    
                    <div className="Calendar-header"> 
                        <button className="Arrow-Left" onClick={goToPreviousMonth}> &larr; </button>
                        <p className="Month-Text">{monthName}</p>
                        <button className="Arrow-Right" onClick={goToNextMonth}> &rarr; </button>
                    </div>
    
                    <div className="Calendar-main-body">
                        <div className="M-SGrid">
                            <p className="M-SText">S</p>
                            <p className="M-SText">M</p>
                            <p className="M-SText">T</p>
                            <p className="M-SText">W</p>
                            <p className="M-SText">T</p>
                            <p className="M-SText">F</p>
                            <p className="M-SText">S</p>
                        </div>
    
                        <div className="Dates-grid"> 
                            {calendarDays.map((day, index) => {
                                if (day) {
                                    let className = "DateButton";
                                    if (isToday(day)) {
                                        className += " Today";
                                    } else if (checkForEvent(day)) {
                                        className += " Event";
                                    }
    
                                    return (
                                        <button key={index} onClick={() => addEventDetails(day)}
                                            className={className}>
                                            {day.getDate()}
                                        </button>
                                    );
                                } else {
                                    return <button key={index} className="EmptyButton"></button>;
                                }
                            })}
                        </div>
                    </div>
                </div>
    
                {isEventVisible ? (
                    <div className='show-event'>
                        <div className='Class-section'>
                            Event Name: 
                            <span style={{ color: 'rgba(255, 255, 255, 0.7)', marginLeft: '10px', fontSize: '20px', fontStyle: 'italic' }}>
                                {Classtoevent}
                            </span> 
                        </div>
                        <div className='Assignment-section'>
                            Location: 
                            <span style={{ color: 'rgba(255, 255, 255, 0.7)', marginLeft: '10px', fontSize: '20px', fontStyle: 'italic' }}>
                                {Assigmenttoevent}
                            </span> 
                        </div>
                        <div className='date-section'>
                            Due Date: 
                            <span style={{ color: 'rgba(255, 255, 255, 0.7)', marginLeft: '10px', fontSize: '20px', fontStyle: 'italic' }}>
                                {Duedatetoevent}
                            </span> 
                        </div>
                        <div className='description'>
                            Description: 
                            <span style={{ color: 'rgba(255, 255, 255, 0.7)', marginLeft: '10px', fontSize: '15px', fontStyle: 'italic' }}>
                                {Descriptiontoevent}
                            </span>
                        </div>
                    </div>
                ) : null}
    
                <Footer />
            </div>
        </div>
    );
    
}
