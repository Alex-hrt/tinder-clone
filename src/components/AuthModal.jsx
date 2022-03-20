import { useState } from "react";

const AuthModal = ({ setShowModal, isSignUp }) => {

    const [ email, setEmail ] = useState(null)
    const [ password, setPassword ] = useState(null)
    const [ confirmPassword, setConfirmPassword ] = useState(null)
    const [ error, setError ] = useState(null)

    console.log(email, password, confirmPassword)

    const handleClick = () => {
        setShowModal(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if ( isSignUp && ( password !== confirmPassword)) {
                setError("Passwords must be the same!")
            }
            console.log("make post request to DB");
        } catch {
            console.log(error);
        }
    }


    return (
        <div className="auth-modal">
            <div onClick={handleClick}><span className="close-icon">&#11198;</span></div>
            <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
            <p>By clicking Log in, you agree to our <a href="https://policies.tinder.com/terms?lang=en" target="_blank">Terms</a>. Learn how we process your data in our <a href="https://policies.tinder.com/privacy?lang=en" target="_blank">Privacy Policy</a> and <a href="https://policies.tinder.com/cookie-policy?lang=en" target="_blank">Cookie Policy</a>.</p>
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
                {isSignUp && <input
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="confirm password"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}
                <input className="secondary-button" type="submit"/>
                <p>{error}</p>
            </form>
            <hr/>
            <h2>GET THE APP!</h2>
            
            
            
            
            
        </div>
    )
}
export default AuthModal