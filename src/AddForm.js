import React, { useState } from 'react';

/* const AddForm = (props) => {
    const [todo, todoSet] = useState('')
    const newTodosObj = JSON.parse(localStorage.getItem('todolist')) || {}

    const handleChange = (event) => todoSet(event.target.value)

    const getNewIndex = () => {
        const ids = Object.keys(newTodosObj)
        const getIndex = (acc, val) => {
            const numVal = Number(val)
            return numVal >= acc ? numVal + 1 : acc
        }
        return ids.reduce(getIndex, 0)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const todoData = {
            todo: todo,
            completed: false
        }
        newTodosObj[getNewIndex()] = todoData
        localStorage.setItem('todolist', JSON.stringify(newTodosObj))
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Новая задача:
            <input type="text" onChange={handleChange} />
            </label>
            <input type="submit" value="Отправить" />
        </form>
    )
} */

export default function (props) {
    const [todo, todoSet] = useState('')
    const handleChange = (event) => todoSet(event.target.value)

    return (
        <form onSubmit={(event) => {event.preventDefault(); props.handleSubmit({ todo: todo, completed: false })}}>
            <label>
                Новая задача:
            <input type="text" onChange={handleChange} />
            </label>
            <input type="submit" value="Отправить" />
        </form>
    )
}