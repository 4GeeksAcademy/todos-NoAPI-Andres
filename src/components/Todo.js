import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


const TodoForm = ({addTodo}) => {
  const [value, setValue] = useState ("")

const handleSubmit = e => {
  e.preventDefault();

  addTodo(value)

  setValue("")

}

return (
  <form className='TodoForm' onSubmit={handleSubmit}>

      <input type='text' className='todo-input' value={value}
      placeholder='Whats for today?' onChange={(e) => setValue(e.target.value)}/>

      <button type='submit' className='todo-button'>
          Add task
      </button>

  </form>
)
}
const Todo = ({
    task, inputCompleted, deleteTodo, editTodo
}) => {
  return (
    <div className='Todo'>

        <p onClick={() => inputCompleted(task.id)}className={`${task.completed ? 'completed' : ""}`}>{task.task}</p>
        <div>
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task.id)}  />
            <FontAwesomeIcon icon={faTrash} onClick= {() => deleteTodo(task.id)} />
        </div>

    </div>
  )
}

export default Todo; TodoForm