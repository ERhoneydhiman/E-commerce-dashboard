import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupmsg, setSignupmsg] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    })

    const collectData = async () => {
        const user = { name, email, password };
        console.log(name, password, email);

        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const result = await response.json();
            console.log(result);
            setSignupmsg('User Sign Up Done')

            if (response) {
                navigate('/')
                localStorage.setItem("user", JSON.stringify(result))
            }

        } catch (error) {
            console.error('Failed to fetch:', error);
        }
    };


    return (
        <div className='signup'>
            <h1>E-Comm-Deshboard</h1>
            <h1>Register to access website</h1>
            <div className='form'>
                <input
                    required
                    value={name}
                    className='input-box'
                    id='name'
                    type="text"
                    placeholder='Enter Name'
                    onChange={(e) => setName(e.target.value)}
                />

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

                <button onClick={collectData} id='signup-btn'>Sign Up</button>
                <p>{signupmsg}</p>
            </div>
            <div id="login">
                <p>Already account ?? then</p>
                <button id='login-btn' ><Link to="/login">Login</Link></button>
            </div>
        </div>
    );
}

export default SignUp;
