import React, {createContext, useContext} from 'react';
import expressGetUrl from "../../config/expressUrl";
import expressWriteUrl from "../../config/expressWriteUrl";
import expressDelUrl from "../../config/expressDelUrl";

const AuthContext = createContext(null);

 export const AuthProvider = (props) => {
	const value = {
		getTodoObj: props.getTodoObj || getTodoObj,
		setTodoObj: props.setTodoObj || setTodoObj,
		delTodo: props.delTodo || delTodo
	};
	return (
		<AuthContext.Provider value={value}>
			{props.children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};

const getTodoObj = async (token) => {
	return await fetch(expressGetUrl, {
		headers: {
			"Authorization": `Bearer ${token}`
		}
	})
};

const setTodoObj = async (token, todoObj) => {
	await fetch(expressWriteUrl, {
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": "application/json"
		},
		method: "POST",
		body: JSON.stringify(todoObj)
	})
};

const delTodo = async (token, id) => {
	fetch(expressDelUrl, {
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": "application/json"
		},
		method: "POST",
		body: JSON.stringify({id: id})
	})
}