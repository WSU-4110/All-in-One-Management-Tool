import '../stylesheets/todolistpagestyles.css';
import '../stylesheets/backgroundstyles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
export const REMOVE_TODO = 'REMOVE_TODO';

export const removeTodo = index => ({
  type: REMOVE_TODO,
  index
});

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo } from './actions';

export default function Todolist() {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    const handleRemoveItem = (index) => {
        dispatch(removeTodo(index));
    };

    return (
        <div className='home-background'>
            <Header />
            <div className='todolist-grid'>
                <div className="title-div">
                    <p className="title-text">TO DO LIST</p>
                </div>
                <div className="todolist-mainbody">
                    <div className="todolist-background">
                        {/* ... */}
                        <div className="List">
                            <ul>
                                {todos.map((value, index) => (
                                    <li key={index} style={{ ...styles }}>
                                        {value.Assignment + "  "} 
                                        {value.Description}
                                        <button
                                            style={{ ...buttonStyles }}
                                            onClick={() => handleRemoveItem(index)}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* ... */}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}