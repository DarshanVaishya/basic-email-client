import React from "react";
import { useEmail } from "../contexts/EmailContext";
import { useUser } from "../contexts/UserContext";
import { Email } from "./Email";

const MessageList = () => {
	const user = useUser();
	const { emails, loading, error, setCurrentEmail } = useEmail();

	return (
		<div className="MessageList">
			{error ? (
				<div className="no-messages">Error!</div>
			) : loading ? (
				<div className="no-messages">Loading...</div>
			) : emails.length === 0 ? (
				<div className="no-messages">
					Your mailbox is empty, {user.firstName}! 🎉
				</div>
			) : (
				<ul>
					{emails.map((email) => (
						<Email key={email.id} email={email} handleClick={setCurrentEmail} />
					))}
				</ul>
			)}
		</div>
	);
};

export default MessageList;
