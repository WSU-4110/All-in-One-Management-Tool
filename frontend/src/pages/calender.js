import React, { useState } from 'react';
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
                                let style = {};

                                if (isToday(day)) {
                                    style = { 
                                        background: 'linear-gradient(to bottom right, rgb(0, 162, 255), rgb(44, 44, 57))',
                                        color: 'white' };
                                    className += " Today";
                                }
                                return <button key={index} className="DateButton" style={style}>{day.getDate()}</button>;
                            } else {
                                return <button key={index} className='EmptyButton'></button>;
                            }
                        })}
                        </div>
                    </div>
            </div>
            <Footer />
            </div>
      </div>
    );
}
