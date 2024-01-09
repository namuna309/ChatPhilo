import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Chat() {

    const navigate = useNavigate();
    const [username, setUsername] = useState();

    useEffect(() => {
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
        .catch(err => navigate('../login'));
    }, []);

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
        <p>{username}</p>
        <button type='button' onClick={(e) => logout(e)            
        }>logout</button>
        </>
    )
}

export default Chat;