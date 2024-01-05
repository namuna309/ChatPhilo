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
    const [dispPw, setDispw] = useState('duplicate-hide');
    const [btn_continue, setBtncon] = useState('');
    const [btn_signup, setBtnsign] = useState('duplicate-hide');
    const [isInvalid, setIsinvalid] = useState('');
    const [invalidMsg, setInvalidmsg] = useState('duplicate-hide');
    const [invalidtxt, setInvalidtxt] = useState('');
     

    useState(() => {
        setDispw('duplicate-hide');
        setBtncon('');
        setBtnsign('duplicate-hide');
        setIsinvalid('');
        setInvalidmsg('duplicate-hide');
        setInvalidtxt('');
    }, []);

    // input에서 blur했을 때 이메일 중복 확인
    function checkDuplicate_onblur(id) {
        // 이메일 형식 확인
        let is_validform = /\S+@\S+\.\S+/.test(id);

        fetch(`http://localhost:8080/checkDuplicate?username=${id}`, {
            method : 'POST',
        }).then(res => res.text()).then((res) => {
            console.log(res);
            
            if( res == 'true' || is_validform == false){
                // 패스워드 입력 숨김
                setDispw('duplicate-hide');
                // 버튼 변환: 가입 -> 계속
                setBtncon('');
                setBtnsign('duplicate-hide');

                // invalid 효과 on
                setIsinvalid('is-invalid');
                setInvalidmsg('');

                if (id == '') setInvalidtxt('이메일 안적음');
                else if (is_validform == false) setInvalidtxt('이메일 형식 안맞음');
                else setInvalidtxt('해당 이메일 이미 있음');

            } else if(res == 'false') {
                // invalid 효과 off
                setIsinvalid('');
                setInvalidmsg('duplicate-hide');
            } 
            
        });
    }

    // 계속 버튼 눌렀을 때 이메일 중복 확인
    function checkduplicate_onclick(id) {
        // 이메일 형식 확인
        let is_validform = /\S+@\S+\.\S+/.test(id);

        console.log(id);
        fetch(`http://localhost:8080/checkDuplicate?username=${id}`, {
            method : 'POST',
        }).then(res => res.text()).then((res) => {
            console.log(res);
            
            if( res == 'true' || is_validform == false) {
                // invalid 효과 on
                setIsinvalid('is-invalid');
                setInvalidmsg('');

                if (id == '') setInvalidtxt('이메일 안적음');
                else if (is_validform == false) setInvalidtxt('이메일 형식 안맞음');
                else setInvalidtxt('해당 이메일 이미 있음');
            } else if(res == 'false') {
                // 패스워드 입력칸 생성
                setDispw('');
                // 버튼 변환: 계속 -> 가입
                setBtncon('duplicate-hide');
                setBtnsign('');

                // invalid 효과 off
                setIsinvalid('');
                setInvalidmsg('duplicate-hide');
            } 
        });
    }

    return (
        <div className="signup-container">
            <div className='signup-box'>
                <span>Welcome!</span>
                <form className="signup-form" action="http://localhost:8080/register" method="POST">
                    <div className={`form-floating ${isInvalid}`}>
                        <input className={`form-control ${isInvalid}`} type="email" name='username' placeholder="이메일 주소" onChange={(e) => setUsername(e.target.value)} onBlur={(e) => checkDuplicate_onblur(username)} required />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div class={`invalid-feedback ${invalidMsg}`}>
                        {invalidtxt}
                    </div>
                    <div className={`form-floating ${dispPw}`}>
                        <input className='form-control' type='password' name='password' placeholder="Password" required />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button type="button" className={`btn btn-primary ${btn_continue}`} onClick={(e) => checkduplicate_onclick(username)}>계속</button>
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