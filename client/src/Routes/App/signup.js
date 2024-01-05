// CSS
import '../../CSS/signup.css'

// Image
import iconGoogle from '../../Img/icon/icon-google.png';
import iconMicrosoft from '../../Img/icon/icon-microsoft.png';
import iconApple from '../../Img/icon/icon-apple.png';

// Library
import { useState } from 'react';
import { Link } from 'react-router-dom';


function Signup() {
    const [username, setUsername] = useState('');
    const [dispPw, setDispw] = useState('hide');
    const [btn_continue, setBtncon] = useState('');
    const [btn_signup, setBtnsign] = useState('hide');
    const [isInvalid, setIsinvalid] = useState('');
    const [invalidMsg, setInvalidmsg] = useState('hide');
     

    useState(() => {
        setDispw('hide');
        setBtncon('');
        setBtnsign('hide');
        setIsinvalid('');
        setInvalidmsg('hide');
    }, []);

    function checkduplicate(id) {
        console.log(id);
        fetch(`http://localhost:8080/checkDuplicate?username=${id}`, {
            method : 'POST',
        }).then(res => res.text()).then((res) => {
            console.log(res);
            if(res == 'false') {
                setDispw('');
                setBtncon('hide');
                setBtnsign('');
                setIsinvalid('');
                setInvalidmsg('hide');
            } 
            else {
                setIsinvalid('is-invalid');
                setInvalidmsg('');
            }
        });
    }

    return (
        <div className="signup-container">
            <div className='signup-box'>
                <span>Welcome!</span>
                <form className="signup-form" action="http://localhost:8080/register" method="POST">
                    <div className={`form-floating ${isInvalid}`}>
                        <input className={`form-control ${isInvalid}`} type="email" name='username' placeholder="이메일 주소" onChange={(e) => setUsername(e.target.value)} required />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div class={`invalid-feedback ${invalidMsg}`}>
                        이메일 이미 있음
                    </div>
                    <div className={`form-floating ${dispPw}`}>
                        <input className='form-control' type='password' name='password' placeholder="Password" required />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button type="button" className={`btn btn-primary ${btn_continue}`} onClick={(e) => checkduplicate(username)}>계속</button>
                    <button type="submit" className={`btn btn-primary ${btn_signup}`}>가입</button>
                </form>
                <div className='divLine'></div>
                <div className='signup-social'>
                    <button type="button" className="btn btn-outline-light"><div className='icon google'><img src={iconGoogle}></img></div><span className='jwt-text'>Google 계정으로 가입</span></button>
                    <button type="button" className="btn btn-outline-light"><div className='icon microsoft'><img src={iconMicrosoft}></img></div><span className='jwt-text'>Microsoft Account 계정으로 가입</span></button>
                    <button type="button" className="btn btn-outline-light"><div className='icon apple'><img src={iconApple}></img></div><span className='jwt-text'>Apple 계정으로 가입</span></button>
                </div>
            </div>
            <div className='toLogin'><p>이미 계정이 있으신가요? <Link to={'../login'}>로그인</Link></p></div>
        </div>
    )
}

export default Signup;