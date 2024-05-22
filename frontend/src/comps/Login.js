import React, { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    })


    const handleLogin = async () => {
        console.log(email, password)
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.log(result)

        if (result.name) {
            console.log('Login successful');
            localStorage.setItem("user", JSON.stringify(result))
            navigate('/')
        } else {
            console.log('Login failed, showing alert');
            alert('Enter correct details');
            setEmail('')
            setPassword('')
        }
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