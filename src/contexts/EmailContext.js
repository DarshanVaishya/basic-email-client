import React, { useContext, useReducer } from "react";
import { useEffect } from "react";

import { fetchEmails, fetchLatestEmails } from "../util/api";
import { useNotify } from "./NotifyContext";
import { useUser } from "./UserContext";

const EmailContext = React.createContext();

const ACTIONS = {
	BEGIN: "begin",
	SUCCESS: "success",
	ERROR: "error",
	SELECT_EMAIL: "select_email",
	ADD_EMAIL: "add_email",
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
		case ACTIONS.ADD_EMAIL:
			return {
				...state,
				emails: [...state.emails, ...action.emails],
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
	const user = useUser();
	const { addMessage } = useNotify();

	useEffect(() => {
		dispatch({ type: ACTIONS.BEGIN });

		fetchEmails()
			.then((emails) => dispatch({ type: ACTIONS.SUCCESS, emails }))
			.catch((error) => dispatch({ type: ACTIONS.ERROR, error }));
	}, []);

	useEffect(() => {
		const refresh = () => {
			if (!state.loading) {
				fetchLatestEmails().then((emails) => {
					if (emails.length > 0) {
						dispatch({ type: ACTIONS.ADD_EMAIL, emails });
						addMessage(
							`${emails.length} email${emails.length > 1 ? "s" : ""} arrived.`
						);
					}
				});
			}
		};

		let timer;
		if (user) timer = setInterval(refresh, 3000);
		return () => clearInterval(timer);
	}, [user]);

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
