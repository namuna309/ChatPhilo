// CSS
import '../../CSS/login.css'

// Image
import iconGoogle from '../../Img/icon/icon-google.png';
import iconMicrosoft from '../../Img/icon/icon-microsoft.png';
import iconApple from '../../Img/icon/icon-apple.png';

// Library
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios"

function Login() {
    let params =  new URLSearchParams(window.location.search);
    const invalid = params.get('state');

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dspInvalid, setDspinvalid] = useState(invalid);

    let [submit, setSubmit] = useState(false);
    
    let status;

    useEffect(() => {
        fetch('http://localhost:8080/session', {
            method: "get",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            credentials: 'include',
        })
        .then((res) => { return res.json() })
        .then(res => {
            console.log(res);
            navigate('../chat');
        })
        .catch(err => console.log(err));
        
    }, []);

    useEffect(() => {
        setUsername('');
        setPassword('');
        if (invalid == true) setDspinvalid('is-invalid');
        else if(invalid == null) setDspinvalid('');

        console.log(dspInvalid);
        
    }, []);
    

    

    return (   
        <div className="login-container">
           <div className='login-box'>
                <span>Hello! How are you</span>
                    <form className="login-form" action='http://localhost:8080/login' method='POST'>
                        <div className="form-floating">
                            <input className='form-control' type='email' name='username' placeholder='Email address' onChange={(e) => setUsername(e.target.value)} required />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        
                        <div className="form-floating">
                            <input className='form-control' type='password' name='password'  placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className={`${dspInvalid}`}></div>
                        <div className={`invalid-feedback`}>
                        아이디(로그인 전용 아이디) 또는 비밀번호를 <br/>
                        잘못 입력했습니다.</div>
                        <button type="submit" className='btn btn-primary'>계속</button>
                    </form>
                    <div className='divLine'></div>
                    <div className='login-social'>
                        <button type="button" className="btn btn-outline-light"><div className='icon google'><img src={iconGoogle}></img></div><span className='jwt-text'>Google 계정으로 계속</span></button>
                        <button type="button" className="btn btn-outline-light"><div className='icon microsoft'><img src={iconMicrosoft}></img></div><span className='jwt-text'>Microsoft Account 계정으로 계속</span></button>
                        <button type="button" className="btn btn-outline-light"><div className='icon apple'><img src={iconApple}></img></div><span className='jwt-text'>Apple 계정으로 계속</span></button>
                    </div>
            </div>
            <div className='toSignup'><p>계정이 없으신가요? <Link to={'../signup'}>가입하기</Link></p></div>
    </div>
    )
}

export default Login;