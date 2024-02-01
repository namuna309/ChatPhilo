// CSS
import '../../../CSS/chat/Sidebar/CounselorList.css'

// Library
import React, { useState } from 'react';
// Img
import schopenhauerImg from '../../../Img/profile/SchopenhauerProfilePicture.png';
import adlerImg from '../../../Img/profile/AdlerProfilePicture.png'
import confuciusImg from '../../../Img/profile/ConfuciusProfilePicture.png'

/**
 * CounselorList 컴포넌트
 * 상담사 목록을 표시하고, 각 상담사를 선택할 수 있는 버튼을 제공합니다.
 *
 * @param {Array} counselors - 표시할 상담사 목록
 * @param {Array} activeButtons - 각 상담사 버튼의 활성화 상태를 나타내는 배열
 * @param {Function} onCounselorClick - 상담사 버튼 클릭 시 실행할 함수
 * @returns React 컴포넌트 요소
 * 
 */

const CounselorList = ({ counselors, activeButtons, onCounselorClick, handleThreadDelete }) => {
    const [profileImg, setProfileImg] = useState([schopenhauerImg, adlerImg, confuciusImg])
    return (
        <div className='chat-list'>
            {counselors.map((name, index) => (
                <div className='counselor-container' key={name}>
                    <button
                        type='button'
                        className={`btn btn-dark counselor-box ${activeButtons[index] ? 'active' : ''}`}
                        onClick={(e) => onCounselorClick(e, index)}
                    >
                        <div className='counselor-img-box btn'>
                            <div className='counselor-img'><img src={profileImg[index]}/></div>
                        </div>
                        <div className='counselor-name'>
                            {name}
                        </div>

                    </button>
                    <button type='button' className={`btn btn-dark counselor-delete-box ${activeButtons[index] ? 'active' : 'delete-hide'}`} onClick={(e) => handleThreadDelete(e, index)}>
                        <div className={`counselor-delete-img ${activeButtons[index]}`}>
                            <svg className='thread-delete-btn bi bi-trash3' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16" >
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>
                        </div>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CounselorList;