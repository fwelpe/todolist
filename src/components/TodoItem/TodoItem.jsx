import React, {useState} from "react";
import {Button, ButtonGroup, Modal, ModalFooter, ModalHeader} from 'reactstrap';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faTimesCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import './TodoItem.css';

const TodoItem = (props) => {
	const ifCompletedClass = props.item.completed ? 'completed' : '';
	const msInDay = 1000 * 60 * 60 * 24;
	const deadlineClass = (() => {
		if (props.item.completed)
			return ifCompletedClass;
		else if ((Date.parse(new Date(props.item.date)) - Date.parse(new Date())) < msInDay * 2)
			return 'bg-danger';
		else
			return '';
	})();
	const yearNow = new Date().getFullYear();
	const yearTodo = new Date(props.item.date).getFullYear();
	const timeRegex = yearNow === yearTodo ? 'MMMM D' : "MMMM D, YYYY";
	const expires = <Moment format={timeRegex}>{props.item.date}</Moment>;
	const importantIconClass = (props.item.important && !props.item.completed ? 'importantIcon' : 'invisible') + ' text-danger rightInFlex';
	const [modal3, setModal3] = useState(false);
	const toggle3 = () => setModal3(!modal3);
	const deleteItem = () => {
		props.delTodo(props.id);
		toggle3();
	};

	return (
		<div className="todo-item">
			<input type="checkbox" checked={props.item.completed} onChange={() => props.changeDone(props.id)} />
			<div>
				<p className={ifCompletedClass}>{props.item.todo} [{props.item.type}]</p>
				<p className={ifCompletedClass}><small>{props.item.desc}</small></p>
				<p className={deadlineClass}>Deadline: {expires}</p>
			</div>
				<FontAwesomeIcon icon={faFlag} className={importantIconClass} />
				<ButtonGroup>
					<Button onClick={toggle3}><FontAwesomeIcon icon={faTimesCircle} /></Button>
					<Button onClick={() => props.changeTodo(props.item, props.id)}><FontAwesomeIcon icon={faPencilAlt} /></Button>
				</ButtonGroup>
			<Modal isOpen={modal3} toggle={toggle3}>
				<ModalHeader toggle={toggle3}>
					Are you sure?
				</ModalHeader>
				<ModalFooter>
					<Button color="primary" onClick={deleteItem}>Yes</Button>
					<Button color="secondary" onClick={toggle3}>No</Button>
				</ModalFooter>
			</Modal>
			</div>
	)
}

export default TodoItem;