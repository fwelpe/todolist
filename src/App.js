import React, { useState } from 'react';
import { Label, Input, FormGroup, Form, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import DateTimePicker from 'react-datetime-picker';
import "react-datepicker/dist/react-datepicker.css";
import DataListInput from 'react-datalist-input';
// import $ from 'jquery';

import './css/bootstrap.css';
import Header from './Header.js';
import TodoItem from './TodoItem';

const App = () => {
	const [todo, todoSet] = useState('')
	const handleChangeTodo = (event) => todoSet(event.target.value)
	const [desc, descSet] = useState('')
	const handleChangeDesc = (event) => descSet(event.target.value)
	const [date, setDate] = useState(new Date());
	const todoTypesArr = ['Work', 'Hardwork', 'Learning', 'Chill']
	const todoTypes = todoTypesArr.map((v, index) => ({ label: v, key: index }))
	const [id, setId] = useState(false)

	const getTodoArr = () => {
		const todoObj = JSON.parse(localStorage.getItem('todolist')) || {}
		const createJSX = (v) => {
			return <TodoItem key={v} id={v} item={todoObj[v]} changeDone={changeDone} delTodo={delTodo} changeTodo={changeTodo} />
		}
		const todoItemsArr = Object.keys(todoObj).map(createJSX)
		return todoItemsArr
	}

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

	const changeTodo = (item, id) => {
		toggle();
		todoSet(item.todo);
		descSet(item.desc);
		typeSet(item.type);
		setDate(new Date(item.date));
		setId(id);
	}

	const reset = () => {
		todoSet('');
		descSet('');
		typeSet(todoTypesArr[0]);
		setDate(new Date());
		setId(false);
	}

	const newTodo = (todoObj) => {
		const newTodosObj = JSON.parse(localStorage.getItem('todolist')) || {}
		const getNewIndex = () => {
			const ids = Object.keys(newTodosObj)
			const getIndex = (acc, val) => {
				const numVal = Number(val)
				return numVal >= acc ? numVal + 1 : acc
			}
			return ids.reduce(getIndex, 0)
		}
		const newIndex = id ? id : getNewIndex();
		newTodosObj[newIndex] = todoObj;
		localStorage.setItem('todolist', JSON.stringify(newTodosObj))
		setTodoItems(getTodoArr());
		reset();
	}

	const [todoItems, setTodoItems] = useState(getTodoArr());
	const [modal, setModal] = useState(false);
	const toggle = () => {
		reset();
		setModal(!modal);
	}
	const sbmt = (event) => {
		event.preventDefault();
		newTodo({ todo: todo, completed: false, type: type, date: date, desc: desc });
		toggle();
	}
	const [type, typeSet] = useState(todoTypesArr[0])
	const handleSelectInput = (currentInput, item) => {
		typeSet(currentInput);
		return (item.label.substr(0, currentInput.length).toUpperCase() === currentInput.toUpperCase());
	}
	const handleChangeType = (event) => typeSet(event.label)

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
								<Input type="text" value={todo} onChange={handleChangeTodo} required />
							</FormGroup>
							<FormGroup>
								<Label>Description (optional)</Label>
								<Input type="text" value={desc} onChange={handleChangeDesc} />
							</FormGroup>
							<FormGroup>
								<Label for="exampleSelect">Type</Label>
								<DataListInput required initialValue={type} items={todoTypes} onSelect={handleChangeType} match={handleSelectInput} />
							</FormGroup>
							<FormGroup>
								<Label>Deadline</Label>
								<DateTimePicker required onChange={setDate} value={date} />
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" form='add' type="submit">Submit</Button>
						<Button color="secondary" onClick={toggle}>Cancel</Button>
					</ModalFooter>
				</Modal>
				{todoItems}
			</div>
		</div>
	)
}

export default App;
