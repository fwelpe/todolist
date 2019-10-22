import React from 'react';
import Calendar from 'react-calendar';

export default () => {
	const TodoObj = JSON.parse(localStorage.getItem('todolist')) || {}
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
	const onClickDayFn = (value) => console.log(value)
	return (
		<Calendar tileContent={tileContentFn} className="calendar" onClickDay={onClickDayFn} />
	)
}