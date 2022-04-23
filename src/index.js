import { createRoot } from "react-dom/client";
import React from "react";

import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import { UserProvider, useUser } from "./contexts/UserContext";
import { EmailProvider } from "./contexts/EmailContext";

import "./index.css";
import { NotifyProvider } from "./contexts/NotifyContext";

function Root() {
	const user = useUser();
	return user ? <MainPage /> : <LoginPage />;
}

const root = createRoot(document.querySelector("#root"));
root.render(
	<NotifyProvider>
		<UserProvider>
			<EmailProvider>
				<Root />
			</EmailProvider>
		</UserProvider>
	</NotifyProvider>
);
