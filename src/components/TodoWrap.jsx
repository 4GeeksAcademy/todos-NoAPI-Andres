import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm.jsx';
import Todo from './Todo.jsx';

const TodoWrap = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const userName = 'test_user';  // Replace with actual user name if available

  useEffect(() => {
    // Fetch the initial data from the server
    fetch(`https://playground.4geeks.com/todos/users/${userName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('User not found');
        }
        return response.json();
      })
      .then(data => setTodos(data.todos))
      .catch(error => {
        console.error('Error fetching data:', error);
        setTodos([]);  // Ensure todos is an array even if there's an error
        setError(error.message);
      });
  }, [userName]);

  const addTodo = async label => {
    if (label.trim() !== "") {
      const response = await fetch('https://playground.4geeks.com/todos/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_name: userName, label, is_done: false })
      });
      if (response.ok) {
        const newTodo = await response.json();
        setTodos(prevTodos => [...prevTodos, newTodo]);
      } else {
        console.error('Error adding todo:', await response.json());
      }
    }
  };

  const toggleComplete = async id => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      const response = await fetch(`https://playground.4geeks.com/todos/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ label: todo.label, is_done: !todo.is_done })
      });
      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? updatedTodo : todo));
      } else {
        console.error('Error updating todo:', await response.json());
      }
    }
  };

  const deleteTodo = async id => {
    const response = await fetch(`https://playground.4geeks.com/todos/todo/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } else {
      console.error('Error deleting todo:', await response.json());
    }
  };

  const deleteAllTodos = async () => {
    const response = await fetch(`https://playground.4geeks.com/todos/user/${userName}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      setTodos([]);
    } else {
      console.error('Error deleting all todos:', await response.json());
    }
  };

  const uncompletedCount = todos.filter(todo => !todo.is_done).length;

  return (
    <div className='TodoWrap'>
      <h1>This is how the day looks</h1>
      {error && <p className='error'>{error}</p>}
      <TodoForm addTodo={addTodo} />
      {todos.map(todo => (
        <Todo task={todo} key={todo.id} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
      ))}
      {todos.length === 0 ? (
        <p>No tasks pending. Enjoy your day!</p>
      ) : (
        <p>You have {uncompletedCount} {uncompletedCount === 1 ? 'task' : 'tasks'} pending.</p>
      )}
      <button onClick={deleteAllTodos}>Clear All Tasks</button>
    </div>
  );
};

export default TodoWrap;