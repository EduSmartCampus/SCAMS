import { useState, useEffect, useRef } from "react";
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
  const [userInfo, setUserInfo] = useState({ name: '', email: '', type: '', id: '' });

  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo")) || {};
    setUserInfo({
      name: storedUser.name || '',
      email: storedUser.email || '',
      type: storedUser.type || '',
      id: storedUser.id || '',
    });
  }, []);

  useEffect(() => {
    if (userInfo.id) console.log("User ID:", userInfo.id);
  }, [userInfo.id]);

  const togglePassword = (ref) => {
    if (ref.current) {
      ref.current.type = ref.current.type === "password" ? "text" : "password";
    }
  };

  const checkPasswordStrength = (password) => {
    const newRequirements = {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    const strength = Object.values(newRequirements).filter(Boolean).length * 20;
    setPasswordRequirements(newRequirements);
    setPasswordStrength(strength);
  };

  const isPasswordStrong = () =>
      Object.values(passwordRequirements).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isChangingPassword) {
      const currentPassword = currentPasswordRef.current.value;
      const newPassword = newPasswordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;

      if (newPassword !== confirmPassword) {
        toast.error("New password does not match!");
        return;
      }

      if (!isPasswordStrong()) {
        toast.error("Password is not strong enough!");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/changePassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
          },
          body: JSON.stringify({
            email: userInfo.email,
            oldPassword: currentPassword,
            newPassword,
            type: userInfo.type,
          }),
        });

        if (response.ok) {
          toast.success("Password changed successfully!");
          resetPasswordForm();
        } else if (response.status === 401) {
          toast.error("Incorrect current password!");
        } else if (response.status === 404) {
          toast.error("User not found!");
        } else {
          toast.error("Internal server error!");
        }
      } catch (error) {
        toast.error("Network error. Please try again.");
      }

    } else if (isEditing) {
      if (!userInfo.name.trim() || !userInfo.email.trim()) {
        toast.error("Name and Email cannot be empty.");
        return;
      }

      const updatedUser = {
        ...userInfo,
      };

      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      setUserInfo(updatedUser);
      setIsEditing(false);
      toast.success("Information updated successfully!");
    }
  };

  const resetPasswordForm = () => {
    currentPasswordRef.current.value = "";
    newPasswordRef.current.value = "";
    confirmPasswordRef.current.value = "";
    setIsChangingPassword(false);
    setPasswordStrength(0);
    setPasswordRequirements({
      length: false,
      upper: false,
      lower: false,
      number: false,
      special: false,
    });
  };

  return (
      <div className="profile-body">
        <form onSubmit={handleSubmit}>
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

          <div className="form-group">
            <label htmlFor="id">
              {userInfo.type === "student" ? "Student ID" : userInfo.type === "lecturer" ? "Lecturer ID" : "Staff ID"}
            </label>
            <input
                type="text"
                id="id"
                className="form-control"
                value={userInfo.id}
                disabled
            />
          </div>

          {!isEditing && !isChangingPassword && (
              <div className="button-group main-buttons">
                <button type="button" className="btn btn-primary" onClick={() => setIsEditing(true)}>
                  <i className="fas fa-edit"></i> Edit Information
                </button>
                <button type="button" className="btn btn-warning" onClick={() => setIsChangingPassword(true)}>
                  <i className="fas fa-lock"></i> Change Password
                </button>
              </div>
          )}

          {isEditing && (
              <div className="button-group edit-buttons">
                <button type="submit" className="btn btn-success">
                  <i className="fas fa-save"></i> Save Changes
                </button>
                <button type="button" className="btn btn-danger" onClick={() => setIsEditing(false)}>
                  <i className="fas fa-times"></i> Cancel
                </button>
              </div>
          )}

          {isChangingPassword && (
              <div className="password-section">
                <h2>Change Password</h2>

                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" className="form-control" ref={currentPasswordRef} />
                  <span className="password-toggle" onClick={() => togglePassword(currentPasswordRef)}>
                <i className="fas fa-eye"></i>
              </span>
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <input
                      type="password"
                      className="form-control"
                      ref={newPasswordRef}
                      onChange={(e) => checkPasswordStrength(e.target.value)}
                  />
                  <span className="password-toggle" onClick={() => togglePassword(newPasswordRef)}>
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
                      <li className={passwordRequirements.length ? "valid" : ""}>At least 8 characters</li>
                      <li className={passwordRequirements.upper ? "valid" : ""}>At least 1 uppercase letter</li>
                      <li className={passwordRequirements.lower ? "valid" : ""}>At least 1 lowercase letter</li>
                      <li className={passwordRequirements.number ? "valid" : ""}>At least 1 number</li>
                      <li className={passwordRequirements.special ? "valid" : ""}>At least 1 special character</li>
                    </ul>
                  </div>
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" className="form-control" ref={confirmPasswordRef} />
                  <span className="password-toggle" onClick={() => togglePassword(confirmPasswordRef)}>
                <i className="fas fa-eye"></i>
              </span>
                </div>

                <div className="button-group">
                  <button type="submit" className="btn btn-success">
                    <i className="fas fa-save"></i> Save Password
                  </button>
                  <button type="button" className="btn btn-danger" onClick={resetPasswordForm}>
                    <i className="fas fa-times"></i> Cancel
                  </button>
                </div>
              </div>
          )}
        </form>

        <ToastContainer position="top-right" autoClose={3000} theme="light" />
      </div>
  );
};

export default ProfileBody;
