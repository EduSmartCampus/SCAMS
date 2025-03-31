import './HeaderHome.scss'
import SearchBar from "../SearchBar/SearchBar";

const HeaderHome = () => {
    return (
        <div className='header'>
            <SearchBar />
            <div className='welcome'>
                <span>Welcome </span>
                Guest !
            </div>
        </div>
    );
}

export default HeaderHome;