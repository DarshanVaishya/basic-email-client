import { createRoot } from "react-dom/client";
import React from "react";

import "./index.css";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import { useUser } from "./contexts/UserContext";
import { Providers } from "./util/Providers";

function Root() {
	const user = useUser();
	return user ? <MainPage /> : <LoginPage />;
}

const root = createRoot(document.querySelector("#root"));
root.render(
	<Providers>
		<Root />
	</Providers>
);
