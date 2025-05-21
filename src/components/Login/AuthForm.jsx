import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AuthForm.scss';

const AuthForm = ({ isSignUp, setIsSignUp }) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(null);
    const [pendingAuth, setPendingAuth] = useState(null);
    const formRef = useRef(null);
    const emailInputRef = useRef(null);

    // Password validation function
    const validatePassword = (password) => {
        // Check requirements in order
        if (password.length < 8) {
            return { isValid: false, message: 'Password must be at least 8 characters long.' };
        }
        if (!/[A-Z]/.test(password)) {
            return { isValid: false, message: 'Password must contain at least one uppercase letter.' };
        }
        if (!/[a-z]/.test(password)) {
            return { isValid: false, message: 'Password must contain at least one lowercase letter.' };
        }
        if (!/[0-9]/.test(password)) {
            return { isValid: false, message: 'Password must contain at least one number.' };
        }
        if (!/[^A-Za-z0-9]/.test(password)) {
            return { isValid: false, message: 'Password must contain at least one special character.' };
        }
        return { isValid: true, message: '' };
    };

    // Reset error when state changes
    useEffect(() => {
        setError('');
    }, [isForgotPassword, userData, token, otp, pendingAuth]);

    // Auto-focus email input after switching to login form post-signup
    useEffect(() => {
        if (!isSignUp && !isForgotPassword && !pendingAuth && emailInputRef.current) {
            emailInputRef.current.focus();
        }
    }, [isSignUp, isForgotPassword, pendingAuth]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = formRef.current;
        const email = form.querySelector('input[type="email"]')?.value;
        const password = form.querySelector('input[type="password"]')?.value;
        const type = isSignUp ? 'student' : form.querySelector('select[name="type"]')?.value;
        const id = isSignUp ? form.querySelector('input[name="studentId"]')?.value : undefined;
        const name = isSignUp ? form.querySelector('input[type="text"]')?.value : '';

        if (!isForgotPassword && !pendingAuth && !form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Validate password for signup
        if (isSignUp && password) {
            const passwordValidation = validatePassword(password);
            if (!passwordValidation.isValid) {
                toast.error(passwordValidation.message);
                return;
            }
        }

        if ((isForgotPassword && userData && !token) || pendingAuth) {
            // Handle OTP verification (only for login or forgot password)
            if (!otp.trim()) {
                toast.error('Please enter a valid OTP.');
                return;
            }

            // Kiểm tra OTP chỉ chứa số
            if (!/^\d+$/.test(otp.trim())) {
                toast.error('Invalid OTP');
                return;
            }

            const otpData = pendingAuth || {
                email: userData.email || email,
                type: userData.type,
                id: userData.id,
            };

            const response = await fetch('http://localhost:3000/checkOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: otpData.email,
                    otp: parseInt(otp, 10),
                    type: otpData.type,
                    id: otpData.id,
                }),
            });

            if (response.status === 200) {
                const data = await response.json();
                if (data.token) {
                    // Store token in localStorage
                    localStorage.setItem('authToken', data.token);
                    setToken(data.token);
                    setError('');
                    toast.success('OTP verified successfully!');

                    if (pendingAuth) {
                        // Complete login
                        localStorage.setItem('userInfo', JSON.stringify(pendingAuth.userInfo));
                        toast.success('Logged in successfully!');
                        setPendingAuth(null);
                        navigate('/home');
                    }
                } else {
                    toast.error('Invalid OTP. Please try again.');
                }
            } else if (response.status === 401) {
                toast.error('Invalid OTP. Please try again.');
            } else {
                toast.error('An unexpected error occurred. Please try again later.');
            }
        } else if (isForgotPassword && !userData) {
            // Handle OTP request for forgot password
            if (!email || !type) {
                setError('Email and role are required');
                form.reportValidity();
                return;
            }

            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, type, forget: 1 }),
            });

            if (response.status === 200) {
                const data = await response.json();
                setUserData({ ...data, email });
                setError('');
                toast.success('OTP sent to your email.');
            } else if (response.status === 401) {
                toast.error('Email not found. Please check your email.');
            } else {
                toast.error('An unexpected error occurred. Please try again later.');
            }
        } else {
            // Handle signup or login
            const endpoint = isSignUp ? 'http://localhost:3000/signup' : 'http://localhost:3000/login';
            const requestBody = isSignUp
                ? { name, email, password, type, id, forget: 0 }
                : { email, password, type, forget: 0 };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.status === 200 || response.status === 201) {
                const data = await response.json();
                if (isSignUp) {
                    // Handle signup: show success message and switch to login
                    toast.success('Account created successfully! Please sign in.');
                    setError('');
                    setIsSignUp(false); // Switch to login form
                } else {
                    // Handle login: proceed with OTP verification
                    const userInfo = {
                        name: data.name || 'Unknown User',
                        email,
                        type,
                        password,
                        id: data.id || null,
                    };
                    setPendingAuth({
                        userInfo,
                        email,
                        type,
                    });
                    setError('');
                    toast.success('OTP sent to your email.');
                }
            } else if (response.status === 400) {
                toast.error(isSignUp ? 'Email already exists' : 'Invalid email or role');
            } else if (response.status === 401 || response.status === 500) {
                toast.error('Invalid email or password');
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };

    const handleResetPassword = async () => {
        if (!newPassword.trim()) {
            toast.error('Please enter a new password.');
            return;
        }

        // Validate new password for reset
        const passwordValidation = validatePassword(newPassword);
        if (!passwordValidation.isValid) {
            toast.error(passwordValidation.message);
            return;
        }

        if (token && userData) {
            const response = await fetch('http://localhost:3000/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    email: userData.email,
                    newPassword,
                    type: userData.type,
                }),
            });

            const data = await response.json();

            if (response.status === 201) {
                // Update password in localStorage
                const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
                userInfo.password = newPassword;
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                // Store token in localStorage
                localStorage.setItem('authToken', token);
                toast.success('Password reset successfully!');
                setTimeout(() => {
                    navigate('/home');
                    setIsForgotPassword(false);
                    setUserData(null);
                    setToken(null);
                    setOtp('');
                    setNewPassword('');
                }, 1000);
            } else if (response.status === 400) {
                toast.error('Email does not exist. Please try again.');
            } else {
                toast.error(`Failed to reset password: ${data.message || 'Please try again later.'}`);
            }
        } else {
            toast.error('Invalid token or user data. Please try again.');
        }
    };

    const handleForgotPasswordClick = (e) => {
        e.preventDefault();
        setIsForgotPassword(true);
        setError('');
        setUserData(null);
        setToken(null);
        setOtp('');
        setNewPassword('');
    };

    return (
        <div className={`form-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
            <form ref={formRef}>
                <h1>{isSignUp ? 'Create Account' : 'Sign In'}</h1>
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
                <span>{isSignUp ? 'or use your email for registration' : 'or use your email'}</span>
                {error && <p className="error-message">{error}</p>}
                {!isForgotPassword && !pendingAuth && (
                    <>
                        {isSignUp && <input type="text" placeholder="Name" required />}
                        <input type="email" placeholder="Email" required ref={emailInputRef} />
                        <input type="password" placeholder="Password" required />
                        {isSignUp ? (
                            <input type="text" name="studentId" placeholder="Student ID" required />
                        ) : (
                            <select name="type" required>
                                <option value="" disabled selected>
                                    Select your role
                                </option>
                                <option value="student">Student</option>
                                <option value="staff">Staff</option>
                                <option value="lecturer">Lecturer</option>
                            </select>
                        )}
                        {!isSignUp && (
                            <a href="#" className="forgot-password" onClick={handleForgotPasswordClick}>
                                Forget Your Password?
                            </a>
                        )}
                        <button type="button" onClick={handleSubmit}>
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </button>
                    </>
                )}
                {isForgotPassword && !userData && (
                    <>
                        <input type="email" placeholder="Email" required ref={emailInputRef} />
                        <select name="type" required>
                            <option value="" disabled selected>
                                Select your role
                            </option>
                            <option value="student">Student</option>
                            <option value="staff">Staff</option>
                            <option value="lecturer">Lecturer</option>
                        </select>
                        <button type="button" onClick={handleSubmit}>
                            Request OTP
                        </button>
                    </>
                )}
                {(isForgotPassword && userData && !token) || pendingAuth ? (
                    <>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            required
                        />
                        <button type="button" onClick={handleSubmit}>
                            Verify OTP
                        </button>
                    </>
                ) : null}
                {isForgotPassword && userData && token && (
                    <>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter New Password"
                            required
                        />
                        <button type="button" onClick={handleResetPassword}>
                            Reset Password
                        </button>
                    </>
                )}
            </form>
            <ToastContainer />
        </div>
    );
};

export default AuthForm;