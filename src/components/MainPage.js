import React from "react";
import { useEmail } from "../contexts/EmailContext";
import Header from "./Header";
import MessageList from "./MessageList";
import MessageViewer from "./MessageView";

const MainPage = () => {
	const { currentEmail } = useEmail();

	return (
		<main>
			<Header />
			{currentEmail ? <MessageViewer /> : <MessageList />}
		</main>
	);
};

export default MainPage;
