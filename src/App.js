import React, { useState } from 'react';
import { Label, Input, FormGroup, Form, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import DateTimePicker from 'react-datetime-picker';
import "react-datepicker/dist/react-datepicker.css";
// import $ from 'jquery';

import './css/bootstrap.css';
import Header from './Header.js';
import TodoItem from './TodoItem';

const App = () => {
	const [todo, todoSet] = useState('')
	const handleChangeTodo = (event) => todoSet(event.target.value)
	const [desc, descSet] = useState('')
	const handleChangeDesc = (event) => descSet(event.target.value)
	const [type, typeSet] = useState(0)
	const handleChangeType = (event) => typeSet(event.target.value)
	const todoTypesArr = ['Work', 'Hardwork', 'Learning', 'Chill', 'Other']
	const todoTypes = todoTypesArr.map((v, index) => (<option value={Number(index)} key={Number(index)}> {v} </option>))

	const changeDone = (id) => {
		const newTodosObj = JSON.parse(localStorage.getItem('todolist'))
		newTodosObj[id]['completed'] = !newTodosObj[id]['completed']
		localStorage.setItem('todolist', JSON.stringify(newTodosObj))
		setTodoItems(getTodoArr())
	}

	const delTodo = (id) => {
		let newTodosObj = JSON.parse(localStorage.getItem('todolist'))
		delete newTodosObj[id]
		localStorage.setItem('todolist', JSON.stringify(newTodosObj))
		setTodoItems(getTodoArr())
	}

	const getTodoArr = () => {
		const todoObj = JSON.parse(localStorage.getItem('todolist')) || {}
		const createJSX = (v) => {
			return <TodoItem key={v} id={v} item={todoObj[v]} changeDone={changeDone} delTodo={delTodo} types={todoTypesArr} />
		}
		const todoItemsArr = Object.keys(todoObj).map(createJSX)
		return todoItemsArr
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
		setTodoItems([...todoItems, <TodoItem key={newIndex} id={newIndex} item={todoObj} changeDone={changeDone} delTodo={delTodo} types={todoTypesArr} />])
		newTodosObj[newIndex] = todoObj
		localStorage.setItem('todolist', JSON.stringify(newTodosObj))
	}

	const [date, setDate] = useState(new Date());

	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);
	const sbmt = (event) => {
		event.preventDefault();
		newTodo({ todo: todo, completed: false, type: type, date: date, desc: desc });
		toggle();
	}

	return (
		<div>
			<Header />
			<div className="todo-list">
				<Button color="info" onClick={toggle}>+</Button>
				<Modal isOpen={modal} toggle={toggle}>
					<ModalHeader toggle={toggle}>New Todo</ModalHeader>
					<ModalBody>
						<Form id='add' onSubmit={sbmt}>
							<FormGroup>
								<Label>Name</Label>
								<Input type="text" onChange={handleChangeTodo} required />
							</FormGroup>
							<FormGroup>
								<Label>Description (optional)</Label>
								<Input type="text" onChange={handleChangeDesc} />
							</FormGroup>
							<FormGroup>
								<Label for="exampleSelect">Type</Label>
								<Input type="select" name="select" id="exampleSelect" onChange={handleChangeType}>
									{todoTypes}
								</Input>
							</FormGroup>
							<FormGroup>
								<Label>Deadline</Label>
								<DateTimePicker required onChange={setDate} value={date} />
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" form='add' type="submit">Add New</Button>
						<Button color="secondary" onClick={toggle}>Cancel</Button>
					</ModalFooter>
				</Modal>
				{todoItems}
			</div>
		</div>
	)
}

export default App;
