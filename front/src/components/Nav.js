import React from "react";
import {NavLink} from 'react-router-dom'

export default function Nav(props) {
	const {logout} = props;

	const handleLogout = (e) => {
		e.preventDefault()
		logout()
	}

	return(
		<div className="navbar-fixed">
		  <nav>
		    <div className="nav-wrapper">
		      <NavLink to="/news" className="brand-logo center">Новости</NavLink>
		      <ul id="nav-mobile" className="right hide-on-med-and-down">
		        <li><NavLink to="/news">Новостная лента</NavLink></li>
		        <li><NavLink to="/saved">Закладки</NavLink></li>
		        <li><a href="/" onClick={(e)=>handleLogout(e)} >Выход</a></li>
		      </ul>
		    </div>
		  </nav>
		</div>
	)
}