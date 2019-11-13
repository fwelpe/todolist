import React, {createContext, useContext} from 'react';
import expressGetUrl from "../../config/expressUrl";

export const AuthContext = createContext();

// export const useAuth = () => {
// 	return useContext(AuthContext);
// };
 const AuthProvider = (props) => {


	const getTodoObj = async (token) => {
		await fetch(expressGetUrl, {
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
	};
	const au_methods = {
		getTodoObj: props.getTodoObj || getTodoObj,
	};
	return (
		<AuthProvider.Provider value={{au_methods, getTodoObj}}>
			{props.children}
		</AuthProvider.Provider>
	);
};

 export default AuthProvider;