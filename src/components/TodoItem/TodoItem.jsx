import React, {useState} from "react";
import {Button, ButtonGroup, Modal, ModalFooter, ModalHeader} from 'reactstrap';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faTimesCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import getTimeFormat from '../../config/getTimeFormat'

import './TodoItem.css';

const TodoItem = (props) => {
	const msInDay = 1000 * 60 * 60 * 24;
	const ifCompletedClass = props.item.completed ? 'completed' : '';
	const deadlineClass = (() => {
		if (props.item.completed)
			return 'completed';
		else if ((Date.parse(new Date(props.item.date)) - Date.parse(new Date())) < msInDay * 2)
			return 'text-danger';
		else
			return '';
	})();
	const importantIconClass = props.item.important && !props.item.completed ?
		'importantIcon text-danger rightInFlex' : 'invisible rightInFlex';

	const yearNow = new Date().getFullYear();
	const yearTodo = new Date(props.item.date).getFullYear();
	const timeFormat = getTimeFormat(yearNow === yearTodo);
	const expires = <Moment format={timeFormat}>{props.item.date}</Moment>;

	const [modal3, setModal3] = useState(false);
	const toggle = () => setModal3(!modal3);
	const deleteItem = () => {
		props.delTodo(props.id);
		toggle();
	};

	return (
		<div className="todo-item">
			<input type="checkbox" checked={props.item.completed} onChange={() => props.changeDone(props.id)} />
			<div className={'mx-lg-3'}>
				<p className={ifCompletedClass}>{props.item.todo} [{props.item.type}]</p>
				<p className={ifCompletedClass}><small>{props.item.desc}</small></p>
				<p className={deadlineClass}>Deadline: {expires}</p>
			</div>
				<FontAwesomeIcon icon={faFlag} className={importantIconClass} />
				<ButtonGroup>
					<Button onClick={toggle}><FontAwesomeIcon icon={faTimesCircle} /></Button>
					<Button onClick={() => props.changeTodo(props.item, props.id)}>
						<FontAwesomeIcon icon={faPencilAlt} />
					</Button>
				</ButtonGroup>
			<Modal isOpen={modal3} toggle={toggle}>
				<ModalHeader toggle={toggle}>
					Are you sure?
				</ModalHeader>
				<ModalFooter>
					<Button color="primary" onClick={deleteItem}>Yes</Button>
					<Button color="secondary" onClick={toggle}>No</Button>
				</ModalFooter>
			</Modal>
			</div>
	)
}

export default TodoItem;