import './ProfileCard.scss';
import ProfileHeader from './ProfileHeader';
import ProfileBody from './ProfileBody';

const ProfileCard = () => {
    return (
        <div className="profile-card">
            <ProfileHeader />
            <ProfileBody />
        </div>
    );
};

export default ProfileCard;