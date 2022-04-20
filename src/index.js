import { createRoot } from "react-dom/client";
import React from "react";

import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import { UserProvider, useUser } from "./contexts/UserContext";
import { EmailProvider } from "./contexts/EmailContext";

import "./index.css";

function Root() {
	const user = useUser();
	return user ? <MainPage /> : <LoginPage />;
}

const root = createRoot(document.querySelector("#root"));
root.render(
	<UserProvider>
		<EmailProvider>
			<Root />
		</EmailProvider>
	</UserProvider>
);
