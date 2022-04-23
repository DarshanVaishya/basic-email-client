import React from "react";
import { UserProvider } from "../contexts/UserContext";
import { EmailProvider } from "../contexts/EmailContext";
import { NotifyProvider } from "../contexts/NotifyContext";

export function Providers({ children }) {
	return (
		<NotifyProvider>
			<UserProvider>
				<EmailProvider>{children}</EmailProvider>
			</UserProvider>
		</NotifyProvider>
	);
}
