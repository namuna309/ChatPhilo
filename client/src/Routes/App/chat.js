// CSS
import '../../CSS/chat.css'

// Library
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import io from "socket.io-client";

// Components
import CounselorBox from '../../Component/chat/chatList/CounselorBox';
import { useQuery } from '@tanstack/react-query';


function Chat() {
    

    const [searchParams] = useSearchParams();
    const rid = searchParams.get('rid');
    const [message, setMassage] = useState('');

    const socket = io.connect(`http://localhost:8080`,{
        cors: { origin: '*' }
      });
    
    if (rid != null) socket.emit('ask-join', rid);

    socket.on(`braodcast-${rid}`, (msg) => {
        console.log(msg);
    })
    const sendMessage = () => {
        
        let msg_input = document.getElementsByClassName('msgInput');
        let msg = msg_input[0].value;
        console.log(msg);
        if(rid != null && msg.trim() != null) {
            socket.emit("send", {msg: msg, rid: rid});
            msg_input[0].value = null;
        }
        else {
            alert('상담사를 선택해주세요')
        }
        
      };

    if (rid != null) {
        fetch(`http://localhost:8080/c?rid=${rid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            credentials: 'include',
        })
            .then((res) => {return res})
            .then((res) => {
                console.log(res);
            })
            .catch(err => console.log(err));
    } else if(rid == null) {
        console.log(null);
    }
    
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [logoutDsp, setLogout] = useState('logout-hide');
    
    let uq = useQuery({queryKey:'accout', queryFn: () => {
        fetch('http://localhost:8080/session', {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            credentials: 'include',
        })
            .then((res) => { return res.json() })
            .then((user) => {
                setUsername(user.username);
            })
            .catch(err => navigate('../'));
    }})
    

    function logout(e) {
        fetch('http://localhost:8080/logout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            credentials: 'include',
        })
            .then((res) => { return res.status })
            .then((res) => {
                console.log(res);
                window.location.href = 'http://localhost:3000'
            })
            .catch((err) => console.log(err))
    }



    return (
        <>
            <div className="chat-container">
                <div className='chat-list-container'>
                    <div className='chat-list-box'>
                        <div className='chat-list'>
                            <CounselorBox counselor={'Counselor Name1'}/>
                            <CounselorBox counselor={'Counselor Name2'}/>
                            <CounselorBox counselor={'Counselor Name3'}/>
                        </div>
                        <div className='chat-account-container'>
                            <button type='button' className={`logout btn btn-dark ${logoutDsp}`} onClick={(e) => logout(e)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="white" class="bi bi-door-open-fill" viewBox="0 0 16 16">
                                    <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11 2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                                </svg>
                                Log Out</button>
                            <button type='botton' className='chat-account btn btn-dark' onClick={(e) => {
                                logoutDsp == 'logout-hide' ? setLogout('logout-show') : setLogout('logout-hide');
                            }}><div className='chat-account-svg'><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                            </svg></div>{username}</button>
                        </div>
                    </div>
                </div>
                <div className='chat-room-container'>
                    <div className='chat-room-info'></div>
                    <div className='chat-room-box'>
                        <div className='chat-dialog-box'></div>
                        <div className='chat-room-box-divider'></div>
                        <div className='chat-textarea-box'>
                            <div className='chat-textarea-input'>
                                <input className='msgInput' type='text' placeholder='Message to...' required></input>
                            </div>
                            <div className='chat-enter' onClick={(e) => sendMessage()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(210, 210, 210)" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Chat;