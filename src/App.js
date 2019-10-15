import React, { useState } from 'react';
import './App.css';
import Header from './Header.js';
import TodoItem from './TodoItem'


const App = () => {
	const [todo, todoSet] = useState('')
	const handleChange = (event) => todoSet(event.target.value)
	
	const changeDone = (id) => {
		const newTodosObj = JSON.parse(localStorage.getItem('todolist'))
		newTodosObj[id]['completed'] = !newTodosObj[id]['completed']
		localStorage.setItem('todolist', JSON.stringify(newTodosObj))
		setTodoItems(getTodoArr())
	}
	const getTodoArr = () => {
		const todoObj = JSON.parse(localStorage.getItem('todolist')) || {}
		const createJSX = (v) => {
			return <TodoItem key={v} id={v} item={todoObj[v]} changeDone={changeDone} />
		}
		const todoItemsArr = Object.keys(todoObj).map(createJSX)
		return todoItemsArr;
	}

	const [todoItems, setTodoItems] = useState(getTodoArr());

	const newTodo = (todoObj) => {
		if (!todoObj.todo)
			return
		const newTodosObj = JSON.parse(localStorage.getItem('todolist')) || {}
		const getNewIndex = () => {
			const ids = Object.keys(newTodosObj)
			const getIndex = (acc, val) => {
				const numVal = Number(val)
				return numVal >= acc ? numVal + 1 : acc
			}
			return ids.reduce(getIndex, 0)
		}
		const newIndex = getNewIndex()
		setTodoItems([...todoItems, <TodoItem key={newIndex} id={newIndex} item={todoObj} changeDone={changeDone} />])
		newTodosObj[newIndex] = todoObj
		localStorage.setItem('todolist', JSON.stringify(newTodosObj))
	}

	return (
		<div>
			<Header />
			<div className="todo-list">
				<form onSubmit={(event) => { event.preventDefault(); newTodo({ todo: todo, completed: false }) }}>
					<label>
						Новая задача:
            <input type="text" onChange={handleChange} />
					</label>
					<input type="submit" value="Отправить" />
				</form>
				{todoItems}
			</div>
		</div>
	)
}

export default App;
