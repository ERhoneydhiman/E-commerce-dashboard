import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupmsg, setSignupmsg] = useState()
    const navigate = useNavigate();

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

            if(response){
                navigate('/')
            }

        } catch (error) {
            console.error('Failed to fetch:', error);
        }
    };


    return (
        <div className='signup'>
            <h1>Register Here</h1>
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
                    type="text"
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
        </div>
    );
}

export default SignUp;
