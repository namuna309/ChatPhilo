// Image
import iconGoogle from '../../Img/icon/icon-google.png';
import iconMicrosoft from '../../Img/icon/icon-microsoft.png';
import iconApple from '../../Img/icon/icon-apple.png';

// Library
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

function SignupBox() {
    const [username, setUsername] = useState('');
    const [dispPw, setDispw] = useState('duplicate-hide');
    const [btn_continue, setBtncon] = useState('');
    const [btn_signup, setBtnsign] = useState('duplicate-hide');
    const [isInvalid, setIsinvalid] = useState('');
    const [invalidMsg, setInvalidmsg] = useState('duplicate-hide');
    const [invalidtxt, setInvalidtxt] = useState('');

    const [password, setPassword] = useState('');
    const [btnstatus, setBtn] = useState('button');
    const [isInvalid_pw, setIsinvalid_pw] = useState('');
    const [invalidMsg_pw, setInvalidmsg_pw] = useState('duplicate-hide');
    const [invalidtxt_pw, setInvalidtxt_pw] = useState('');

    const [dispSocial, setDispsocial] = useState('');
    
    const handleLogin = () => {
        window.open(`${ENDPOINT}/auth/google`, "_self");
    };

    useEffect(() => {
        setDispw('duplicate-hide');
        setBtncon('');
        setBtnsign('duplicate-hide');
        setIsinvalid('');
        setInvalidmsg('duplicate-hide');
        setInvalidtxt('');

        setIsinvalid_pw('');
        setInvalidmsg_pw('duplicate-hide');
        setInvalidtxt_pw('');

        setDispsocial('');
    }, []);

    // input에서 blur했을 때 이메일 중복 확인
    function checkDuplicate_onblur(id) {

        let trimed_id = id.trim();
        // 이메일 형식 확인
        let is_validform = /\S+@\S+\.\S+/.test(trimed_id);
        console.log(`${ENDPOINT}/checkDuplicate?username=${trimed_id}`);
        fetch(`${ENDPOINT}/checkDuplicate?username=${trimed_id}`, {
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

                if (trimed_id == '') setInvalidtxt('이메일 안적음');
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
        let trimed_id = id.trim();
        // 이메일 형식 확인
        let is_validform = /\S+@\S+\.\S+/.test(trimed_id);

        console.log(id);
        fetch(`${ENDPOINT}/checkDuplicate?username=${trimed_id}`, {
            method : 'POST',
        }).then(res => res.text()).then((res) => {
            console.log(res);
            
            if( res == 'true' || is_validform == false) {
                // invalid 효과 on
                setIsinvalid('is-invalid');
                setInvalidmsg('');

                if (trimed_id == '') setInvalidtxt('이메일 안적음');
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

    function checkPassword(pw) {
        let trimed_pw = pw.trim()
        
            if (trimed_pw.length == 0) {
                setIsinvalid_pw('is-invalid');
                setInvalidmsg_pw('');

                setInvalidtxt_pw('비밀번호 안적음');
            }
            else {
                setIsinvalid_pw('');
                setInvalidmsg_pw('duplicate-hide');
                setBtn('submit');
            }
        
    }

    return (
        <>
            <div className='signup-box'>
                <span>Welcome!</span>
                <form className="signup-form" action={`${ENDPOINT}/send-code`} method="POST">
                    <div className={`form-floating ${isInvalid}`}>
                        <input className={`form-control ${isInvalid}`} type="email" name='username' placeholder="Email address" onChange={(e) => setUsername(e.target.value)} onBlur={(e) => checkDuplicate_onblur(username)} required />
                        <label htmlFor="floatingInput">Email address</label>
                        <div className={`invalid-feedback ${invalidMsg}`}>
                        {invalidtxt}
                    </div>
                    </div>
                    <div className={`form-floating ${dispPw} ${isInvalid_pw}`} >
                        <input className={`form-control ${isInvalid_pw}`} type='password' name='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} onBlur={(e) => checkPassword(password)} required />
                        <label htmlFor="floatingPassword">Password</label>
                        <div className={`invalid-feedback ${invalidMsg_pw}`}>
                        {invalidtxt_pw}
                    </div>
                    </div>
                    
                    <button type="button" className={`btn btn-primary ${btn_continue}`} onClick={(e) => checkduplicate_onclick(username)}>계속</button>
                    <button type={btnstatus} className={`btn btn-primary ${btn_signup}`}>가입</button>
                </form>
                <div className='divLine'></div>
                <div className={`signup-social ${dispSocial}`}>
                    <button type="button" className="btn btn-outline-light" onClick={handleLogin}><div className='icon google'><img src={iconGoogle}></img></div><span className='jwt-text'>Google 계정으로 계속</span></button>
                </div>
            </div>
            <div className='toLogin'><p>이미 계정이 있으신가요? <Link to={'./../login'}>로그인</Link></p></div>
        </>
    )
}

export default SignupBox;