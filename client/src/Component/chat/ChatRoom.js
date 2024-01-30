// CSS
import '../../CSS/chat/ChatRoom.css'

// Library
import React from 'react';

// Component
import ChatRoomBox from './ChatRoom/ChatRoomBox'; // 경로는 실제 파일 위치에 따라 조정해야 함
import ChatInputBox from './ChatRoom/ChatInputBox'; // 경로는 실제 파일 위치에 따라 조정해야 함

const ChatRoom = ({ curCounselor, dialog, isPending, chatBoxRef, onMessageChange, onMessageSend }) => {
    const fullNameDict = {
        'schopenhauer': 'Arthur Schopenhauer',
        'adler': 'Alfred Adler', 
        'jung': 'Carl Jung',
    }
    
    return (

        <div className='chat-room-container'>
            <div className='chat-room-info'>
                <div className='room-info-box px-4'>
                    <div className='room-info-text fw-semibold fs-5'>{fullNameDict[curCounselor]}</div>
                </div>
            </div>
            <ChatRoomBox curCounselor={curCounselor} dialog={dialog} isPending={isPending} chatBoxRef={chatBoxRef}/>
            <div className='chat-room-box-divider'></div>
            <ChatInputBox
                onMessageChange={onMessageChange}
                onMessageSend={onMessageSend}
            />
        </div>
    );
};

export default ChatRoom;