import AppleStoreLogo from "../images/apple-app-store.webp";
import GoogleStoreLogo from "../images/google-play-store.webp";
import TinderLogoSmall from "../images/tinder-logo-small.png";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AuthModal = ({ setShowModal, isSignUp }) => {
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);
	const [error, setError] = useState(null);
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);

	let navigate = useNavigate();

	const handleClick = () => {
		setShowModal(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (isSignUp && password !== confirmPassword) {
				setError("Passwords must match!");
				return;
			}

			const response = await axios.post(
				`http://localhost:8000/${isSignUp ? "signup" : "login"}`,
				{ email, password }
			);
			setCookie("AuthToken", response.data.token);
			setCookie("UserId", response.data.userId);

			const success = response.status === 201;

			if (success && isSignUp) navigate("/onboarding");
			if (success && !isSignUp) navigate("/dashboard");
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="auth-modal">
			<div onClick={handleClick}>
				<span className="close-icon">&#11198;</span>
			</div>
			<img className="tinder-logo-small" src={TinderLogoSmall}></img>
			<h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
			<p>
				By clicking Log in, you agree to our{" "}
				<a
					href="https://policies.tinder.com/terms?lang=en"
					target="_blank"
				>
					Terms
				</a>
				. Learn how we process your data in our{" "}
				<a
					href="https://policies.tinder.com/privacy?lang=en"
					target="_blank"
				>
					Privacy Policy
				</a>
				and
				<a
					href="https://policies.tinder.com/cookie-policy?lang=en"
					target="_blank"
				>
					Cookie Policy
				</a>
				.
			</p>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="email"
					required={true}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="password"
					required={true}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{isSignUp && (
					<input
						type="password"
						id="password-check"
						name="password-check"
						placeholder="confirm password"
						required={true}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				)}
				<input className="secondary-button" type="submit" />
				<p>{error}</p>
			</form>
			<hr />
			<h2>GET THE APP!</h2>
			<div className="phone-app-store">
				<a
					href="https://apps.apple.com/fr/app/tinder/id547702041"
					target="_blank"
				>
					<img className="apple-store-logo" src={AppleStoreLogo} />
				</a>
				<a
					href="https://play.google.com/store/apps/details?id=com.tinder&hl=fr&gl=US"
					target="_blank"
				>
					<img className="google-play-logo" src={GoogleStoreLogo} />
				</a>
			</div>
		</div>
	);
};
export default AuthModal;
