import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import './css/verticalTimeline.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faCheck, faAlignJustify } from '@fortawesome/free-solid-svg-icons';

export default (props) => {
	const [TodoObj, setTodoObjHook] = useState({});

	useEffect(() => {
		fetch('http://localhost:3001', {
			headers: {
				"Authorization": `Bearer ${props.token}`,
				"Content-Type": "application/json"
			}
		})
			.then((r) => r.json())
			.then((r) => {
			setTodoObjHook(r);
		})
	}, [props.token])

	const todoArr = Object.keys(TodoObj).map((v) => TodoObj[v])

	const tileContentFn = ({ date, view }) => {
		if (view === 'month') {
			const calendarMonth = date.getMonth();
			const calendarDate = date.getDate();
			const calendarYear = date.getYear();
			const str = [];
			todoArr.forEach(({ date: todoDate, todo }) => {
				const todoDateObj = new Date(todoDate);
				if ((todoDateObj.getDate() === calendarDate) && (todoDateObj.getMonth() === calendarMonth) &&
					todoDateObj.getYear() === calendarYear)
					str.push(todo);
			})
			return (<p>{str.join('; ')}</p>)
		}
	}

	const compare = (time1, time2) => {
		const obj1 = new Date(time1);
		const Y1 = obj1.getYear();
		const M1 = obj1.getMonth();
		const D1 = obj1.getDate();
		const obj2 = new Date(time2);
		const Y2 = obj2.getYear();
		const M2 = obj2.getMonth();
		const D2 = obj2.getDate();
		return ((Y1 === Y2) && (M1 === M2) && (D1 === D2))
	}

	const getDayTodo = (time) => todoArr.filter((v) => compare(time, v.date))

	const important = <FontAwesomeIcon size="lg" icon={faFlag} />
	const done = <FontAwesomeIcon size="lg" icon={faCheck} />
	const regular = <FontAwesomeIcon size="lg" icon={faAlignJustify} />

	const onClickDayFn = (value) => {
		const dayTodo = getDayTodo(value);
		const iconStyle = { background: 'rgb(33, 150, 243)', color: '#fff' }
		const dayTodoTimesorted = dayTodo.sort(({ date: left }, { date: right }) =>
			(new Date(left) - new Date(right)))
		const dayTodoJSX = dayTodoTimesorted.map((v, index) => {
			const ifDone = { 'textDecoration': 'none' }
			let icon;
			if (v.completed) {
				icon = done;
				ifDone['textDecoration'] = 'line-through'
			}
			else if (v.important)
				icon = important;
			else
				icon = regular;
			const deadline = new Date(v.date).getHours() + ':' + new Date(v.date).getMinutes()
			return <VerticalTimelineElement key={index} iconStyle={iconStyle} icon={icon} date={deadline}>
				<h4 style={ifDone}>{v.todo} [{v.type}]</h4><p style={ifDone}>{v.desc}</p>
			</VerticalTimelineElement>
		})
		if (dayTodo.length)
			props.setMainView(<VerticalTimeline>{dayTodoJSX}</VerticalTimeline>)
	}

	return (
		<Calendar tileContent={tileContentFn} className="calendar" onClickDay={onClickDayFn} />
	)
}