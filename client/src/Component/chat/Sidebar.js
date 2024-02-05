// CSS
import '../../CSS/chat/Sidebar.css'

// Library
import React from 'react';

//Component
import CounselorList from './Sidebar/CounselorList';
import AccountControls from './Sidebar/AccountControls';

const Sidebar = ({ isMobile, isSidebarOpen, handleSidebarCloseBtn, counselors, activeButtons, onCounselorClick, handleThreadDelete, username, logoutDsp, onLogoutClick, onAccountClick }) => {
    return (
        <>
        {(!isMobile || isSidebarOpen) && (
            <div className={`sidebar-container`}>
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
                <div className='sidebar-close-btn' onClick={handleSidebarCloseBtn}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#6c757d" className="bi bi-x-square-fill closeBtn-icon" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
                    </svg>
                </div>
            </div>
        )}
        </>
    );
};

export default Sidebar;
