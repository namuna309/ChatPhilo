// CSS
import '../../CSS/chat.css'

// Library
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useQuery } from '@tanstack/react-query';


const ENDPOINT = "http://localhost:8080"; // 서버 주소

function checkLoginStatus() {
    return fetch(`${ENDPOINT}/session`, {
        method: "get",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        credentials: 'include',
    }).then((res) => res.json());
}

function Chat() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [dialog, setDialog] = useState([{counselor: "어서오세요!"}]);

    const [username, setUsername] = useState();
    const [logoutDsp, setLogout] = useState('logout-hide');


    const [counselors, setCounslers] = useState(['Counselor Name1', 'Counselor Name2']);
    const [activeButtons, setActiveButtons] = useState([false, false]);


    const [roomId, setRoomId] = useState();
    const [socket, setSocket] = useState(null);

    const { data, isError, isLoading } = useQuery({
        queryKey: ['loginStatus'],
        queryFn: checkLoginStatus,
        refetchInterval: 60000  // 1분마다 로그인 상태 확인
    });

    useEffect(() => {
        if (isError) {
            navigate('../');
        } else if (data) {
            setUsername(data.username);
        }
    }, [data, isError, isLoading])



    const counslerClick = async (index) => {

        setActiveButtons(activeButtons.map((_, i) => i === index));
        // 요청 URL 구성
        const url = new URL('http://localhost:8080/c/request');
        url.searchParams.append('csl', counselors[index]);
        console.log(url)
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const roomid = await response.json();
            setRoomId(roomid);
        } catch (error) {
            console.error("Request failed:", error);
        }
    };


    // 로그아웃
    const logoutClick = async () => {
        try {
            const response = await fetch('http://localhost:8080/logout', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            window.location.href = 'http://localhost:3000'
        } catch (error) {
            console.error("Request failed:", error);
        }
    }

    // 소켓 연결
    useEffect(() => {
        // Socket 연결
        const newSocket = io(ENDPOINT, {
            cors: { origin: '*' }
        });
        setSocket(newSocket);

        return () => newSocket.disconnect(); // 컴포넌트 언마운트 시 연결 해제
    }, []);

    useEffect(() => {

        if (socket && roomId) {
            // 서버에 room 가입 요청
            socket.emit("ask-join", roomId);

            const receiveMessage = (message) => {
                // 메시지 수신 처리
                console.log("New message in room", roomId, ":", message);
                
                setDialog(prev => [...prev, {counselor: message.msg}]);
            
            }

            socket.on(`braodcast-${roomId}`, receiveMessage );

            return () => {
                socket.off(`braodcast-${roomId}`, receiveMessage);
            }
        }
    }, [socket, roomId]);

    // 메세지 전송
    const sendMessage = () => {
        if (socket && roomId && message) {
            // 서버에 메시지 전송
            socket.emit("send_message", { msg: message, rid: roomId });
            // 전송한 메세지 데이터 추가
            setDialog(prev => [...prev, {user: message}]);
            
            // 메시지 입력 필드 초기화
            setMessage(null);
            document.getElementsByClassName('msgInput')[0].value = null;

        }
    };

    const sendMessageUsingEnter = (e) => {
        if (e.key === 'Enter') {
            sendMessage(); // 작성한 댓글 post 요청하는 함수 
        }
    };

    useEffect(() => {
        console.log(dialog);
    }, [dialog])

    return (
        <>
            <div className="chat-container">
                <div className='chat-list-container'>
                    <div className='chat-list-box'>
                        <div className='chat-list'>
                            {
                                counselors.map((name, index) => {
                                    return (
                                        <div className='counselor-container' key={name}>
                                            <button type='button' className={`btn btn-dark counselor-box ${activeButtons[index] ? 'active' : ''}`} onClick={() => counslerClick(index)}
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
                                    )

                                })
                            }


                        </div>
                        <div className='chat-account-container'>
                            <button type='button' className={`logout btn btn-dark ${logoutDsp}`} onClick={logoutClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="white" className="bi bi-door-open-fill" viewBox="0 0 16 16">
                                    <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11 2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                                </svg>
                                Log Out</button>
                            <button type='botton' className='chat-account btn btn-dark' onClick={(e) => {
                                logoutDsp == 'logout-hide' ? setLogout('logout-show') : setLogout('logout-hide');
                            }}><div className='chat-account-svg'><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                            </svg></div>{username}</button>
                        </div>
                    </div>
                </div>
                <div className='chat-room-container'>
                    <div className='chat-room-info'></div>
                    <div className='chat-room-box'>
                        <div className='chat-dialog-box'>
                            {
                                dialog.map((message) => {
                                    let key = Object.keys(message)[0];
                                    let value = Object.values(message)[0]
                                    return (
                                        <div className={`chat-${key}-box`}>
                                            <div className={`${key}-icon-box`}></div>
                                            <div className={`${key}-text-box`}>{value}</div>
                                        </div>
                                    )
                                })
                            }


                        </div>
                        <div className='chat-room-box-divider'></div>
                        <div className='chat-textarea-box'>
                            <div className='chat-textarea-input'>
                                <input className='msgInput' type='text' placeholder='Message to...' onChange={(e) => setMessage(e.target.value)} onKeyDown={sendMessageUsingEnter} required></input>
                            </div>
                            <div className='chat-enter' onClick={sendMessage}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(210, 210, 210)" className="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}

export default Chat;