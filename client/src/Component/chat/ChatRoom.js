// CSS
import '../../CSS/chat/ChatRoom.css'

// Library
import React from 'react';

// Component
import ChatRoomBox from './ChatRoom/ChatRoomBox'; // 경로는 실제 파일 위치에 따라 조정해야 함
import ChatInputBox from './ChatRoom/ChatInputBox'; // 경로는 실제 파일 위치에 따라 조정해야 함
import CounselorProfiles from './ChatRoom/CounselorProfiles';
import Attention from './ChatRoom/Attention';

const ChatRoom = ({ handleSidebar, curCounselor, dialog, isPending, chatBoxRef, onMessageChange, onMessageSend, dialogLoading }) => {
    const fullNameDict = {
        'schopenhauer': 'Arthur Schopenhauer',
        'adler': 'Alfred Adler', 
        'confucius': '공자',
    }
    
    return (
        <>
        <button type="button" class="menu-toggle btn btn-secondary" onClick={handleSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-list" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
        </button>
        <div className='chat-room-container'>
            { curCounselor ? (
                <>
                <div className='chat-room-info'>
                <div className='room-info-box px-4'>
                    <div className='room-info-text fw-semibold fs-5'>{fullNameDict[curCounselor]}</div>
                </div>
            </div>
            <ChatRoomBox curCounselor={curCounselor} dialog={dialog} isPending={isPending} chatBoxRef={chatBoxRef} dialogLoading={dialogLoading}/>
            <div className='chat-room-box-divider'></div>
            <ChatInputBox
                onMessageChange={onMessageChange}
                onMessageSend={onMessageSend}
            />
                </>
            ) : <>
            <CounselorProfiles/>
            <Attention/>
            </> }
            
        </div>
        </>
    );
};

export default ChatRoom;