import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm.jsx';
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo.jsx';

const TodoWrap = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch the initial data from the server
    fetch('https://playground.4geeks.com/todos/users')
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addTodo = async todo => {
    if (todo.trim() !== "") {
      const response = await fetch('https://playground.4geeks.com/todos/{user_name}', {
        method: 'POST',
        headers: {
          'Content-Type': application/json
        },
        body: JSON.stringify({ username: '{user_name}', task: todo})
      });
      const newTodo = await response.json();
      setTodos(prevTodos => [...prevTodos, newTodo]);
    }
  };

  const toggleComplete = async todo => {
    if (todo.trim() !== "") {
      const response = await fetch('https://playground.4geeks.com/todos/{todo_id}', {
        method: 'PUT',
        headers: {
          'Content-Type': application/json
        },
        body: JSON.stringify({ username: '{todo_id}', task: todo})
      });
      const newTodo = await response.json();
      setTodos(prevTodos => [...prevTodos, newTodo]);
    }
  };

  const deleteTodo = async todo => {
    if (todo.trim() !== "") {
      const response = await fetch('https://playground.4geeks.com/todos/{todo_id}', {
        method: 'DELETE',
        headers: {
          'Content-Type': application/json
        },
        body: JSON.stringify({ username: '{todo_id}', task: todo})
      });
      const newTodo = await response.json();
      setTodos(prevTodos => [...prevTodos, newTodo]);
    }
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
      {/* Mensaje de no hay tareas o número de pendientes */}
      {todos.length === 0 ? (
        <p>No tasks pending. Enjoy your day!</p>
      ) : (
        <p>You have {uncompletedCount} {uncompletedCount === 1 ? 'task' : 'tasks'} pending.</p>
      )}
    </div>
  );
}

export default TodoWrap;
