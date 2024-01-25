// CSS
import '../../CSS/chat/Sidebar.css'

// Library
import React from 'react';

//Component
import CounselorList from './Sidebar/CounselorList';
import AccountControls from './Sidebar/AccountControls';

const Sidebar = ({ counselors, activeButtons, onCounselorClick, handleThreadDelete, username, logoutDsp, onLogoutClick, onAccountClick }) => {
    return (
        <div className='sidebar-container'>
            <div className='sidebar-box'>
                <CounselorList
                    counselors={counselors}
                    activeButtons={activeButtons}
                    onCounselorClick={onCounselorClick}
                    handleThreadDelete={handleThreadDelete}
                />
                <AccountControls
                    username={username}
                    logoutDsp={logoutDsp}
                    onLogoutClick={onLogoutClick}
                    onAccountClick={onAccountClick}
                />
            </div>
        </div>
    );
};

export default Sidebar;
