// src/components/AuthForm/AuthForm.jsx
import './AuthForm.scss'; // Import file SCSS thông thường

const AuthForm = ({ isSignUp }) => {
    return (
        <div className={`form-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
            <form>
                <h1>{isSignUp ? "Create Account" : "Sign In"}</h1>
                <div className="social-icons">
                    <a href="#" className="icon">
                        <i className="fab fa-google"></i>
                    </a>
                    <a href="#" className="icon">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="icon">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="#" className="icon">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
                <span>{isSignUp ? "or use your email for registration" : "or use your email"}</span>
                {isSignUp && <input type="text" placeholder="Name" required />}
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                {!isSignUp && <a href="#" className="forgot-password">Forget Your Password?</a>}
                <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
            </form>
        </div>
    );
};

export default AuthForm;