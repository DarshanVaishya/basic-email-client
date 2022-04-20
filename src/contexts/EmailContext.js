import React, { useContext, useReducer } from "react";
import { useEffect } from "react";
import { fetchEmails } from "../api";

const EmailContext = React.createContext();

const ACTIONS = {
	BEGIN: "begin",
	SUCCESS: "success",
	ERROR: "error",
	SELECT_EMAIL: "select_email",
};

function reducer(state, action) {
	switch (action.type) {
		case ACTIONS.BEGIN:
			return {
				...state,
				loading: true,
				error: null,
			};
		case ACTIONS.SUCCESS:
			return {
				...state,
				loading: false,
				emails: action.emails,
			};
		case ACTIONS.ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case ACTIONS.SELECT_EMAIL:
			return {
				...state,
				currentEmail: action.email,
			};
		default:
			return state;
	}
}

export function EmailProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, {
		emails: [],
		loading: false,
		error: null,
		currentEmail: null,
	});

	useEffect(() => {
		dispatch({ type: ACTIONS.BEGIN });

		fetchEmails()
			.then((emails) => dispatch({ type: ACTIONS.SUCCESS, emails }))
			.catch((error) => dispatch({ type: ACTIONS.ERROR, error }));
	}, []);

	const setCurrentEmail = (email) => {
		dispatch({ type: ACTIONS.SELECT_EMAIL, email });
	};

	const value = {
		...state,
		setCurrentEmail,
	};

	return (
		<EmailContext.Provider value={value}>{children}</EmailContext.Provider>
	);
}

export function useEmail() {
	return useContext(EmailContext);
}
