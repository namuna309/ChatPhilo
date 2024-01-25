// CSS
import '../../../CSS/chat/ChatRoom/ChatInputBox.css'

// Library
import React from 'react';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';

/**
 * ChatInputBox 컴포넌트
 * 사용자가 메시지를 입력하고 전송할 수 있는 입력 필드를 제공합니다.
 *
 * @param {Function} onMessageChange - 메시지 입력 변경시 호출되는 함수
 * @param {Function} onMessageSend - 메시지 전송(엔터 키 누름) 시 호출되는 함수
 * @returns React 컴포넌트 요소
 */

const ChatInputBox = ({ onMessageChange, onMessageSend }) => {
    return (
        <div className='chat-textarea-container'>
            <div className='chat-textarea-box'>
                <Input
                    className="msgInput"
                    endAdornment={
                        <InputAdornment position="end">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="rgb(0, 0, 0)" className="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
                            </svg>
                        </InputAdornment>
                    }
                    placeholder='Message to...'
                    variant="standard"
                    onChange={onMessageChange}
                    onKeyDown={onMessageSend}
                    required
                />
            </div>
        </div>
    );
};

export default ChatInputBox;
