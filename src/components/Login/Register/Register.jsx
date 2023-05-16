import React, { useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../../firebase/firebase.config';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [user, setUser] = useState(null);
    const signInIcon = <FontAwesomeIcon icon={faRightToBracket} />
    const logOutIcon = <FontAwesomeIcon icon={faRightFromBracket} />
    const googleProvider = new GoogleAuthProvider();

    const handleRegisterSubmit = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        // console.log(name, email, password);

        if (!/(?=.*[!@#$%^&*])/.test(password)) {
            setError('Please provide at least one special character.');
            return;
        }
        else if (!/(?=.*[A-Z])/.test(password)) {
            setError('Please provide at least one capital letter.');
            return;
        }
        else if (!/(?=.*[0-9])/.test(password)) {
            setError('Please provide at least one digit');
            return;
        }
        else if (password.length < 8) {
            setError('Password should be at least 8 characters.');
            return;
        }

        setError('');
        setSuccess('');

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                setSuccess('User has been created successfully!');
                setError('');
                event.target.reset();
                handleVerificationEmail(result.user);
            })
            .catch(error => {
                setError(error.message);
                setSuccess('');
            })
    }

    const handleVerificationEmail = user => {
        sendEmailVerification(user)
            .then(() => {
                alert('Email verification sent!');
            })
            .catch(error => {
                setError(error.message);
                setSuccess('');
            })
    }

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                setSuccess('Google sign in successful!');
                setUser(result.user);
            })
            .catch(error => {
                setError(error.message);
                setSuccess('');
            })
    }

    const handleGoogleSignOut = () => {
        signOut(auth)
            .then(() => {
                setSuccess('Log out successful.');
                setUser(null);
            })
            .catch(error => {
                setError(error.message);
            })
    }
    return (
        <>
            <h3 className='text-2xl font-bold text-center'>Register</h3>
            <div className="flex justify-center">
                <form onSubmit={handleRegisterSubmit} className="w-1/3">
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2 font-bold text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your Name"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 font-bold text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your Email"
                            required
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
                            placeholder="Your Password"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div className="flex justify-center mb-4">
                        <button
                            type="submit"
                            className="px-4 py-2 w-full font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Register
                        </button>
                    </div>

                    {!user ? <div onClick={handleGoogleSignIn} className="flex justify-evenly border rounded-md hover:bg-slate-200">
                        <button
                            className="items-center px-4 py-2 w-full text-slate-700 font-semibold focus:outline-none shadow-lg"
                        >
                            {signInIcon} Sign up with Google
                        </button>

                    </div> :
                        <div onClick={handleGoogleSignOut} className="flex justify-evenly border rounded-md hover:bg-slate-200">
                            <button
                                className="items-center px-4 py-2 w-full text-slate-700 font-semibold focus:outline-none shadow-lg"
                            >
                                {logOutIcon} Log out
                            </button>

                        </div>
                    }

                </form>
            </div>
            <div className='text-center mt-3'>
                <p><small>Already have an account? <Link to="/login" className='text-blue-500 hover:underline underline-offset-2'>Login</Link></small></p>
                <p className='text-red-500'>{error}</p>
                <p className='text-green-500'>{success}</p>
            </div>
            {user && <div>
                <h3>{user.displayName}</h3>
                <p>{user.email}</p>
                <img src={user.photoURL} alt="User photo" />
            </div>
            }
        </>
    );
};

export default Register;
