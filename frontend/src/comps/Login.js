import React, { useState } from 'react'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = ()=>{
        console.log(email, password)
    }
    return (
        <div className='login'>
            <h1>E-Comm-Deshboard</h1>
            <h1>Login to access website</h1>
            <div className="form">
            <input
                    required
                    value={email}
                    className='input-box'
                    id='email'
                    type="email"
                    placeholder='Enter Email'
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    required
                    value={password}
                    className='input-box'
                    id='pass'
                    type="password"
                    placeholder='New Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin} id='signup-btn'>Login</button>
            </div>
        </div>
    )
}

export default Login