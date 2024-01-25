import React from 'react';

/**
 * ChatDialogBox 컴포넌트
 * 채팅 대화 내용을 표시합니다.
 *
 * @param {Array} dialog - 채팅 대화 내용을 담고 있는 배열
 * @param {boolean} isPending - 메시지 전송이 진행 중인지 여부를 나타내는 상태
 * @returns React 컴포넌트 요소
*/

const ChatDialogBox = ({ dialog, isPending }) => {
    return (
        <div className='chat-dialog-box'>
            {dialog.map((message, index) => {
                let type = message.role === 'user' ? 'user' : 'counselor';

                return (
                    <div className={`chat-${type}-box`} key={index}>
                        <div className={`${type}-icon-box`}>
                            {/* 아이콘 SVG */}
                        </div>
                        <div className={`${type}-text-box`}>
                            {message.content[0].text.value}
                        </div>
                    </div>
                );
            })}

            {isPending && (
                <div className="chat-counselor-box">
                    <div className="counselor-icon-box"></div>
                    <div className="counselor-text-box">
                        <div className="spinner-border text-light" style={{height: '1.4rem', width:'1.4rem'}} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatDialogBox;