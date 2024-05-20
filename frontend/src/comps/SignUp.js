import React, { useState } from 'react';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const collectData = ()=>{
        console.log(name, pass, email)
    }

    return (
        <div className='signup'>
            <h1>Register Here</h1>
            <div className='form'>
                <input
                    value={name}
                    className='input-box'
                    id='name'
                    type="text"
                    placeholder='Enter Name'
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    value={email}
                    className='input-box'
                    id='email'
                    type="text"
                    placeholder='Enter Email'
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    value={pass}
                    className='input-box'
                    id='pass'
                    type="password"
                    placeholder='New Password'
                    onChange={(e) => setPass(e.target.value)}
                />

                <button onClick={collectData} id='signup-btn'>Sign Up</button>
            </div>
        </div>
    );
}

export default SignUp;
