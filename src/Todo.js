import React, { useState, useEffect } from 'react';
import { Label, Input, FormGroup, Form, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import DateTimePicker from 'react-datetime-picker';
import "react-datepicker/dist/react-datepicker.css";
import DataListInput from 'react-datalist-input';

import './css/bootstrap.css';
import TodoItem from './TodoItem';

export default (props) => {
	const [todo, todoSet] = useState('');
	const [desc, descSet] = useState('');
	const [date, setDate] = useState(new Date());
	const handleChangeTodo = (event) => todoSet(event.target.value);
	const handleChangeDesc = (event) => descSet(event.target.value);
	const todoTypesArr = ['Work', 'Hardwork', 'Learning', 'Chill']
	const todoTypes = todoTypesArr.map((v, index) => ({ label: v, key: index }))
	const [id, setId] = useState(false);
	const [important, setImportant] = useState(false);
	const toggleImportant = () => setImportant(!important);
	const [modal, setModal] = useState(false);
	const [todoObj, setTodoObjHook] = useState({});

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		fetch('http://localhost:3001', {
			headers: {
				"Authorization": `Bearer ${props.token}`
			},
			signal: signal
		})
		.then((r) => {
			props.setAuthorized(r.status);
			if (r.status === 200)
				return r.json();
		})
		.then((r) => {
			setTodoObjHook(r);
		})
		.catch((err) => {
			console.log(err);
			props.setAuthorized(err);
		});

		return function() {
			abortController.abort();
		};
	}, [props]);

	const setTodoObj = (newObj) => {
		fetch('http://localhost:3001/write', {
			headers: {
				"Authorization": `Bearer ${props.token}`,
				"Content-Type": "application/json"
			},
			method: "POST",
			body: JSON.stringify(newObj)
		})
		.then((r) => props.setAuthorized(r.status));

		setTodoObjHook(newObj);
	};

	const changeDone = (id) => {
		const newTodoObj = { ...todoObj };
		newTodoObj[id]['completed'] = !newTodoObj[id]['completed'];
		setTodoObj(newTodoObj)
	};

	const delTodo = (id) => {
		let newTodoObj = { ...todoObj };
		delete newTodoObj[id];
		setTodoObj(newTodoObj)
	};

	const changeTodo = (item, id) => {
		setModal(true); // ??? не работает если вызывать обычный toggle
		todoSet(item.todo);
		descSet(item.desc);
		typeSet(item.type);
		setDate(new Date(item.date));
		setId(id);
		setImportant(!!item.important);
	};

	const reset = () => {
		todoSet('');
		descSet('');
		typeSet(todoTypesArr[0]);
		setDate(new Date());
		setId(false);
		setImportant(false);
	}

	const newTodo = (newTodoItem) => {
		const newTodoObj = { ...todoObj }
		const getNewIndex = () => {
			const ids = Object.keys(newTodoObj)
			const getIndex = (acc, val) => {
				const numVal = Number(val)
				return numVal >= acc ? numVal + 1 : acc
			}
			return ids.reduce(getIndex, 0)
		}
		const newIndex = id ? id : getNewIndex();
		newTodoObj[newIndex] = newTodoItem;
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

	const sortTodo = (by) => {
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