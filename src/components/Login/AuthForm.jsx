import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AuthForm.scss';

const AuthForm = ({ isSignUp }) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(null);
    const [pendingAuth, setPendingAuth] = useState(null);
    const formRef = useRef(null);

    // Reset error when state changes
    useEffect(() => {
        setError('');
    }, [isForgotPassword, userData, token, otp, pendingAuth]);

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

        if ((isForgotPassword && userData && !token) || pendingAuth) {
            // Handle OTP verification
            if (!otp.trim()) {
                setError('OTP is required');
                toast.error('Please enter a valid OTP.');
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
                        // Complete login/signup
                        localStorage.setItem('userInfo', JSON.stringify(pendingAuth.userInfo));
                        toast.success(isSignUp ? 'Account created successfully!' : 'Logged in successfully!');
                        setPendingAuth(null);
                        navigate('/');
                    }
                } else {
                    setError('No token received from server');
                    toast.error('The server did not return a token. Please check the console for details.');
                }
            } else if (response.status === 401) {
                setError('Invalid OTP');
                toast.error('Invalid OTP. Please try again.');
            } else {
                setError('An unexpected error occurred');
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
                setError('Email not found');
                toast.error('Email not found. Please check your email.');
            } else {
                setError('An unexpected error occurred');
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
                // Prepare user info
                const userInfo = isSignUp
                    ? { name, email, type, password }
                    : { name: data.name || 'Unknown User', email, type, password };

                // Set pending auth state for OTP verification
                setPendingAuth({
                    userInfo,
                    email,
                    type,
                    id: isSignUp ? id : undefined,
                });
                setError('');
                toast.success('OTP sent to your email.');
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
            setError('New password is required');
            toast.error('Please enter a new password.');
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
                    navigate('/');
                    setIsForgotPassword(false);
                    setUserData(null);
                    setToken(null);
                    setOtp('');
                    setNewPassword('');
                }, 1000);
            } else if (response.status === 400) {
                setError('Email does not exist');
                toast.error('Email does not exist. Please try again.');
            } else {
                setError('Failed to reset password');
                toast.error(`Failed to reset password: ${data.message || 'Please try again later.'}`);
            }
        } else {
            setError('Invalid token or user data');
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
                        <input type="email" placeholder="Email" required />
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
                        <input type="email" placeholder="Email" required />
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