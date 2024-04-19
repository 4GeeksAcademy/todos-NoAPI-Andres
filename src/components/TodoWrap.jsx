import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm.jsx';
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo.jsx';

const TodoWrap = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  const addTodo = todo => {
    if (todo.trim() !== "") {
      setTodos(prevTodos => [...prevTodos, {id: uuidv4(), task: todo, completed: false, isEditing: false}]);
    }
  };

  const toggleComplete = id => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo));
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Calcular tareas no completadas
  const uncompletedCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className='TodoWrap'>
      <h1>This is how the day looks</h1>
      <TodoForm addTodo={addTodo}/>
      {todos.map((todo, index) => (
        <Todo task={todo} key={todo.id} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
      ))}
      {/* Mensaje de no hay tareas o número de tareas pendientes */}
      {todos.length === 0 ? (
        <p>No tasks pending. Enjoy your day!</p>
      ) : (
        <p>You have {uncompletedCount} {uncompletedCount === 1 ? 'task' : 'tasks'} pending.</p>
      )}
    </div>
  );
}

export default TodoWrap;
