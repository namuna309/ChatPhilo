// CSS
import '../../CSS/chat/ChatRoom.css'

// Library
import React from 'react';

// Component
import ChatRoomBox from './ChatRoom/ChatRoomBox'; // 경로는 실제 파일 위치에 따라 조정해야 함
import ChatInputBox from './ChatRoom/ChatInputBox'; // 경로는 실제 파일 위치에 따라 조정해야 함
import CounselorProfiles from './ChatRoom/CounselorProfiles';
import Attention from './ChatRoom/Attention';

const ChatRoom = ({ curCounselor, dialog, isPending, chatBoxRef, onMessageChange, onMessageSend, dialogLoading }) => {
    const fullNameDict = {
        'schopenhauer': 'Arthur Schopenhauer',
        'adler': 'Alfred Adler', 
        'confucius': '공자',
    }
    
    return (

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
    );
};

export default ChatRoom;