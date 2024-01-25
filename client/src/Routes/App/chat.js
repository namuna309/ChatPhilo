// CSS
import '../../CSS/chat.css'

// Library
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from '@tanstack/react-query';

// Component
import CounselorList from '../../Component/chat/CounselorList';
import AccountControls from '../../Component/chat/AccountControls';
import ChatDialogBox from '../../Component/chat/ChatDialogBox';
import ChatInputBox from '../../Component/chat/ChatInputBox';

// API
import { checkLoginStatus, postMessage, createMessage, retrieveMessages, logoutClick, requestCounselor } from '../../API/chat/api';

function Chat() {
    // states
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [dialog, setDialog] = useState([]);
    const [username, setUsername] = useState();
    const [logoutDsp, setLogout] = useState('logout-hide');
    const [counselors] = useState(['Schopenhauer', 'Counselor Name2']);
    const [activeButtons, setActiveButtons] = useState([false, false]);
    const [threadId, setThreadId] = useState();

    // 로그인 상태를 확인하는 쿼리, 매분마다 재요청
    const { data, isError } = useQuery({
        queryKey: ['loginStatus'],
        queryFn: checkLoginStatus,
        refetchInterval: 60000,  // 1분마다 로그인 상태 확인
    });
    // 메시지 전송을 위한 뮤테이션
    const { mutate, isPending } = useMutation({
        mutationFn: postMessage,
        onSuccess: (reply) => setDialog(prev => [...prev, reply]),
        onError: (error) => console.error('Error posting message:', error),
    });

    // 로그인 상태 확인에 대한 useEffect
    useEffect(() => {
        if (isError) {
            navigate('../');
        } else if (data) {
            setUsername(data.username);
        }
    }, [data, isError])

    // 대화 기록 변화에 대한 useEffect
    useEffect(() => { console.log(dialog); }, [dialog]);

    // 상담사 클릭 처리 함수
    const counslerClick = async (index) => {
        setActiveButtons(activeButtons.map((_, i) => i === index));
        return await requestCounselor(counselors, index)
    };

    // 메시지 전송 처리 함수
    const sendMessage = async () => {
        console.log(threadId);
        if (threadId && message) {

            let createdMsg = await createMessage(threadId, message)
            setDialog(prev => [...prev, createdMsg])

            setMessage(null);
            document.getElementsByTagName('Input')[0].value = null;

            mutate(threadId);
        }
    };

    // 상담사 클릭 핸들러
    const handleCounselorClick = async (index) => {
        let counselorData = await counslerClick(index);
        console.log(counselorData);
        setThreadId(counselorData.thread_id);
        let thread_id = counselorData.thread_id;
        let dialogs = await retrieveMessages(thread_id);
        setDialog(dialogs)
    };

    // 계정 버튼 클릭 핸들러
    const handleAccountClick = (e) => {
        logoutDsp == 'logout-hide' ? setLogout('logout-show') : setLogout('logout-hide');
    }

    // 메시지 입력 변경 핸들러
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    // 메시지 전송 핸들러 (엔터 키 누를 때)
    const handleMessageSend = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    // 채팅 컴포넌트 UI 렌더링
    return (
        <div className="chat-container">
            <div className='chat-list-container'>
                <div className='chat-list-box'>
                    <div className='chat-list'>
                        <CounselorList
                            counselors={counselors}
                            activeButtons={activeButtons}
                            onCounselorClick={handleCounselorClick}
                        />
                    </div>
                    <AccountControls
                        username={username}
                        logoutDsp={logoutDsp}
                        onLogoutClick={logoutClick}
                        onAccountClick={handleAccountClick}
                    />
                </div>
            </div>
            <div className='chat-room-container'>
                <div className='chat-room-info'></div>
                <div className='chat-room-box'>
                    <ChatDialogBox dialog={dialog} isPending={isPending} />
                </div>
                <div className='chat-room-box-divider'></div>
                <div className='chat-textarea-container'>
                    <ChatInputBox
                        onMessageChange={handleMessageChange}
                        onMessageSend={handleMessageSend}
                    />
                </div>
            </div>

        </div >
    )
}

export default Chat;