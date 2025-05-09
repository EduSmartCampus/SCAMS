import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProfileBody.scss";

const ProfileBody = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });
  const [userInfo, setUserInfo] = useState({ name: '', email: '', type: '' });

  // Lấy thông tin người dùng từ localStorage khi component mount
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    setUserInfo({
      name: storedUserInfo.name || '',
      email: storedUserInfo.email || '',
      type: storedUserInfo.type || '',
    });
  }, []);

  const togglePassword = (inputId) => {
    const input = document.getElementById(inputId);
    const icon = document.querySelector(`#${inputId} + .password-toggle i`);

    if (input.type === "password") {
      input.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      input.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    const newRequirements = {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    Object.values(newRequirements).forEach((met) => {
      if (met) strength += 20;
    });

    setPasswordRequirements(newRequirements);
    setPasswordStrength(strength);
  };

  const isPasswordStrong = () => {
    return Object.values(passwordRequirements).every(
        (requirement) => requirement
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isChangingPassword) {
      const currentPassword = e.target.currentPassword.value;
      const newPassword = e.target.newPassword.value;
      const confirmPassword = e.target.confirmPassword.value;

      if (newPassword !== confirmPassword) {
        toast.error("New password does not match!");
        return;
      }

      if (!isPasswordStrong()) {
        toast.error("Password is not strong enough! Please check the requirements.");
        return;
      }

      const response = await fetch('http://localhost:3000/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
        },
        body: JSON.stringify({
          email: userInfo.email,
          oldPassword: currentPassword,
          newPassword,
          type: userInfo.type,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success("Password changed successfully!");
        setIsChangingPassword(false);
        e.target.reset();
        setPasswordStrength(0);
        setPasswordRequirements({
          length: false,
          upper: false,
          lower: false,
          number: false,
          special: false,
        });
      } else if (response.status === 401) {
        toast.error("Incorrect current password!");
      } else if (response.status === 404) {
        toast.error("User not found!");
      } else if (response.status === 500) {
        toast.error("An internal server error occurred. Please try again later.");
      }
    } else if (isEditing) {
      // Cập nhật thông tin người dùng trong localStorage
      const updatedUserInfo = {
        ...userInfo,
        name: e.target.name.value,
        email: e.target.email.value,
        type: e.target.type.value,
      };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      setUserInfo(updatedUserInfo);

      toast.success("Information updated successfully!");
      setIsEditing(false);
    }
  };

  return (
      <div className="profile-body">
        <form id="profileForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
                type="text"
                id="name"
                className="form-control"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                className="form-control"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Role</label>
            <input
                type="text"
                id="type"
                className="form-control"
                value={userInfo.type}
                onChange={(e) => setUserInfo({ ...userInfo, type: e.target.value })}
                disabled={!isEditing}
            />
          </div>

          <div
              className="button-group main-buttons"
              style={{ display: isEditing || isChangingPassword ? "none" : "flex" }}
          >
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
            >
              <i className="fas fa-edit"></i> Edit Information
            </button>
            <button
                type="button"
                className="btn btn-warning"
                onClick={() => setIsChangingPassword(true)}
            >
              <i className="fas fa-lock"></i> Change Password
            </button>
          </div>

          <div
              className="button-group edit-buttons"
              style={{ display: isEditing ? "flex" : "none" }}
          >
            <button type="submit" className="btn btn-success">
              <i className="fas fa-save"></i> Save Changes
            </button>
            <button
                type="button"
                className="btn btn-danger"
                onClick={() => setIsEditing(false)}
            >
              <i className="fas fa-times"></i> Cancel
            </button>
          </div>

          <div
              id="passwordSection"
              className="password-section"
              style={{ display: isChangingPassword ? "block" : "none" }}
          >
            <h2>Change Password</h2>

            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                  type="password"
                  id="currentPassword"
                  className="form-control"
              />
              <span
                  className="password-toggle"
                  onClick={() => togglePassword("currentPassword")}
              >
              <i className="fas fa-eye"></i>
            </span>
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                  type="password"
                  id="newPassword"
                  className="form-control"
                  onChange={(e) => checkPasswordStrength(e.target.value)}
              />
              <span
                  className="password-toggle"
                  onClick={() => togglePassword("newPassword")}
              >
              <i className="fas fa-eye"></i>
            </span>
              <div className="password-strength">
                <div
                    className="password-strength-bar"
                    style={{
                      width: `${passwordStrength}%`,
                      backgroundColor:
                          passwordStrength < 40
                              ? "var(--danger-color)"
                              : passwordStrength < 80
                                  ? "var(--warning-color)"
                                  : "var(--success-color)",
                    }}
                ></div>
              </div>
              <div className="password-requirements">
                <p>Password must meet the following requirements:</p>
                <ul>
                  <li className={passwordRequirements.length ? "valid" : ""}>
                    At least 8 characters
                  </li>
                  <li className={passwordRequirements.upper ? "valid" : ""}>
                    At least 1 uppercase letter
                  </li>
                  <li className={passwordRequirements.lower ? "valid" : ""}>
                    At least 1 lowercase letter
                  </li>
                  <li className={passwordRequirements.number ? "valid" : ""}>
                    At least 1 number
                  </li>
                  <li className={passwordRequirements.special ? "valid" : ""}>
                    At least 1 special character
                  </li>
                </ul>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
              />
              <span
                  className="password-toggle"
                  onClick={() => togglePassword("confirmPassword")}
              >
              <i className="fas fa-eye"></i>
            </span>
            </div>

            <div className="button-group">
              <button type="submit" className="btn btn-success">
                <i className="fas fa-save"></i> Save Password
              </button>
              <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setIsChangingPassword(false)}
              >
                <i className="fas fa-times"></i> Cancel
              </button>
            </div>
          </div>
        </form>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
      </div>
  );
};

export default ProfileBody;