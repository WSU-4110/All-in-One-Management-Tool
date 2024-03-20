import '../stylesheets/todolistpagestyles.css';
import '../stylesheets/backgroundstyles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import checkmarkimage from '../images/checkmark.png';
import trashicon from '../images/trashicon.png';
import { useState, useEffect } from 'react';
 
export default function Todolist() {
    const [todos, setTodos] = useState([]);
    const Eventobj = JSON.parse(localStorage.getItem('eventInfo'));

    useEffect(() => {
        const eventInfo = JSON.parse(localStorage.getItem('eventInfo')) || [];
        setTodos(eventInfo);
      }, []);

     function removeItem(i) {
        const newTodos = [...todos];
        newTodos.splice(i, 1);
        setTodos(newTodos);
        localStorage.setItem('eventInfo', JSON.stringify(newTodos));
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
                    {Eventobj.map((value, index) => {
                        return <div key = {index} className='list-item'>
                            <div className='left-side'> 
                                <img className='checkmark-image' src={checkmarkimage} />
                                <div className='Assignment-section'>
                                    <p className='assignment-text'> {value.Assignment} </p>
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
                </div>
            <Footer />
                
            </div>
        </div>
    )
}



