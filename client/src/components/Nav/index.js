import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-secondary">
			<NavLink className="navbar-brand" to="/">Google Book Search</NavLink>
			<div >
				<ul className="navbar-nav mr-auto">
					<li className="nav-item active">
						<NavLink className="nav-link" to="/">Search <span className="sr-only">(current)</span></NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/saved">Saved</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Nav;
