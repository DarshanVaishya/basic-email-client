import { createContext, useContext, useEffect, useState } from "react";

const NotifyContext = createContext();

export function NotifyProvider({ children }) {
	const [messages, setMessages] = useState([]);

	const removeMessage = (msg) => {
		setMessages((messages) => messages.filter((m) => m !== msg));
	};

	useEffect(() => {
		const clearnup = () => {
			const now = new Date().getTime();
			setMessages((msgs) => msgs.filter((m) => now - m.addedAt < 3000));
		};

		const timer = setInterval(clearnup, 6000);
		return () => clearInterval(timer);
	}, []);

	const addMessage = (text) => {
		setMessages((msg) => [
			...msg,
			{
				id: Math.random(),
				text,
				addedAt: new Date().getTime(),
			},
		]);
	};

	const value = {
		messages,
		addMessage,
	};

	return (
		<NotifyContext.Provider value={value}>
			<div className="notification-wrapper">
				<ul>
					{messages.map((msg) => (
						<Notification
							key={msg.id}
							messages={msg}
							handleClose={() => removeMessage(msg)}
						/>
					))}
				</ul>
			</div>
			{children}
		</NotifyContext.Provider>
	);
}

const Notification = ({ messages, handleClose }) => (
	<li>
		{messages.text}
		<button className="close" onClick={handleClose}>
			&times;
		</button>
	</li>
);

export function useNotify() {
	return useContext(NotifyContext);
}
