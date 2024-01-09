// CSS
import '../../CSS/main.css';

// Component
import Banner from '../../Component/main/Banner';
import Account from '../../Component/main/Account';
import { useEffect } from 'react';


function Main() {
    return (
        <div className="main-container">
            <Banner/>
            <Account/>
        </div>
    )
}

export default Main;