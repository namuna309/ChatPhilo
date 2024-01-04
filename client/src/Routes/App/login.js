// CSS
import '../../CSS/login.css'

// Image
import iconGoogle from '../../Img/icon/icon-google.png';
import iconMicrosoft from '../../Img/icon/icon-microsoft.png';
import iconApple from '../../Img/icon/icon-apple.png';

// Library
import { Link } from 'react-router-dom';


function Login() {
    return (
        <div className="login-container">
            <div className='login-box'>
                <span>Hello! How are you</span>
                <form className="login-form">
                    <div className="form-floating">
                        <input className='form-control' type="email" placeholder="이메일 주소" required />
                        <label for="floatingInput">Email address</label>
                    </div>
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