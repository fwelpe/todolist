import React, { useState } from 'react';
import { Label, Input, FormGroup, Form, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import DateTimePicker from 'react-datetime-picker';
import "react-datepicker/dist/react-datepicker.css";
import DataListInput from 'react-datalist-input';
import axios from 'axios';

import './css/bootstrap.css';
import TodoItem from './TodoItem';

export default (props) => {
	const [todo, todoSet] = useState('')
	const handleChangeTodo = (event) => todoSet(event.target.value)
	const [desc, descSet] = useState('')
	const handleChangeDesc = (event) => descSet(event.target.value)
	const [date, setDate] = useState(new Date());
	const todoTypesArr = ['Work', 'Hardwork', 'Learning', 'Chill']
	const todoTypes = todoTypesArr.map((v, index) => ({ label: v, key: index }))
<<<<<<< HEAD
	const [id, setId] = useState(false)
	// const [todoArr, setTodoArr] = 

	const getJSON = () => fetch('http://localhost:3000').then((d) => d.json())

	const getTodoArr = () => {
		const todoObj = getJSON()
		console.log(todoObj);
		const createJSX = (v) =>
			<TodoItem key={v} id={v} item={todoObj[v]} changeDone={changeDone} delTodo={delTodo} changeTodo={changeTodo} />;
		const todoItemsArr = Object.keys(todoObj).map(createJSX);
		return todoItemsArr;
	}

	const changeDone = (id) => {
		const newTodosObj = getJSON()
		newTodosObj[id]['completed'] = !newTodosObj[id]['completed']
		localStorage.setItem('todolist', JSON.stringify(newTodosObj))
		setTodoItems(getTodoArr())
	}

	const delTodo = (id) => {
		let newTodosObj = getJSON()
		delete newTodosObj[id]
		localStorage.setItem('todolist', JSON.stringify(newTodosObj))
		setTodoItems(getTodoArr())
=======
	const [id, setId] = useState(false);
	const [important, setImportant] = useState(false);
	const toggleImportant = () => setImportant(!important);
	const [modal, setModal] = useState(false);
	const todoObj = props.todoObj;
	const setTodoObj = props.setTodoObj;

	const changeDone = (id) => {
		const newTodoObj = { ...todoObj }
		newTodoObj[id]['completed'] = !newTodoObj[id]['completed']
		setTodoObj(newTodoObj)
	}

	const delTodo = (id) => {
		let newTodoObj = { ...todoObj }
		delete newTodoObj[id]
		setTodoObj(newTodoObj)
>>>>>>> 2bd8ba4... dayend. learning async, hook callbacks; ext storage adding // not working
	}

	const changeTodo = (item, id) => {
		setModal(true); // ??? не работает если вызывать обычный toggle
		todoSet(item.todo);
		descSet(item.desc);
		typeSet(item.type);
		setDate(new Date(item.date));
		setId(id);
		setImportant(!!item.important);
	}

	const reset = () => {
		todoSet('');
		descSet('');
		typeSet(todoTypesArr[0]);
		setDate(new Date());
		setId(false);
		setImportant(false);
	}

	const newTodo = (todoObj) => {
<<<<<<< HEAD
		const newTodosObj = getJSON() || {}
=======
		const newTodoObj = { ...todoObj }
>>>>>>> 2bd8ba4... dayend. learning async, hook callbacks; ext storage adding // not working
		const getNewIndex = () => {
			const ids = Object.keys(newTodoObj)
			const getIndex = (acc, val) => {
				const numVal = Number(val)
				return numVal >= acc ? numVal + 1 : acc
			}
			return ids.reduce(getIndex, 0)
		}
		const newIndex = id ? id : getNewIndex();
		newTodoObj[newIndex] = todoObj;
		setTodoObj(newTodoObj)
		reset();
	}


	const toggle = () => {
		reset();
		setModal(!modal);
	}

	const sbmt = (event) => {
		event.preventDefault();
		newTodo({ todo: todo, completed: false, type: type, date: date, desc: desc, important: important });
		toggle();
	}

	const [type, typeSet] = useState(todoTypesArr[0])

<<<<<<< HEAD
	const sortTodo = (by = 'obj') => {
		const todoObj = getJSON() || {};
=======
	const sortTodo = (by) => {
>>>>>>> 2bd8ba4... dayend. learning async, hook callbacks; ext storage adding // not working
		const todoArr = Object.keys(todoObj).map((v) => todoObj[v]);
		let compareFn;
		if (by === 'time') {
			compareFn = (left, right) => {
				return (new Date(left['date']) - new Date(right['date']));
			}
		}
		else if (by === 'type') {
			compareFn = (left, right) => {
				const lowerLeft = left.type.toLowerCase();
				const lowerRight = right.type.toLowerCase();
				return (lowerLeft.localeCompare(lowerRight));
			}
		}
		todoArr.sort(compareFn);
		const assembleObj = (acc, val, index) => {
			acc[index] = val;
			return acc;
		}
		setTodoObj(todoArr.reduce(assembleObj, {}));
	}

	const handleSelectInput = (currentInput, item) => {
		typeSet(currentInput);
		return (item.label.substr(0, currentInput.length).toUpperCase() === currentInput.toUpperCase());
	}

	const handleChangeType = (event) => typeSet(event.label)

	return (
		<div className="todo-list">
			<Button color="primary" onClick={toggle}>+</Button>
			<Button onClick={() => sortTodo('time')}>Sort by time</Button>
			<Button onClick={() => sortTodo('type')}>Sort by type</Button>
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
						<FormGroup check>
							<Label check>
								<Input type="checkbox" checked={important} onChange={toggleImportant} />
								Important
								</Label>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" form='add' type="submit">Submit</Button>
					<Button color="secondary" onClick={toggle}>Cancel</Button>
				</ModalFooter>
			</Modal>
			{Object.keys(todoObj).map((v) =>
				<TodoItem key={v} id={v} item={todoObj[v]} changeDone={changeDone} delTodo={delTodo} changeTodo={changeTodo} />)}
		</div>
	)
}