import React, {createContext, useContext} from 'react';
import expressGetUrl from "../../config/expressUrl";
import expressWriteUrl from "../../config/expressWriteUrl";
import expressDelUrl from "../../config/expressDelUrl";
import expressLoginUrl from "../../config/expressLoginUrl";

const TodoServiceContext = createContext(null);

export const TodoServiceProvider = (props) => {
	const value = {
		getTodoObj: props.getTodoObj || getTodoObj,
		setTodoObj: props.setTodoObj || setTodoObj,
		delTodo: props.delTodo || delTodo,
		login: props.login || login
	};
	return (
		<TodoServiceContext.Provider value={value}>
			{props.children}
		</TodoServiceContext.Provider>
	);
};

export const useTodoService = () => {
	return useContext(TodoServiceContext);
};

const getTodoObj = (token) => {
	return fetch(expressGetUrl, {
		headers: {
			"Authorization": `Bearer ${token}`
		}
	})
};

const setTodoObj = async (token, todoObj) => {
	let result = true;
	await fetch(expressWriteUrl, {
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": "application/json"
		},
		method: "POST",
		body: JSON.stringify(todoObj)
	})
		.catch(() => {
			result = false;
		});
	return result;
};

const delTodo = async (token, id) => {
	let result = true;
	await fetch(expressDelUrl, {
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": "application/json"
		},
		method: "POST",
		body: JSON.stringify({id: id})
	})
		.catch(() => {
			result = false;
		});
	return result;
};

const login = (username, password) => {
	return fetch(expressLoginUrl, {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST",
		body: JSON.stringify({username, password})
	})
}