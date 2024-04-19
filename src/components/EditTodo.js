import React, { useState } from 'react'

const EditTodo = ({editTodo, task}) => {
    const [value, setValue] = useState (task.task)

const handleSubmit = e => {
    e.preventDefault();

    editTodo(value, task.id)

    setValue("")

}

  return (
    <form className='EditTodo' onSubmit={handleSubmit}>

        <input type='text' className='todo-input' value={value}
        placeholder='Update tasks' onChange={(e) => setValue(e.target.value)}/>

        <button type='submit' className='todo-button'>
            Update tasks
        </button>

    </form>
  )
}


export default EditTodo