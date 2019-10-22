import React from 'react';
import Calendar from 'react-calendar';
import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

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
	const groups = [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }]

const items = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start_time: moment(),
    end_time: moment().add(1, 'hour')
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start_time: moment().add(-0.5, 'hour'),
    end_time: moment().add(0.5, 'hour')
  },
  {
    id: 3,
    group: 1,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour')
  }
]
	const onClickDayFn = (value) => console.log(value)
	return (
		<div>
    Rendered by react!
    <Timeline
      groups={groups}
      items={items}
      defaultTimeStart={moment().add(-12, 'hour')}
      defaultTimeEnd={moment().add(12, 'hour')}
    />
  </div>
	)
}