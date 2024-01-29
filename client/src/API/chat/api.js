const ENDPOINT = "http://localhost:8080";

// 로그인 상태 체크 함수
export async function checkLoginStatus() {
    const response = await fetch(`${ENDPOINT}/session`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

// 메시지 전송 함수
export async function postMessage(thread_id, csl) {
    console.log(csl);
    const url = new URL(`${ENDPOINT}/c/getResp`);
    url.searchParams.append('tId', thread_id);
    url.searchParams.append('csl', csl)
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

// 새 메시지 생성 함수
export async function createMessage(threadId, message) {
    const url = new URL(`${ENDPOINT}/c/createMsg`);
    url.searchParams.append('tId', threadId);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        credentials: 'include',
        body: JSON.stringify({ content: message })
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

// 메시지 목록 검색 함수
export async function retrieveMessages(thread_id) {
    const url = new URL(`${ENDPOINT}/c/msglist`);
    url.searchParams.append('tId', thread_id);
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
    return response.json();
}

// 로그아웃 실행 함수
export async function logoutClick() {
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

// 선택된 상담사에 대한 요청을 서버에 전송
export async function requestCounselor(counselors, index) {
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

        return response.json();
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
}

// 선택된 상담사에 대한 요청을 서버에 전송
export async function deleteThread(thread_id) {
    const url = new URL(`${ENDPOINT}/c/delThread`);
    url.searchParams.append('tId', thread_id);
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }


    return response.json();

}