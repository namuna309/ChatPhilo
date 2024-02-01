// Library
import React from 'react';

// CSS
import '../../../CSS/chat/ChatRoom/Attention.css'

function Attention() {
    return (
        <div className='attention-container'>
            <div className='attention-title-box fs-5 fw-bold'>주의사항</div>            
            <div className='attention-content-box fs-6'>각 인물들은 주요 저서 내용을 기반으로 학습된 챗봇입니다. <br/>때문에 답변이 다소 시간이 걸릴 수 있으니 이해해 주시기 바랍니다.</div>
        </div>
    )
}

export default Attention