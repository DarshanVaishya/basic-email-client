import React from "react";

export const Email = React.memo(({ email, handleClick }) => (
	<li onClick={() => handleClick(email)}>
		<div className="subject">{email.subject}</div>
		<div className="preview">{email.preview}</div>
	</li>
));
