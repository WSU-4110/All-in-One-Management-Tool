const initialState = {
    todos: JSON.parse(localStorage.getItem('eventInfo')) || []
  };
  
  function todosReducer(state = initialState, action) {
    switch (action.type) {
      case REMOVE_TODO:
        const newTodos = [...state.todos];
        newTodos.splice(action.index, 1);
        localStorage.setItem('eventInfo', JSON.stringify(newTodos));
        return {
          ...state,
          todos: newTodos
        };
      default:
        return state;
    }
  }
  
  export default todosReducer;