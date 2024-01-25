import React from 'react';

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

const CounselorList = ({ counselors, activeButtons, onCounselorClick }) => {
    return (
        <>
            {counselors.map((name, index) => (
                <div className='counselor-container' key={name}>
                    <button 
                        type='button' 
                        className={`btn btn-dark counselor-box ${activeButtons[index] ? 'active' : ''}`}
                        onClick={() => onCounselorClick(index)}
                    >
                        <div className='counselor-img-box btn'>
                            <div className='counselor-img'></div>
                        </div>
                        <div className='counselor-name'>
                            {name}
                        </div>
                        <div className='counselor-link-box'>
                            <div className='counselor-link-img'></div>
                        </div>
                    </button>
                </div>
            ))}
        </>
    );
};

export default CounselorList;