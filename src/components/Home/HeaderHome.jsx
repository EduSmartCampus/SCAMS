import './HeaderHome.scss'
import SearchBar from "../SearchBar/SearchBar";
import { useEffect } from 'react';

const HeaderHome = () => {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

    useEffect(() => {
        console.log('userInfo', userInfo)
    }, [userInfo])

    return (
        <div className='header'>
            <SearchBar />
            <div className='welcome'>
                <span>Welcome </span>
                {userInfo?.name || 'Guest'}!
            </div>
        </div>
    );
}

export default HeaderHome;