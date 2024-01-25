// CSS
import '../../../CSS/chat/Sidebar/AccountControls.css'

// Library
import React from 'react';

/**
 * AccountControls 컴포넌트
 * 사용자 계정 관련 컨트롤을 제공합니다.
 *
 * @param {string} username - 현재 로그인한 사용자의 이름
 * @param {string} logoutDsp - 로그아웃 버튼의 표시 상태를 제어하는 클래스명
 * @param {Function} onLogoutClick - 로그아웃 버튼 클릭 시 실행되는 함수
 * @param {Function} onAccountClick - 계정 버튼 클릭 시 실행되는 함수
 * @returns React 컴포넌트 요소
 */

const AccountControls = ({ username, logoutDsp, onLogoutClick, onAccountClick }) => {
    return (

        <div className='chat-account-container'>
            <button
                type='button'
                className={`logout btn btn-dark ${logoutDsp}`}
                onClick={onLogoutClick}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="white" className="bi bi-door-open-fill" viewBox="0 0 16 16">
                    <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11 2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                </svg>
                Log Out
            </button>
            <button
                type='button'
                className='chat-account btn btn-dark'
                onClick={onAccountClick}
            >
                <div className='chat-account-svg'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>
                </div>
                {username}
            </button>
        </div>
    );
};

export default AccountControls;
