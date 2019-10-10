import React, { useState } from 'react';

const NameForm = () => {
    const [todo, todoSet] = useState('');

    const handleChange = (event) => todoSet(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        const todoData = {
            todo: todo,
            completed: false
        }
        const newTodolist = localStorage.getItem('todolist') || [];
        newTodolist.push(todoData);
        localStorage.setItem('todolist', newTodolist);
    }

    return (
        <form onSubmit = {handleSubmit}>
            <label>
                Новая задача:
            <input type="text" onChange={handleChange} />
            </label>
            <input type="submit" value="Отправить" />
        </form>
    );
}

export default NameForm