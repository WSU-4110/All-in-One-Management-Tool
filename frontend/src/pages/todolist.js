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
                    <div className='List'>
                            {Eventobj.map((value, index) => {
                                return <><div className='item' key = {index} style= {{
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
                                }} onClick={() => removeItem(index)}></button> </div> </>;
                            })}
                        </div>
                </div>
                <Footer />
            </div>
            
        </div>
    )
}

/*                                 <ul>
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
*/