import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../../firebase/firebase.config';

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();

    const handleLoginSubmit = event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        setError('');
        setSuccess('');

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                if (!result.user.emailVerified) {
                    alert('Email is not verified!');
                    setError('Please verify your email!');
                    return;
                }
                setSuccess('Logged in successfully!');
                setError('');
            })
            .catch(error => {
                setError(error.message);
                setSuccess('');
            })
    }

    const handleResetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Please enter your email address.');
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset email sent!');
                setError('');
            })
            .catch(error => {
                setError(error.message);
                setSuccess('');
            })
    }
    return (
        <>
            <h3 className='text-2xl font-bold text-center'>Login</h3>
            <div className="flex justify-center">
                <form onSubmit={handleLoginSubmit} className="w-1/3">

                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 font-bold text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Your Email'
                            required
                            ref={emailRef}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 font-bold text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder='Your Password'
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-4 py-2 w-full text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <p className='text-center mt-3'><small><button className='text-blue-500 hover:underline underline-offset-2' onClick={handleResetPassword}>Forgotten password?</button></small></p>
            <div className='text-center'>
                <p><small>New user? <Link to="/register" className='text-blue-500 hover:underline underline-offset-2'>Register</Link></small></p>
                <p className='text-red-500'>{error}</p>
                <p className='text-green-500'>{success}</p>
            </div>
        </>
    );
};

export default Login;
