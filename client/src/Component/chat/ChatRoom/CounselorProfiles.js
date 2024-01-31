// Library
import React from 'react';

// Img
import schopenhauerImg from '../../../Img/profile/SchopenhauerProfilePicture.png';

//CSS
import '../../../CSS/chat/ChatRoom/CounselorProfiles.css'

const CounselorProfiles = () => {
    return (
        <div className="counselor-profiles-container">
            <div className='counselor-profile-box'>
                <div className='counselor-profile-img'>
                    <img src={schopenhauerImg}/>
                </div>
                <div className='couselor-profile-name'>
                    <div className='couselor-profile-name-kor fs-3 fw-bold'>쇼펜하우어</div>
                    <div className='couselor-profile-name-eng fs-5'>Arthur Schopenhau</div>
                </div>
                <div className='couselor-profile-content fs-6'>
                <p className='lh-base'>쇼펜하우어는 <span className='fw-bold'>독일의 철학자</span>로, 주로 <span className='fw-bold'>비관주의적 세계관</span>과 <span className='fw-bold'>의지의 철학</span>으로 유명합니다.</p>
                <p className='lh-base'>그의 가장 중요한 저작은 <span className='fw-bold'>"의지와 표상으로서의 세계"(1818)</span> 입니다. 이 책에서 그는 현실을 의지와 인식의 산물로 해석합니다.</p>
                <p className='lh-base'>쇼펜하우어는 쾌락이 아닌 <span className='fw-bold'>고통이 인생의 근본적인 본질</span>이라고 주장하며, 이를 통해 인간 존재의 고통과 불만을 탐구했습니다.</p>
                <p className='lh-base'>그의 철학은 19세기 후반과 20세기 초에 큰 영향을 끼쳤으며, <span className='fw-bold'>비관주의, 의지론, 그리고 인생과 예술에 대한 그의 독특한 관점</span>으로 인해 오늘날까지도 연구되고 있습니다.</p>

                </div>
            </div>
            <div className='counselor-profile-box'></div>
            <div className='counselor-profile-box'></div>
        </div>
    );
}

export default CounselorProfiles;