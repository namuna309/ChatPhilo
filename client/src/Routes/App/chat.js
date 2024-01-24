// CSS
import '../../CSS/chat.css'

// Library
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from '@tanstack/react-query';

import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';



const ENDPOINT = "http://localhost:8080"; // 서버 주소

async function checkLoginStatus() {
    return fetch(`${ENDPOINT}/session`, {
        method: "get",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        credentials: 'include',
    }).then((res) => res.json());
}

// 메시지 전송 함수
const postMessage = async (thread_id) => {
    const url = new URL(`${ENDPOINT}/c/getResp`);
        url.searchParams.append('tId', thread_id);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        alert('Network response was not ok');
    }

    return response.json();
};

function Chat() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [dialog, setDialog] = useState([]);

    const [username, setUsername] = useState();
    const [logoutDsp, setLogout] = useState('logout-hide');


    const [counselors, setCounslers] = useState(['Schopenhauer', 'Counselor Name2']);
    const [counselor, setCounselor] = useState();
    const [activeButtons, setActiveButtons] = useState([false, false]);


    const [threadId, setThreadId] = useState();
    const [isSending, setIsSending] = useState(false);

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

    

    const { mutate, isPending } = useMutation({
        mutationFn: postMessage, 
        onSuccess: async (reply) => {
            // 서버 응답에 따라 대화 목록 업데이트
            setDialog(prev => [...prev, reply])
        },
        onError: (error) => {
            // 에러 처리
            console.error('Error posting message:', error);
        },
    });
    

    const counslerClick = async (index) => {

        setActiveButtons(activeButtons.map((_, i) => i === index));
        // 요청 URL 구성
        const url = new URL(`${ENDPOINT}/c/request`);
        url.searchParams.append('csl', counselors[index]);
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

            const data = await response.json();
            console.log(data);
            setCounselor(data.counselor);
            setThreadId(data.thread_id);
            return data.thread_id;
            
        } catch (error) {
            console.error("Request failed:", error);
        }
    };

    const retrieveMassages = async (thread_id) => {
        const url = new URL(`${ENDPOINT}/c/msglist`);
        url.searchParams.append('tId', thread_id);

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

            const data = await response.json();
            
            setDialog(data);
        } catch (error) {
            console.error("Request failed:", error);
        }
    }

    const createMassage = async () => {
        const url = new URL(`${ENDPOINT}/c/createMsg`);
        url.searchParams.append('tId', threadId);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                credentials: 'include',
                body: JSON.stringify({content: message})
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const createdMsg = await response.json();

            setDialog(prev => [...prev, createdMsg])
        } catch (error) {
            console.error("Request failed:", error);
        }
    }


    // 로그아웃
    const logoutClick = async () => {
        try {
            const response = await fetch(`${ENDPOINT}/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('로그아웃 성공')
            window.location.href = 'http://localhost:3000'
        } catch (error) {
            console.error("Request failed:", error);
        }
    }

    const sendMessage = async () => {
        console.log(threadId);
        if (threadId && message) {
            await createMassage();
                           
            // 메시지 입력 필드 초기화
            setMessage(null);
            document.getElementsByTagName('Input')[0].value = null;

            // 전송한 메세지 데이터 추가

            // 메시지 전송 뮤테이션 실행 
            mutate(threadId);
            

        }
    };

    const sendMessageUsingEnter = (e) => {
        if (e.keyCode == 13) {
            console.log('엔터키');
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
                                            <button type='button' className={`btn btn-dark counselor-box ${activeButtons[index] ? 'active' : ''}`} onClick={async () => {let thread_id = await counslerClick(index); retrieveMassages(thread_id)}}
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
                                    let type = '';
                                    if (message.role == 'user') type = 'user';
                                    else type = 'counselor'
                                    
                                    return (
                                        
                                        <div className={`chat-${type}-box`}>
                                            <div className={`${type}-icon-box`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                            </svg>
                                            </div>
                                            <div className={`${type}-text-box`}>{message.content[0].text.value}</div>
                                        </div>
                                    )
                                })
                            }
                            {
                                isPending ? (
                                <div className="chat-counselor-box">
                                    <div className="counselor-icon-box"></div>
                                    <div className="counselor-text-box">
                                        <div className="spinner-border text-light" style={{height: '1.4rem', width:'1.4rem'}} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                                ) : null
                            }


                        </div>
                        
                    </div>
                    <div className='chat-room-box-divider'></div>
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
          placeholder='Message to...' variant="standard" onChange={(e) => setMessage(e.target.value)} onKeyDown={sendMessageUsingEnter} required
        /> 
                         
                        </div>
                    </div>
                    
                    
                </div>

            </div >
        </>
    )
}

export default Chat;