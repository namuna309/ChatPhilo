// CSS
import '../../CSS/chat/ChatRoom.css'

// Library
import React from 'react';

// Component
import ChatRoomBox from './ChatRoom/ChatRoomBox'; // 경로는 실제 파일 위치에 따라 조정해야 함
import ChatInputBox from './ChatRoom/ChatInputBox'; // 경로는 실제 파일 위치에 따라 조정해야 함

const ChatRoom = ({ dialog, isPending, onMessageChange, onMessageSend }) => {
    return (

        <div className='chat-room-container'>
            <div className='chat-room-info'></div>
            <ChatRoomBox dialog={dialog} isPending={isPending} />
            <div className='chat-room-box-divider'></div>
            <ChatInputBox
                onMessageChange={onMessageChange}
                onMessageSend={onMessageSend}
            />
        </div>
    );
};

export default ChatRoom;