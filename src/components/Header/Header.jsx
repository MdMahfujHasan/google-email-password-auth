import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className='text-center mt-2 mb-4'>
            <Link className='text-lg mr-5 hover:underline underline-offset-2' to="/">Home</Link>
            <Link className='text-lg mr-5 hover:underline underline-offset-2' to="/login">Login</Link>
            <Link className='text-lg mr-5 hover:underline underline-offset-2' to="/register">Register</Link>
        </nav>
    );
};

export default Header;