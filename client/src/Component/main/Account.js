import { Link } from "react-router-dom";

function Account() {
    return(
        <div className="account-box">
            <div className="start-box">
            <div className="title-box"><span>Start your consultation</span></div>
            <div className="btn-box">
                <Link to='login'><button type="button" className="btn btn-light acnt-btn"><span>Login</span></button></Link>
                <Link to='signup'><button type="button" className="btn btn-light acnt-btn"><span>Sign Up</span></button></Link>
            </div>
            </div>
            
        </div>
    )
}

export default Account;