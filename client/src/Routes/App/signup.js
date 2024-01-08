// CSS
import '../../CSS/signup.css'

// Library
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Component
import SignupBox from '../../Component/signup/signupbox';
import CodeVerificationForm from '../../Component/signup/codeverificationform';

function Signup() {
    

    return (
        <div className="signup-container">
        <Routes>
            <Route path='/' element={<SignupBox/>} />
            <Route path='verify-code' element={<CodeVerificationForm/>} />
        </Routes>
        </div>
    )
}

export default Signup;