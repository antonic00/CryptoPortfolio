import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./navbar.css";

function NavbarLoggedIn() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	let Logo = require('../templates/crypto.png')

	return (
		<div>
		<header>
			<h3><img src={Logo} alt="Crypto Logo"/></h3>
			<nav ref={navRef}>
			    <Link to="/">Home</Link>
				<Link to="/Profile">Profile</Link>
				<Link to="/Wallet">Wallet</Link>				
				<Link to="/Logout">Logout</Link>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
		</div>
	);
}

export default NavbarLoggedIn;