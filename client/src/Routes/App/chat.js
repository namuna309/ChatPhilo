// CSS
import '../../CSS/chat/chat.css'

// Library
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from '@tanstack/react-query';

// Component
import Sidebar from '../../Component/chat/Sidebar';
import ChatRoom from '../../Component/chat/ChatRoom';

// API
import { checkLoginStatus, postMessage, createMessage, retrieveMessages, logoutClick, requestCounselor, deleteThread } from '../../API/chat/api';

function Chat() {
    // states
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [dialog, setDialog] = useState([]);
    const [username, setUsername] = useState();
    const [logoutDsp, setLogout] = useState('logout-hide');
    const [counselors] = useState(['Schopenhauer', 'Adler', 'Jung']);
    const counselorsDict = {Schopenhauer: 'schopenhauer', Adler: 'adler', Jung: 'jung'};
    const [curCounselor, setCurCounselor] = useState();
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
        mutationFn: () => postMessage(threadId, curCounselor),
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


    // 상담사 클릭 처리 함수
    const counslerClick = async (index) => {
        setActiveButtons(activeButtons.map((_, i) => i === index));
        setCurCounselor(counselorsDict[counselors[index]])
        return await requestCounselor(counselors, index)
    };

    // 메시지 전송 처리 함수
    const sendMessage = async () => {
        if (threadId && message) {

            let createdMsg = await createMessage(threadId, message)
            setDialog(prev => [...prev, createdMsg])

            setMessage(null);
            document.getElementsByTagName('Input')[0].value = null;
            
            mutate(threadId, curCounselor);
        }
    };

    // 상담사 클릭 핸들러
    const handleCounselorClick = async (e, index) => {
        if (e.target != document.querySelectorAll('.counselor-delete-box')[index]) {
            let counselorData = await counslerClick(index);
            setThreadId(counselorData.thread_id);
            let thread_id = counselorData.thread_id;
            let dialogs = await retrieveMessages(thread_id);
            setDialog(dialogs)
        }
        
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
 
    const handleThreadDelete = async (e, index) => {
        console.log(e.target)
        if (document.querySelectorAll('.counselor-delete-box')[index].contains(e.target)) {
            alert('정말 삭제하시겠습니까?')
            let new_thread = await deleteThread(threadId);
            console.log(new_thread);
            setThreadId(new_thread.id);
            setDialog([]);
        }
    }

    // 채팅 컴포넌트 UI 렌더링
    return (
        <div className="chat-container">
            <Sidebar counselors={counselors} activeButtons={activeButtons} onCounselorClick={handleCounselorClick} handleThreadDelete={handleThreadDelete} username={username} logoutDsp={logoutDsp} onLogoutClick={logoutClick} onAccountClick={handleAccountClick} />
            <ChatRoom curCounselor={curCounselor} dialog={dialog} isPending={isPending} onMessageChange={handleMessageChange} onMessageSend={handleMessageSend} />
        </div >
    )
}

export default Chat;