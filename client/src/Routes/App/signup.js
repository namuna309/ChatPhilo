// CSS
import '../../CSS/signup.css'

// Image
import iconGoogle from '../../Img/icon/icon-google.png';
import iconMicrosoft from '../../Img/icon/icon-microsoft.png';
import iconApple from '../../Img/icon/icon-apple.png';
import { Link } from 'react-router-dom';


function Signup() {
    return (
        <div className="signup-container">
            <div className='signup-box'>
                <span>Welcome!</span>
                <form className="signup-form">
                    <div className="form-floating">
                        <input className='form-control' type="email" placeholder="이메일 주소" required />
                        <label for="floatingInput">Email address</label>
                    </div>
                    <button type="submit" className='btn btn-primary'>가입</button>
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