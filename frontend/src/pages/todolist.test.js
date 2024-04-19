// Mock sessionStorage
const mockSessionStorage = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });

function getTodosFromStorage() {
  const events = sessionStorage.getItem('Events') ? JSON.parse(sessionStorage.getItem('Events')) : [];
  const tasks = sessionStorage.getItem('Tasks') ? JSON.parse(sessionStorage.getItem('Tasks')) : [];
  return [...events, ...tasks];
}

function saveTodosToStorage(todos) {
  sessionStorage.setItem('Events', JSON.stringify(todos));
}

function removeTodoAtIndex(todos, index) {
  const newTodos = [...todos];
  newTodos.splice(index, 1);
  return newTodos;
}

test('getTodosFromStorage retrieves todos from sessionStorage', () => {
  const todos = [{ name: 'todo1' }, { name: 'todo2' }];
  sessionStorage.setItem('Events', JSON.stringify(todos));
  expect(getTodosFromStorage()).toEqual(todos);
});

test('saveTodosToStorage saves todos to sessionStorage', () => {
  const todos = [{ name: 'todo1' }, { name: 'todo2' }];
  saveTodosToStorage(todos);
  expect(sessionStorage.getItem('Events')).toEqual(JSON.stringify(todos));
});

test('removeTodoAtIndex removes the correct todo', () => {
  const todos = [{ name: 'todo1' }, { name: 'todo2' }, { name: 'todo3' }];
  const newTodos = removeTodoAtIndex(todos, 1);
  expect(newTodos).toEqual([{ name: 'todo1' }, { name: 'todo3' }]);
});

test('Removing all items should result in an empty list', () => {
  const todos = [{ name: 'todo1' }];
  sessionStorage.setItem('Events', JSON.stringify(todos));
  const newTodos = removeTodoAtIndex(todos, 0);
  expect(newTodos.length).toBe(0);
});

test('Removing an item from an empty list should do nothing', () => {
  const todos = [];
  const newTodos = removeTodoAtIndex(todos, 0);
  expect(newTodos.length).toBe(0);
});

function addTodoAtIndex(todos, todo, index) {
  const newTodos = [...todos];
  newTodos.splice(index, 0, todo);
  return newTodos;
}

test('Adding an item should correctly update the list', () => {
  const todos = [{ name: 'todo1' }, { name: 'todo2' }];
  const newTodo = { name: 'todo3' };
  const updatedTodos = addTodoAtIndex(todos, newTodo, 1);
  expect(updatedTodos).toContainEqual(newTodo);
  expect(updatedTodos.length).toBe(3);
});