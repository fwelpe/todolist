import React, {useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFlag, faCheck, faAlignJustify} from '@fortawesome/free-solid-svg-icons';
import {Route, Switch, useHistory, useRouteMatch} from "react-router-dom";

import expressUrl from "../../config/expressUrl";
import './Calendar.css';

export default (props) => {
	console.log('Calendar');
	const [TodoObj, setTodoObjHook] = useState({});
	let match = useRouteMatch();
	let history = useHistory();


	useEffect(() => {
		fetch(expressUrl, {
			headers: {
				"Authorization": `Bearer ${props.token}`,
				"Content-Type": "application/json"
			}
		})
			.then((r) => r.json())
			.then((r) => {
				setTodoObjHook(r);
			})
			.catch((err) => console.error(err))
	}, [props.token]);

	const todoArr = Object.keys(TodoObj).map((v) => TodoObj[v]);

	const tileContentFn = ({date, view}) => {
		if (view === 'month') {
			const calendarMonth = date.getMonth();
			const calendarDate = date.getDate();
			const calendarYear = date.getYear();
			const arr = [];
			todoArr.forEach(({date: todoDate, todo}) => {
				const todoDateObj = new Date(todoDate);
				if ((todoDateObj.getDate() === calendarDate) && (todoDateObj.getMonth() === calendarMonth) &&
					todoDateObj.getYear() === calendarYear)
					arr.push(todo);
			})
			const str = arr.join('; ');
			const resStr = str.length > 19 ? str.substr(0, 16) + '...' : str;
			return (<p>{resStr}</p>)
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

	const important = <FontAwesomeIcon size="lg" icon={faFlag}/>;
	const done = <FontAwesomeIcon size="lg" icon={faCheck}/>;
	const regular = <FontAwesomeIcon size="lg" icon={faAlignJustify}/>;

	const onClickDayFn = (value) => {
		if (getDayTodo(value).length)
			history.push(`/home/calendar/${value}`);
	}

	const getVTline = (props) => {
		const dayTodo = getDayTodo(props.match.params.day);
		const iconStyle = {background: 'rgb(33, 150, 243)', color: '#fff'};
		const dayTodoTimesorted = dayTodo.sort(({date: left}, {date: right}) =>
			(new Date(left) - new Date(right)));
		const dayTodoJSX = dayTodoTimesorted.map((v, index) => {
			const ifDone = v.completed ? 'done' : '';
			const icon = (() => {
				if (v.completed)
					return done;
				else if (v.important)
					return important;
				else
					return regular;
			})();
			const formatter = (new Intl.NumberFormat('ru-RU', {minimumIntegerDigits: 2})).format;
			const timeObj = new Date(v.date);
			const deadline = formatter(timeObj.getHours()) + ':' + formatter(timeObj.getMinutes());

			return <VerticalTimelineElement key={index} iconStyle={iconStyle} icon={icon} date={deadline}>
				<h4 className={ifDone}>{v.todo} [{v.type}]</h4><p className={ifDone}>{v.desc}</p>
			</VerticalTimelineElement>
		});
		return (<VerticalTimeline>{dayTodoJSX}</VerticalTimeline>)
	}

	return (
		<Switch>
			<Route exact path={match.path}>
				<Calendar tileContent={tileContentFn} className="calendar" onClickDay={onClickDayFn}/>
			</Route>
			<Route path={`${match.path}/:day`} render={(props) => getVTline(props)}/>
		</Switch>
	)
}