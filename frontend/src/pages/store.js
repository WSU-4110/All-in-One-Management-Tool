import { createStore } from 'redux';
import todosReducer from './reducer';

const store = createStore(todosReducer);

export default store;