// Library
import React from 'react';

// Img
import schopenhauerImg from '../../../Img/profile/SchopenhauerProfilePicture.png';
import adlerImg from '../../../Img/profile/AdlerProfilePicture.png'
import confuciusImg from '../../../Img/profile/ConfuciusProfilePicture.png'

//CSS
import '../../../CSS/chat/ChatRoom/CounselorProfiles.css'

const CounselorProfiles = () => {
    return (
        <div className="counselor-profiles-container">
            <div className='counselor-profile-box'>
                <div className='counselor-profile-img'>
                    <img src={schopenhauerImg} />
                </div>
                <div className='counselor-profile-name'>
                    <div className='counselor-profile-name-kor fs-3 fw-bold'>쇼펜하우어</div>
                    <div className='counselor-profile-name-eng fs-5'>Arthur Schopenhau</div>
                </div>
                <div className='counselor-profile-content fs-6'>
                    <p className='lh-base'>쇼펜하우어는 <span className='fw-bold'>독일의 철학자</span>로, 주로 <span className='fw-bold'>비관주의적 세계관</span>과 <span className='fw-bold'>의지의 철학</span>으로 유명합니다.</p>
                    <p className='lh-base'>그의 가장 중요한 저작은 <span className='fw-bold'>"의지와 표상으로서의 세계"(1818)</span> 입니다. 이 책에서 그는 현실을 의지와 인식의 산물로 해석합니다.</p>
                    <p className='lh-base'>쇼펜하우어는 쾌락이 아닌 <span className='fw-bold'>고통이 인생의 근본적인 본질</span>이라고 주장하며, 이를 통해 인간 존재의 고통과 불만을 탐구했습니다.</p>
                    <p className='lh-base'>그의 철학은 19세기 후반과 20세기 초에 큰 영향을 끼쳤으며, <span className='fw-bold'>비관주의, 의지론, 그리고 인생과 예술에 대한 그의 독특한 관점</span>으로 인해 오늘날까지도 연구되고 있습니다.</p>
                </div>
            </div>
            <div className='counselor-profile-box'>
                <div className='counselor-profile-img'>
                    <img src={adlerImg} />
                </div>
                <div className='counselor-profile-name'>
                    <div className='counselor-profile-name-kor fs-3 fw-bold'>알프레드 아들러</div>
                    <div className='counselor-profile-name-eng fs-5'>Alfred Adler</div>
                </div>
                <div className='counselor-profile-content fs-6'>
                    <p className='lh-base'>알프레드 아들러는 <span className='fw-bold'>개인심리학의 창시자</span>이자 오스트리아의 의사 및 심리치료사입니다. </p>
                    <p className='lh-base'>그는 사회적 상호작용과 생활양식이 인간의 행동과 성격을 형성한다고 보았으며, 특히 <span className='fw-bold'>열등감과 보상</span>의 개념을 중요하게 다루었습니다. 아들러는 개인이 자신의 열등감을 극복하고 더 나은 삶을 추구하는 데 중요한 동기를 부여한다고 봤습니다</p>
                    <p className='lh-base'>또한, 그는 <span className='fw-bold'>공동체감의 중요성</span>을 강조하며, 이는 사회적 관심과 타인에 대한 배려를 통해 발달한다고 주장했습니다. 이러한 아들러의 이론은 교육과 심리치료, 개인 발달에 큰 영향을 미쳤습니다.</p>
                </div>
            </div>
            <div className='counselor-profile-box'>
                <div className='counselor-profile-img'>
                    <img src={confuciusImg} />
                </div>
                <div className='counselor-profile-name'>
                    <div className='counselor-profile-name-kor fs-3 fw-bold'>공자</div>
                    <div className='counselor-profile-name-eng fs-5'>Confucius</div>
                </div>
                <div className='counselor-profile-content fs-6'>
                    <p className='lh-base'>공자는 중국의 유명한 <span className='fw-bold'>사상가이자 교육가</span>로, <span className='fw-bold'>유교의 창시자</span>입니다. 그의 가르침은 도덕적, 윤리적, 정치적 이상을 중심으로 하며, 사회의 조화와 질서에 큰 중점을 둡니다.</p>
                    <p className='lh-base'>공자는 <span className='fw-bold'>인(仁, 인류애), 예(禮, 예절), 신(信, 신의)</span> 같은 핵심 가치를 강조했으며, 이는 개인의 덕성과 사회적 책임을 강조하는 데 기여했습니다. 그의 교육과 철학은 오늘날에도 아시아 전역의 문화, 사회, 정치에 깊은 영향을 미치고 있으며, 그의 사상은 <span className='fw-bold'>논어</span>를 통해 전해지고 있습니다.</p>
                    <p className='lh-base'>공자는 성숙한 도덕적 인격을 갖춘 <span className='fw-bold'>군자</span>의 이상을 제시하며, 이는 오늘날에도 많은 사람들에게 존경과 본보기로 여겨지고 있습니다.</p>
                </div>
            </div>
        </div>
    );
}

export default CounselorProfiles;