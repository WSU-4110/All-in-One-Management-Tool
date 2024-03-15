import '../stylesheets/todolistpagestyles.css';
import '../stylesheets/backgroundstyles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
        <div className='home-background'>
            <Header />
            <div className='todolist-grid'>
                <div className ="title-div">
                    <p className = "title-text">
                        TO DO LIST
                    </p>
                </div>
                <div className ="todolist-mainbody">
                    <div className="todolist-background">
                        <div className="clipboard"></div>
                        <div className="clipboard-circle"></div>
                        <div className ="Shadow-effect">
                            <div className ="center-title">
                                <p className="todolist-title">
                                TO DO
                                </p>
                            </div>
                            <div className="List">
                                <ul>
                                    {Eventobj.map((value, index) => {
                                        return <><li key = {index} style= {{
                                           fontSize: '20px',
                                           display: 'flex',
                                           flexDirection: 'row',
                                           alignItems: 'center',
                                        }}>  
                                        {value.Assignment + "  "} 
                                        {value.Description} <button style = {{
                                            marginTop: '0px',
                                            marginLeft: '35px',
                                            backgroundColor: 'red'
                                        }} onClick={() => removeItem(index)}></button> </li> </>;
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}