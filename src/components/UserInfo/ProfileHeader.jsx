import { useState, useEffect } from 'react';
import './ProfileHeader.scss';

const ProfileHeader = () => {
    const [userInfo, setUserInfo] = useState({ name: '' });

    // Lấy thông tin người dùng từ localStorage khi component mount
    useEffect(() => {
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
        setUserInfo({
            name: storedUserInfo.name || '',
        });
    }, []);

    return (
        <div className="profile-header">
            <i className="fas fa-user avatar"></i>
            <h2>{userInfo.name || 'Unknown User'}</h2>
        </div>
    );
};

export default ProfileHeader;